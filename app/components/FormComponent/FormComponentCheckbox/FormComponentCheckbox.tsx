import React from "react";
import styles from "./FormComponentCheckbox.module.css"

interface Props {
  label: string;
  name: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

const FormComponentCheckbox: React.FC<Props> = ({
  label,
  name,
  checked,
  onChange,
  required = true
}) => {
  return (
    <div className={`${styles.wrapper} ${checked ? styles.checked : ''}`}>
      <input
        id={name}
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
        required={required}
      />
      <label
        htmlFor={name}
      >
        {label}
      </label>
    </div>
  )
};

export default FormComponentCheckbox;
