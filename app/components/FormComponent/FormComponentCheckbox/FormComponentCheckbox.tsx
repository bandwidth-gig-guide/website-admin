import React from "react";

interface Props {
  label: string;
  name: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormComponentCheckbox: React.FC<Props> = ({ label, name, checked, onChange }) => (
  <div>
    <input
      id={name}
      type="checkbox"
      name={name}
      checked={checked}
      onChange={onChange}
    />
    <label htmlFor={name}>{label}</label>
  </div>
);

export default FormComponentCheckbox;
