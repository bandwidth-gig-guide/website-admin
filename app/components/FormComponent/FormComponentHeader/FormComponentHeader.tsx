import React, { FormEvent } from "react";
import { Artist } from "../../../types/models/Artist";
import { Event } from "../../../types/models/Event";
import { Venue } from "../../../types/models/Venue";
import styles from './FormComponentHeader.module.css';
import { PageType } from "../../../types/enums/PageType";

interface Props {
  type: PageType;
  record: Artist | Event | Venue;
  onSubmit: (e: FormEvent) => void;
  onDelete: () => void;
  onReset: () => void;
}

const FormComponentHeader: React.FC<Props> = ({
  type,
  record,
  onSubmit,
  onDelete,
  onReset
}) => {
  if (!record) return;

  const getId = () => {
    if (type === PageType.Artist && 'artistId' in record) return record.artistId;
    if (type === PageType.Event && 'eventId' in record) return record.eventId;
    if (type === PageType.Venue && 'venueId' in record) return record.venueId;
  };

  const id = getId();
  const title = ('title' in record) ? record.title : '';
  const displayType = type.charAt(0).toUpperCase() + type.slice(1);

  return (
    <div className={styles.wrapper}>
      <div className={styles.headerText}>
        <h1>{id ? title : `New ${displayType}`}</h1>
        <h2>{id ? `${displayType} | ${id}` : title}</h2>
      </div>
      <div className={styles.buttonRow}>
        <button type="button" onClick={onReset}>
          <img src="/refresh.svg" alt="Refresh Icon" />
        </button>
        <button type="button" onClick={onDelete}>
          <img src="/delete.svg" alt="Delete Icon" />
        </button>
        <button type="submit" onClick={onSubmit}>
          <img src="/save.svg" alt="Save Icon" />
        </button>
      </div>
    </div>
  );
};

export default FormComponentHeader;
