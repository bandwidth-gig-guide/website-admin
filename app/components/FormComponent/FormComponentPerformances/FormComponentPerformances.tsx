import React, { useState, useEffect } from "react";
import styles from "./FormComponentPerformances.module.css";
import { Event } from "../../../types/models/Event";

interface Props {
  record: Event;
  setRecord: React.Dispatch<React.SetStateAction<Event>>;
}

const FormComponentPerformances = ({ record, setRecord }: Props) => {

  return (
    <div className={styles.wrapper}>
      {!record.performances ? (
      <div className={styles.emptyState}>No performances.</div>
      ) : (
      record.performances.map((performance, index) => (
        <div className={styles.cardWrapper} key={index}>
        <div className={styles.imgWrapper}>
          <img src={performance.imageUrl} alt={performance.title} />
        </div>
        <span>{performance.title}</span>
        <span>{performance.startDateTime.toLocaleString()}</span>
        </div>
      ))
      )}

      <button type="button" className={styles.addButton}>
      Add Performance
      </button>
    </div>
  );
};

export default FormComponentPerformances;