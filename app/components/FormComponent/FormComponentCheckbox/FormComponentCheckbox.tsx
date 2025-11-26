import React, { useRef } from "react";
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
  const inputRef = useRef<HTMLInputElement>(null);

  const handleWrapperClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <div 
      className={`${styles.wrapper} ${checked ? styles.checked : ''}`}
      onClick={handleWrapperClick}
    >
      {label}
      <input
        ref={inputRef}
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
