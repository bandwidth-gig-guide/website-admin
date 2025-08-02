import React, { ChangeEvent, FormEvent as FormEventReact } from "react";
import { Event } from "../../../types/models/Event";
import { pascalcaseKeys } from "../../../util/pascalcaseKeys";
import axios from "axios";
import apiUrl from "../../../api.config";

// Reusable components
import FormComponentTextInput from "../../FormComponent/FormComponentTextInput/FormComponentTextInput";
import FormComponentNumberInput from "../../FormComponent/FormComponentNumberInput/FormComponentNumberInput";
import FormComponentPerformances from "../../FormComponent/FormComponentPerformances/FormComponentPerformances";
import FormComponentTextArea from "../../FormComponent/FormComponentTextArea/FormComponentTextArea";
import FormComponentImages from "../../FormComponent/FormComponentImages/FormComponentImages";
import FormComponentSocials from "../../FormComponent/FormComponentSocials/FormComponentSocials";
import FormComponentList from "../../FormComponent/FormComponentList/FormComponentList";
import FormComponentDropdownList from "../../FormComponent/FormComponentDropdownList/FormComponentDropdownList";
import FormComponentDateTime from "../../FormComponent/FormComponentDateTime/FormComponentDateTime";
import FormComponentTicketPrices from "../../FormComponent/FormComponentTicketPrices/FormComponentTicketPrices";


import { TAGS } from "../../../constants/tags";
import { EVENT_TYPES } from "../../../constants/eventTypes";


interface FormEventProps {
  event: Event | null;
  setEvent: React.Dispatch<React.SetStateAction<Event | null>>;
}

const FormEvent: React.FC<FormEventProps> = ({ event, setEvent }) => {
  if (!event) return <div>Loading venue data...</div>;

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEvent(prev => prev ? {
      ...prev,
      [name]: value
    } : prev);
  };

  const handleChangeDateTime = (name: string, newIso: string) => {
    setEvent(prev => prev ? {
      ...prev,
      [name]: newIso
    } : prev);
  };

  const handleSubmit = async (e: FormEventReact) => {
    e.preventDefault();
    try {
      const data = pascalcaseKeys(event);
      if (event.eventId) {
        await axios.put(`${apiUrl}/event/${event.eventId}`, data, {
          headers: { "Content-Type": "application/json" }
        });
        alert("Event updated!");
      } else {
        await axios.post(`${apiUrl}/event`, data, {
          headers: { "Content-Type": "application/json" }
        });
        alert("Event created!");
      }
    } catch (error) {
      console.error("Error submitting event:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Basic Info */}
      <fieldset>
        <legend>Basic Information</legend>
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "8px"
        }}>
          <FormComponentTextInput
            label="Title"
            name="title"
            value={event.title}
            onChange={handleChange}
          />
          <FormComponentDateTime
            label="Start Date & Time"
            name="startDateTime"
            value={event.startDateTime}
            onChange={(newIso) => handleChangeDateTime("startDateTime", newIso)}
            required={true}
          />

          {/* TODO */}
          <FormComponentDropdownList
            label="Venue"
            name="venue.title"
            value={event.venue ? event.venue.title : ""}
            options={["The Gaso", "The Tote"]}
            onchange={handleChange}
            required={true}
          />
          <FormComponentTextInput
            label="Original Post URL"
            name="originalPostUrl"
            value={event.originalPostUrl}
            onChange={handleChange}
          />
          <FormComponentTextInput
            label="Ticket Sale URL"
            name="ticketSaleUrl"
            value={event.ticketSaleUrl}
            onChange={handleChange}
          />
          <FormComponentTextArea
            label="Description"
            name="description"
            value={event.description}
            onChange={handleChange}
            required={true}
          />
        </div>
      </fieldset>

      {/* Social Links */}
      <fieldset>
        <legend>Socials</legend>
        <FormComponentSocials
          record={event}
          setRecord={setEvent}
        />
      </fieldset>

      {/* Images */}
      <fieldset>
        <legend>Images</legend>
        <FormComponentImages
          record={event}
          setRecord={setEvent}
        />
      </fieldset>

      {/* Tags */}
      <fieldset>
        <legend>Tags</legend>
        <FormComponentList
          listName="tags"
          options={TAGS}
          record={event}
          setRecord={setEvent}
        />
      </fieldset>

      {/* Types */}
      <fieldset>
        <legend>Types</legend>
        <FormComponentList
          listName="types"
          options={EVENT_TYPES}
          record={event}
          setRecord={setEvent}
        />
      </fieldset>

      {/* Performances */}
      <fieldset>
        <legend>Performances</legend>
        <FormComponentPerformances
          record={event}
          setRecord={setEvent}
        />
      </fieldset>

      {/* Prices */}
      <fieldset>
        <legend>Ticket Prices</legend>
        <FormComponentTicketPrices
          record={event}
          setRecord={setEvent}
        />
      </fieldset>

      {/* Submit Button */}
      <button type="submit">Save Changes</button>
    </form >
  );
};

export default FormEvent;
