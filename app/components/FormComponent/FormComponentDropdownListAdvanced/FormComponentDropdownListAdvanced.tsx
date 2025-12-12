import React, { useState, useEffect } from "react";
import styles from './FormComponentDropdownListAdvanced.module.css';

const FormComponentDropdownListAdvanced: React.FC<{
  label: string;
  name: string;
  value: string;
  options: { value: string; label: string }[];
  setValue: (val: { value: string; label: string }) => void;
  required?: boolean;
}> = ({
  label,
  name,
  value,
  options,
  setValue,
  required = true,
}) => {
    const [input, setInput] = useState("");

    useEffect(() => {
      const option = options.find(option => option.value === value);
      setInput(option?.label || value);
    }, [value, options])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInput(e.target.value);
      const option = options.find(option => option.label === e.target.value);
      const value = option || { value: "", label: e.target.value };
      setValue(value);
    };

    return (
      <div className={styles.wrapper}>
        <label htmlFor={name}>{label}</label>
        <input
          type="search"
          id={name}
          name={name}
          value={input}
          onChange={handleChange}
          required={required}
          list={`${name}-options`}
        />
        <datalist id={`${name}-options`}>
          {options.map((option, index) => (
            <option key={index} value={option.label} />
          ))}
        </datalist>
      </div>
    );
  };

export default FormComponentDropdownListAdvanced;
