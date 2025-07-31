import React from "react";
import styles from "./FormComponentCheckbox.module.css"

interface Props {
  label: string;
  name: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormComponentCheckbox: React.FC<Props> = ({ label, name, checked, onChange }) => (
  <div 
    className={`
      ${styles.wrapper} 
      ${checked ? styles.checked : ''}
    `}
  >
    <input
      id={name}
      type="checkbox"
      name={name}
      checked={checked}
      onChange={onChange}
    />
    <label
      htmlFor={name}
    >
      {label}
    </label>
</div>

);

export default FormComponentCheckbox;
