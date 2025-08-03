import React from "react";
import styles from "./FormComponentList.module.css";
import { Artist } from "../../../types/models/Artist";
import { Event } from "../../../types/models/Event";
import { Venue } from "../../../types/models/Venue";

type RecordWithList = Artist | Event | Venue;

interface Props {
  listName: keyof RecordWithList;
  options: string[];
  record: RecordWithList;
  setRecord: React.Dispatch<React.SetStateAction<RecordWithList>>;
}

const FormComponentList = ({ listName, options, record, setRecord }: Props) => {
  const selectedItems = (record[listName] ?? []) as string[];

  const toggleItem = (item: string) => {
    const updatedList = selectedItems.includes(item)
      ? selectedItems.filter(i => i !== item)
      : [...selectedItems, item];

    setRecord(prev => ({
      ...prev,
      [listName]: updatedList,
    }));
  };

  const clearAll = () => {
    setRecord(prev => ({
      ...prev,
      [listName]: [],
    }));
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.chipWrapper}>
        {options.map(option => (
          <button
            key={option}
            type="button"
            className={`${styles.chip} ${selectedItems.includes(option) ? styles.active : ""}`}
            onClick={() => toggleItem(option)}
          >
            {option}
          </button>
        ))}
        <div>
          <button
            type="button"
            onClick={clearAll}
            className={styles.removeButton}
          >
            <img src="/circle-cross.svg" alt="Clear All" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormComponentList;
