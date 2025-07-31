import React from "react";

interface Props {
  label: string;
  name: string;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  min?: number;
  max?: number;
  numberType?: 'year' | 'price' | 'any';
}

const FormComponentNumberInput: React.FC<Props> = ({
  label,
  name,
  value,
  onChange,
  required = true,
  min,
  max,
  numberType = 'any'
}) => {

  // Set input attributes based on numberType
  let inputProps: React.InputHTMLAttributes<HTMLInputElement> = {};

  // Handler to restrict input length for year type
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (numberType === 'year') {
      const newValue = e.target.value.replace(/\D/g, '').slice(0, 4);
      if (newValue !== e.target.value) {
        const syntheticEvent = {
          ...e,
          target: {
            ...e.target,
            value: newValue
          }
        } as React.ChangeEvent<HTMLInputElement>;
        onChange(syntheticEvent);
        return;
      }
    }
    onChange(e);
  };

  if (numberType === 'year') {
    inputProps.min = min !== undefined ? min : 1000;
    inputProps.max = max !== undefined ? max : 9999;
    inputProps.step = 1;
    inputProps.pattern = "\\d{4}";
    inputProps.maxLength = 4;
  } else if (numberType === 'price') {
    inputProps.min = min !== undefined ? min : 0;
    inputProps.max = max;
    inputProps.step = 0.01;
    inputProps.inputMode = "decimal";
  } else {
    if (min !== undefined) inputProps.min = min;
    if (max !== undefined) inputProps.max = max;
  }

  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
        required={required}
        type="number"
        inputMode={inputProps.inputMode || "numeric"}
        {...inputProps}
      />
    </div>
  );
};

export default FormComponentNumberInput;
