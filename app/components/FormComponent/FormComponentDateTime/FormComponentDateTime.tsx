import React from "react";
import styles from './FormComponentDateTime.module.css';


const FormComponentDateTime: React.FC<{
  label: string;
  name: string;
  value?: string; // ISO string: "2025-01-01T18:00:00"
  onChange: (newIsoValue: string) => void;
  required?: boolean;
}> = ({
  label,
  name,
  value = "",
  onChange,
  required = true
}) => {
  const fallbackValue = value || `${new Date().toISOString().split('T')[0]}T00:01:00`;
  const [datePart, timePart] = fallbackValue.split("T");


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
      onChange(`${datePart}T00:01:00`);
  };


  return (
    <div className={styles.wrapper}>
      <label htmlFor={`${name}-date`}>
        {label}
      </label>
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
        className={`toggleButton ${timePart === "00:01:00" ? "activeButton" : ""}`}
      >
        Time Unknown
      </button>
    </div>
  );
};

export default FormComponentDateTime;
