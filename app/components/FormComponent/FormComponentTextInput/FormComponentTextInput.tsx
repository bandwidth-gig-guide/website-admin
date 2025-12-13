import React, { useEffect } from "react";
import styles from './FormComponentTextInput.module.css'

const FormComponentTextInput: React.FC<{
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}> = ({
  label,
  name,
  value,
  onChange,
  required = true
}) => {
  
  useEffect(() => {
    if (value) {
      const syntheticEvent = {
        target: { name, value },
        currentTarget: { name, value }
      } as React.ChangeEvent<HTMLInputElement>;
      onChange(syntheticEvent);
    }
  }, []);

  return (
    <div className={styles.wrapper}>
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  )
};

export default FormComponentTextInput;
