import React from "react";

interface Props {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

const FormComponentTextInput: React.FC<Props> = ({ label, name, value, onChange, required }) => (
  <div>
    <label htmlFor={name}>{label}</label>
    <input id={name} name={name} value={value} onChange={onChange} required={required} />
  </div>
);

export default FormComponentTextInput;
