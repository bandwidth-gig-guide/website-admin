import React, { useState, useEffect } from "react";
import styles from './FormComponentDropdownListAdvanced.module.css';

type Option = { value: string; label: string };

interface Props {
  label: string;
  name: string;
  value: string;
  options: Option[];
  setValue: (val: { value: string; label: string }) => void; // callback
  required?: boolean;
}

const FormComponentDropdownListAdvanced: React.FC<Props> = ({
  label,
  name,
  value,
  options,
  setValue,
  required = true,
}) => {
  const normalizedOptions = options.map(opt => ({
    value: String(opt.value),
    label: String(opt.label),
  }));

  const initialLabel = normalizedOptions.find(o => o.value === value)?.label || "";

  const [inputValue, setInputValue] = useState(initialLabel);

  useEffect(() => {
    const newLabel = normalizedOptions.find(o => o.value === value)?.label || "";
    setInputValue(newLabel);
  }, [value, normalizedOptions]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newText = e.target.value;
    setInputValue(newText);

    const matchedOption = normalizedOptions.find(o => o.label === newText);
    const valueToSet = matchedOption || { value: "", label: newText };

    setValue(valueToSet);
  };

  return (
    <div className={styles.wrapper}>
      <label htmlFor={name}>{label}</label>
      <input
        type="search"
        id={name}
        name={name}
        value={inputValue}
        onChange={handleChange}
        required={required}
        list={`${name}-options`}
      />
      <datalist id={`${name}-options`}>
        {normalizedOptions.map((option, index) => (
          <option key={index} value={option.label} />
        ))}
      </datalist>
    </div>
  );
};

export default FormComponentDropdownListAdvanced;
