import React, { useEffect } from "react";
import styles from "./FormComponentOpeningHours.module.css";
import { Venue } from "../../../types/models/Venue";

interface Props {
  record: Venue;
  setRecord: React.Dispatch<React.SetStateAction<Venue>>;
}

const DAYS = [
  { label: "Monday", openKey: "monOpen", closeKey: "monClose" },
  { label: "Tuesday", openKey: "tueOpen", closeKey: "tueClose" },
  { label: "Wednesday", openKey: "wedOpen", closeKey: "wedClose" },
  { label: "Thursday", openKey: "thurOpen", closeKey: "thurClose" },
  { label: "Friday", openKey: "friOpen", closeKey: "friClose" },
  { label: "Saturday", openKey: "satOpen", closeKey: "satClose" },
  { label: "Sunday", openKey: "sunOpen", closeKey: "sunClose" },
];

const defaultHours = {
  monOpen: "00:00:00",
  monClose: "00:00:00",
  tueOpen: "00:00:00",
  tueClose: "00:00:00",
  wedOpen: "00:00:00",
  wedClose: "00:00:00",
  thurOpen: "00:00:00",
  thurClose: "00:00:00",
  friOpen: "00:00:00",
  friClose: "00:00:00",
  satOpen: "00:00:00",
  satClose: "00:00:00",
  sunOpen: "00:00:00",
  sunClose: "00:00:00",
};

function formatTime(time: string) {
  const [hour, minute] = time.split(":");
  return `${hour.padStart(2, "0")}:${minute.padStart(2, "0")}`;
}

const FormComponentOpeningHours = ({ record, setRecord }: Props) => {

  useEffect(() => {
    if (!record.openingHours) {
      setRecord(prev => ({
        ...prev,
        openingHours: defaultHours,
      }));
    }
  }, []);

  const handleTimeChange = (key: string, value: string) => {
    setRecord((prev: any) => ({
      ...prev,
      openingHours: {
        ...prev.openingHours,
        [key]: `${value}:00`,
      },
    }));
  };

  const handleClosed = (openKey: string, closeKey: string) => {
    setRecord((prev: any) => ({
      ...prev,
      openingHours: {
        ...prev.openingHours,
        [openKey]: "00:00:00",
        [closeKey]: "00:00:00",
      },
    }));
  };

  const handleOpenTilLate = (closeKey: string) => {
    setRecord((prev: any) => ({
      ...prev,
      openingHours: {
        ...prev.openingHours,
        [closeKey]: "23:59:00",
      },
    }));
  };

  return (
    <div className={styles.wrapper}>
      {DAYS.map(({ label, openKey, closeKey }) => (
        <div key={label} className={styles.row}>
          <label>{label}</label>
          <input
            type="time"
            value={formatTime(record.openingHours[openKey])}
            onChange={e => handleTimeChange(openKey, e.target.value)}
          />
          <input
            type="time"
            value={formatTime(record.openingHours[closeKey])}
            onChange={e => handleTimeChange(closeKey, e.target.value)}
          />
          <button
            type="button"
            onClick={() => handleClosed(openKey, closeKey)}
            className={`
              toggleButton
              ${record.openingHours[openKey] === "00:00:00" && record.openingHours[closeKey] === "00:00:00" ? "activeButton" : ''}
            `}
          >
            Closed
          </button>
          <button
            type="button"
            onClick={() => handleOpenTilLate(closeKey)}
            className={`
              toggleButton
              ${record.openingHours[closeKey] === "23:59:00" ? "activeButton" : ''}
            `}
          >
            Open til late
          </button>
        </div>
      ))}
    </div>
  );
};

export default FormComponentOpeningHours;
