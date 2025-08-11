import React from "react";
import styles from './FormComponentDateTime.module.css';

interface Props {
  label: string;
  name: string;
  value: string; // ISO string: "2025-08-20T18:00:00"
  onChange: (newIsoValue: string) => void;
  required?: boolean;
}

const FormComponentDateTime: React.FC<Props> = ({ 
  label,
  name,
  value,
  onChange,
  required = true 
}) => {
  const [datePart = "", timePart = ""] = (value ? value : "").split("T");

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = e.target.value;
    if (newDate && timePart) {
      onChange(`${newDate}T${timePart}`);
    }
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = e.target.value;
    if (newTime && datePart) {
      onChange(`${datePart}T${newTime}:00`);
    }
  };

  const handleTimeUnknown = () => {
    if (datePart) {
      onChange(`${datePart}T00:01:00`);
    }
  };

  return (
    <div className={styles.wrapper}>
      <label htmlFor={`${name}-date`}>{label}</label>
      <input
        type="date"
        id={`${name}-date`}
        name={`${name}-date`}
        value={datePart}
        onChange={handleDateChange}
        required={required}
      />
      <input
        type="time"
        id={`${name}-time`}
        name={`${name}-time`}
        value={timePart?.slice(0, 5) || ""}
        onChange={handleTimeChange}
        required={required}
      />
      <button 
        type="button" 
        onClick={handleTimeUnknown}
        className={`
          toggleButton
          ${timePart === "00:01:00" ? "activeButton" : ""}
        `}
      >
        Time unknown
      </button>
    </div>
  );
};

export default FormComponentDateTime;
