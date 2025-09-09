import React, { useState, useEffect } from "react";
import styles from "./FormComponentVenue.module.css";
import { Event } from "../../../types/models/Event";
import axios from "axios";
import apiUrl from "../../../api.config";

import FormComponentDropdownList from "../FormComponentDropdownList/FormComponentDropdownList";

interface Props {
  label: string;
  name: string
  record: Event;
  setRecord: React.Dispatch<React.SetStateAction<Event>>;
}

const FormComponentVenue = ({ label, name, record, setRecord }: Props) => {
  const [venueOptions, setVenueOptions] = useState<{ value: string; label: string }[]>([]);

  useEffect(() => {
    axios.get(`${apiUrl}/venue/id-and-title`)
      .then(response => {
        const options = response.data.map((venue: { VenueID: string; Title: string }) => ({
          value: venue.VenueID,
          label: venue.Title
        }));
        setVenueOptions(options);
      });
  }, []);

  return (
    <div className={styles.wrapper}>
      <FormComponentDropdownList
        label={label}
        name={name}
        value={record.venue ? record.venue?.title : ""}
        options={venueOptions}
        onChange={(val) => {
          setRecord(prev => {
            if (!prev) return prev;

            if (typeof val === "string") {
              return {
                ...prev,
                venue: {
                  ...prev.venue,
                  title: val,
                  venueID: "",
                  stageTitle: prev.venue?.stageTitle || "",
                  imageUrl: prev.venue?.imageUrl || ""
                }
              };
            } else {
              return {
                ...prev,
                venue: {
                  ...prev.venue,
                  title: val.label,
                  venueID: val.value,
                  stageTitle: prev.venue?.stageTitle || "",
                  imageUrl: prev.venue?.imageUrl || ""
                }
              };
            }
          });
        }}
        required={true}
      />
    </div>
  );
};

export default FormComponentVenue;
