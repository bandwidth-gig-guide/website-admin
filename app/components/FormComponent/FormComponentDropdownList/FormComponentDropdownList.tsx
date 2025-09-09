import React from "react";
import styles from './FormComponentDropdownList.module.css';

interface Props {
  label: string;
  name: string;
  value: string;
  options: string[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

const FormComponentInputWithOptions: React.FC<Props> = ({
  label,
  name,
  value,
  options = [],
  onChange,
  required = true
}) => {
  return (
    <div className={styles.wrapper}>
      <label htmlFor={name}>{label}</label>
      <input
        type="search"
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        list={`${name}-options`}
      />
      <datalist id={`${name}-options`}>
        {options && options.map((option) => (
          <option key={option} value={option} />
        ))}
      </datalist>
    </div>
  );
};

export default FormComponentInputWithOptions;
