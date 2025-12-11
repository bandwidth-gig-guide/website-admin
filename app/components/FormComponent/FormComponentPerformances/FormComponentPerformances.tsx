import React, { useState, useEffect } from "react";
import styles from "./FormComponentPerformances.module.css";
import { Event } from "../../../types/models/Event";
import axios from "axios";
import getConfig from "next/config";
import FormComponentDateTime from "../FormComponentDateTime/FormComponentDateTime";
import FormComponentDropdownListAdvanced from "../FormComponentDropdownListAdvanced/FormComponentDropdownListAdvanced";

interface Props {
  record: Event;
  setRecord: React.Dispatch<React.SetStateAction<Event>>;
}

const FormComponentPerformances = ({ record, setRecord }: Props) => {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [artistOptions, setArtistOptions] = useState<{ value: string; label: string }[]>([]);
  const api = getConfig().publicRuntimeConfig.SERVICE_ADMIN_API_URL

  useEffect(() => {
    axios.get(`${api}/artist/id-and-title`)
      .then(response => {
        const options = response.data.map((artist: { ArtistID: string; Title: string }) => ({
          value: artist.ArtistID,
          label: artist.Title
        }));
        setArtistOptions(options);
      });
  }, []);


  const handleChangeDateTime = (index: number, newIso: string) => {
    setRecord(prev => {
      if (!prev) return prev;
      const updatedPerformances = [...prev.performances];
      updatedPerformances[index] = {
        ...updatedPerformances[index],
        startDateTime: newIso
      };
      return {
        ...prev,
        performances: updatedPerformances
      };
    });
  };

  const handleAddPerformance = () => {
    setRecord((prev: any) => {
      if (!prev) return prev;
      const newPerformance = {
        title: "",
        imageUrl: "",
        setListPosition: prev.performances && prev.performances.length > 0 ? prev.performances.length + 1 : 1,
        startDateTime: prev.startDateTime
      };
      return {
        ...prev,
        performances: [...(prev.performances || []), newPerformance]
      };
    });
  };


  const handleSpecialGuestsPerformance = () => {
    setRecord((prev: any) => {
      if (!prev) return prev;
      const newPerformance = {
        title: "Special Guests",
        imageUrl: "",
        artistId: "00000000-0000-0000-0000-000000000000", // "Specials Guests"
        setListPosition: prev.performances && prev.performances.length > 0 ? prev.performances.length + 1 : 1,
        startDateTime: new Date(prev.startDateTime).toISOString().split('T')[0] + 'T00:01:00' // "Time Unknown"
      };
      return {
        ...prev,
        performances: [...(prev.performances || []), newPerformance]
      };
    });
  }

  const handleRemovePerformance = (index: number) => {
    setRecord(prev => {
      if (!prev) return prev;
      const updatedPerformances = prev.performances.filter((_, i) => i !== index);

      // Recalculate setListPosition
      const reorderedWithPositions = updatedPerformances.map((perf, i) => ({
        ...perf,
        setListPosition: i + 1
      }));

      return {
        ...prev,
        performances: reorderedWithPositions
      };
    });
  };

  const handleReorderPerformance = (fromIndex: number, toIndex: number) => {
    if (
      fromIndex < 0 ||
      toIndex < 0 ||
      fromIndex >= record.performances.length ||
      toIndex >= record.performances.length ||
      fromIndex === toIndex
    )
      return;

    setRecord(prev => {
      if (!prev) return prev;
      const updatedPerformances = [...prev.performances];
      const [movedItem] = updatedPerformances.splice(fromIndex, 1);
      updatedPerformances.splice(toIndex, 0, movedItem);

      const reorderedWithPositions = updatedPerformances.map((perf, i) => ({
        ...perf,
        setListPosition: i + 1
      }));

      return {
        ...prev,
        performances: reorderedWithPositions
      };
    });
  };

  function formatLabel(setListPosition: number): string {
    if (setListPosition === 1) return `Headliner`;
    return `Support Act ${setListPosition - 1}`;
  }

  return (
    <div className={styles.wrapper}>
      {record.performances &&
        record.performances.map((performance, index) => (
          <div
            key={index}
            className={`${styles.cardWrapper} ${draggedIndex === index ? styles.dragging : ""}`}
            draggable
            onDragStart={() => setDraggedIndex(index)}
            onDragOver={e => e.preventDefault()}
            onDrop={() => {
              if (draggedIndex !== null) {
                handleReorderPerformance(draggedIndex, index);
                setDraggedIndex(null);
              }
            }}
          >
            <div className={styles.inputWrapper}>
              <div className={styles.topRow}>
                <div className={styles.topRowInput}>
                  <FormComponentDropdownListAdvanced
                    label={formatLabel(performance.setListPosition)}
                    name={`performances[${index}].artist`}
                    value={performance.artistId || ""}
                    options={artistOptions}
                    setValue={(val) => {
                      setRecord(prev => {
                        const updated = [...prev.performances];
                        updated[index] = {
                          ...updated[index],
                          artistId: val.value,
                          title: val.label
                        };
                        return { ...prev, performances: updated };
                      });
                    }}
                  />
                </div>
                <div>
                  <button
                    type="button"
                    className={styles.removeButton}
                    onClick={() => handleRemovePerformance(index)}
                  >
                    <img src="/circle-cross.svg" alt="" />
                  </button>
                </div>

              </div>
              <div className={styles.bottomRow}>
                <FormComponentDateTime
                  label=""
                  name={`performances[${index}].startDateTime`}
                  value={performance.startDateTime}
                  onChange={newIso => handleChangeDateTime(index, newIso)}
                  required={true}
                />
              </div>
            </div>
          </div>
        ))}

      <div className={styles.buttons}>
        <button type="button" className="addButton" onClick={handleSpecialGuestsPerformance}>
          Add "Special Guests"
        </button>
        <button type="button" className="addButton" onClick={handleAddPerformance}>
          Add Performance
        </button>
      </div>

    </div>
  );
};

export default FormComponentPerformances;
