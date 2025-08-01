import React, { useState, useEffect } from "react";
import styles from './FormComponentTextArea.module.css';
import { DESCRIPTION_MIN, DESCRIPTION_MAX } from "../../../constants/minMaxValues";

interface Props {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
  rows?: number;
  isDescription?: boolean;
}

const FormComponentTextArea: React.FC<Props> = ({
  label,
  name,
  value,
  onChange,
  required = true,
  rows = 20,
  isDescription = true
}) => {

  const [isAppropriateLength, setIsAppropriateLength] = useState<boolean>(false);
  const [wordCount, setWordCount] = useState<number>(0);

  useEffect(() => {
    if (!isDescription) {
      setIsAppropriateLength(true);
    }
  }, [isDescription])

  useEffect(() => {
    const count = value.trim().split(/\s+/).filter(Boolean).length;
    setWordCount(count);
    if (isDescription) {
      setIsAppropriateLength(
        count >= DESCRIPTION_MIN &&
        count <= DESCRIPTION_MAX
      );
    }
  }, [value, isDescription]);

  return (
    <div className={styles.wrapper}>
      <label htmlFor={name}>{label}</label>
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        rows={rows}
      />
      <div className={styles.wordCount}>
        <span className={!isAppropriateLength ? styles.warning : ''}>
          {wordCount}
        </span>
        {isDescription && (
          <span>&nbsp;| Target: {DESCRIPTION_MIN} - {DESCRIPTION_MAX}</span>
        )}
      </div>
    </div>
  );
};

export default FormComponentTextArea;
