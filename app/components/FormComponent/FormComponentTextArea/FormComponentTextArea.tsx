import React from "react";

interface Props {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
  rows?: number;
}

const FormComponentTextArea: React.FC<Props> = ({
  label,
  name,
  value,
  onChange,
  required = true,
  rows = 20
}) => (
  <div>
    <label htmlFor={name}>{label}</label>
    <textarea
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      rows={rows}
    />
  </div>
);

export default FormComponentTextArea;
