import React, { useState, useEffect } from "react";
import styles from "./FormComponentVenue.module.css";
import { Event } from "../../../types/models/Event";
import axios from "axios";
import getConfig from "next/config";
import FormComponentDropdownListAdvanced from "../FormComponentDropdownListAdvanced/FormComponentDropdownListAdvanced";

interface Props {
  label: string;
  name: string
  record: Event;
  setRecord: React.Dispatch<React.SetStateAction<Event>>;
}

const FormComponentVenue = ({ label, name, record, setRecord }: Props) => {
  const [venueOptions, setVenueOptions] = useState<
    { value: string; label: string; stageId: string; stageTitle: string }[]
  >([]);
  const api = getConfig().publicRuntimeConfig.SERVICE_ADMIN_API_URL

  useEffect(() => {
    axios.get(`${api}/venue/id-and-title`)
      .then(response => {
        const options = response.data.map((venue: { VenueID: string; Title: string; StageID: string; StageTitle: string }) => ({
          value: venue.VenueID,
          label: `${venue.Title} | ${venue.StageTitle}`,
          stageId: venue.StageID,
          stageTitle: venue.StageTitle
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
          const selectedStageTitle = val.label.split(" | ")[1];
          const selectedVenue = venueOptions.find((venue) => venue.stageTitle === selectedStageTitle);
          setRecord(prev => ({
            ...prev,
            venue: {
              ...prev.venue,
              venueID: val.value,
              title: val.label.split(" | ")[0],
              stageId: selectedVenue?.stageId || "",
              stageTitle: selectedStageTitle,
              imageUrl: prev.venue?.imageUrl || "https://dummy.com"
            }
          }));
        }}
      />
    </div>
  );
};

export default FormComponentVenue;
