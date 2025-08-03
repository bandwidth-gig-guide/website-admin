import React from "react";
import styles from "./FormComponentStages.module.css";
import { Venue } from "../../../types/models/Venue";

// Reuse shared form components
import FormComponentTextInput from "../FormComponentTextInput/FormComponentTextInput"
import FormComponentNumberInput from "../FormComponentNumberInput/FormComponentNumberInput"
import FormComponentTextArea from "../FormComponentTextArea/FormComponentTextArea"

interface Props {
  record: Venue;
  setRecord: React.Dispatch<React.SetStateAction<Venue>>;
}

const FormComponentStages: React.FC<Props> = ({ record, setRecord }) => {
  const stages = record.venueStages;

  const handleChange = (
    index: number,
    field: "title" | "description" | "capacity",
    value: string | number
  ) => {
    const updated = [...stages];
    updated[index] = {
      ...updated[index],
      [field]: field === "capacity" ? Number(value) : value,
    };
    setRecord(prev => ({ ...prev, venueStages: updated }));
  };

  const handleAdd = () => {
    const newStage = {
      stageID: "",
      title: "",
      description: "",
      capacity: 0,
    };
    setRecord(prev => ({
      ...prev,
      venueStages: [...prev.venueStages, newStage],
    }));
  };

  // Only allow removal of new rows (stageID === "")
  const handleRemove = (index: number) => {
    const updated = [...stages];
    updated.splice(index, 1);
    setRecord(prev => ({ ...prev, venueStages: updated }));
  };

  return (
    <div className={styles.wrapper}>
      {stages.map((stage, index) => (
        <div key={index} className={styles.card}>
          <div className={styles.topRow}>
            <FormComponentTextInput
              label="Title"
              name={`stage-title-${index}`}
              value={stage.title}
              onChange={e => handleChange(index, "title", e.target.value)}
            />
            {stage.stageID === "" && (
              <button
                type="button"
                onClick={() => handleRemove(index)}
                className={styles.removeButton}
              >
                <img src="/circle-cross.svg" alt="Remove" />
              </button>
            )}
          </div>

          <FormComponentNumberInput
            label="Capacity"
            name={`stage-capacity-${index}`}
            value={stage.capacity}
            onChange={e => handleChange(index, "capacity", e.target.value)}
            min={0}
          />
          <FormComponentTextArea
            label="Description"
            name={`stage-description-${index}`}
            value={stage.description}
            onChange={e => handleChange(index, "description", e.target.value)}
            rows={3}
            isDescription={false}
          />

        </div>
      ))}

      <button type="button" onClick={handleAdd} className="addButton">
        Add Stage
      </button>
    </div>
  );
};

export default FormComponentStages;
