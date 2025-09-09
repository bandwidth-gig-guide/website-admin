import React, { useState, useEffect } from "react";
import styles from './FormComponentDropdownList.module.css';

type Option = string | number | { value: string | number; label: string };

type ValueChangeHandler = (value: { value: string; label: string } | string) => void;
type EventChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => void;

interface Props {
  label: string;
  name: string;
  value: string;
  options: Option[];
  onChange: ValueChangeHandler | EventChangeHandler;
  required?: boolean;
}

const FormComponentDropdownList: React.FC<Props> = ({
  label,
  name,
  value,
  options = [],
  onChange,
  required = true
}) => {
  const normalizedOptions = options.map(opt => {
    if (typeof opt === "string" || typeof opt === "number") {
      return { value: String(opt), label: String(opt) };
    }
    return { value: String(opt.value), label: String(opt.label) };
  });

  const initialLabel =
    normalizedOptions.find(o => o.value === value)?.label || value;

  const [inputValue, setInputValue] = useState(initialLabel);

  useEffect(() => {
    const newLabel =
      normalizedOptions.find(o => o.value === value)?.label || value;
    setInputValue(newLabel);
  }, [value, normalizedOptions]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newText = e.target.value;
    setInputValue(newText);

    const match = normalizedOptions.find(o => o.label === newText);

    if (typeof onChange === "function") {
      if (onChange.length === 1 && "target" in e) {
        (onChange as EventChangeHandler)(e);
      } else {
        if (match) {
          (onChange as ValueChangeHandler)(match);
        } else {
          (onChange as ValueChangeHandler)(newText);
        }
      }
    }
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
        {normalizedOptions.map(opt => (
          <option key={opt.value} value={opt.label} />
        ))}
      </datalist>
    </div>
  );
};

export default FormComponentDropdownList;
