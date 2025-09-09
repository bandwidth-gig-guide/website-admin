import React, { useState, useEffect } from "react";
import styles from "./FormComponentVenue.module.css";
import { Event } from "../../../types/models/Event";
import axios from "axios";
import apiUrl from "../../../api.config";

import FormComponentDropdownListAdvanced from "../FormComponentDropdownListAdvanced/FormComponentDropdownListAdvanced";

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
      <FormComponentDropdownListAdvanced
        label={label}
        name={name}
        value={record?.venue?.venueID || ""}
        options={venueOptions}
        setValue={(val) => {
          setRecord(prev => ({
            ...prev,
            venue: {
              ...prev.venue,
              venueID: val.value,
              title: val.label,
              stageTitle: prev.venue?.stageTitle || "",
              imageUrl: prev.venue?.imageUrl || ""
            }
          }));
        }}
      />
    </div>
  );
};

export default FormComponentVenue;
