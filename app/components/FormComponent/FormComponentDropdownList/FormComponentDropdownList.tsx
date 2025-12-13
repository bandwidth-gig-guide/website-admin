import React, { useState, useEffect, ChangeEvent } from 'react';
import styles from './FormComponentDropdownList.module.css';

interface Props {
  label: string;
  name: string;
  value: string;
  options: (string | number)[];
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  required?: boolean;
}

const FormComponentDropdownList: React.FC<Props> = ({
  label,
  name,
  value,
  options = [],
  onChange,
  required = true,
}) => {
  const normalizedOptions = options.map(opt => String(opt));

  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    if (value) {
      const syntheticEvent = {
        target: { name, value },
        currentTarget: { name, value }
      } as React.ChangeEvent<HTMLInputElement>;
      onChange(syntheticEvent);
    }
  }, [])

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
    onChange(e);
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
          <option key={opt} value={opt} />
        ))}
      </datalist>
    </div>
  );
};

export default FormComponentDropdownList;
