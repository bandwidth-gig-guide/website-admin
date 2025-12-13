import React, { ChangeEvent } from "react";

// Components
import FormComponentDateTime from "../FormComponent/FormComponentDateTime/FormComponentDateTime";
import FormComponentImages from "../FormComponent/FormComponentImages/FormComponentImages";
import FormComponentList from "../FormComponent/FormComponentList/FormComponentList";
import FormComponentPerformances from "../FormComponent/FormComponentPerformances/FormComponentPerformances";
import FormComponentSocials from "../FormComponent/FormComponentSocials/FormComponentSocials";
import FormComponentTextArea from "../FormComponent/FormComponentTextArea/FormComponentTextArea";
import FormComponentTextInput from "../FormComponent/FormComponentTextInput/FormComponentTextInput";
import FormComponentTicketPrices from "../FormComponent/FormComponentTicketPrices/FormComponentTicketPrices";
import FormComponentVenue from "../FormComponent/FormComponentVenue/FormComponentVenue";
import FormComponentCheckbox from "../FormComponent/FormComponentCheckbox/FormComponentCheckbox";

// Types and Constants
import { Event } from "../../types/models/Event";
import { TAGS } from "../../constants/tags";
import { EVENT_TYPES } from "../../constants/eventTypes";

interface FormEventProps {
  event: Event;
  setEvent: React.Dispatch<React.SetStateAction<Event>>;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const FormEvent: React.FC<FormEventProps> = ({
  event,
  setEvent,
  onChange
}) => {
  if (!event) return null;

  const handleChangeDateTime = (name: string, newIso: string) => {
    setEvent(prev => prev ? { ...prev, [name]: newIso } : prev);
  };

  return (
    <>
      <fieldset>
        <legend>Basic Information</legend>
        <FormComponentTextInput
          label="Title"
          name="title"
          value={event.title}
          onChange={onChange}
        />
        <FormComponentDateTime
          label="Start Date & Time"
          name="startDateTime"
          value={event.startDateTime}
          onChange={(newIso) => handleChangeDateTime("startDateTime", newIso)}
        />
        <FormComponentVenue
          label="Venue"
          name="venue.title"
          record={event}
          setRecord={setEvent}
        />
        <FormComponentTextInput
          label="Original Post URL"
          name="originalPostUrl"
          value={event.originalPostUrl}
          onChange={onChange}
        />
        <FormComponentTextInput
          label="Ticket Sale URL"
          name="ticketSaleUrl"
          value={event.ticketSaleUrl}
          onChange={onChange}
        />
        <FormComponentTextArea
          label="Description"
          name="description"
          value={event.description}
          onChange={onChange}
        />
      </fieldset>

      <fieldset>
        <legend>Toggles</legend>
          <FormComponentCheckbox
            label="Featured Event"
            name="isFeatured"
            checked={event.isFeatured}
            onChange={(e) => setEvent(prev => ({ ...prev, isFeatured: e.target.checked }))}
          />
      </fieldset>

      <fieldset>
        <legend>Socials</legend>
        <FormComponentSocials
          record={event}
          setRecord={setEvent}
        />
      </fieldset>

      <fieldset>
        <legend>Images</legend>
        <FormComponentImages
          record={event}
          setRecord={setEvent}
        />
      </fieldset>

      <fieldset>
        <legend>Tags</legend>
        <FormComponentList
          listName="tags"
          options={TAGS}
          record={event}
          setRecord={setEvent}
        />
      </fieldset>

      <fieldset>
        <legend>Types</legend>
        <FormComponentList
          listName="types"
          options={EVENT_TYPES}
          record={event}
          setRecord={setEvent}
        />
      </fieldset>

      <fieldset>
        <legend>Performances</legend>
        <FormComponentPerformances
          record={event}
          setRecord={setEvent}
        />
      </fieldset>

      <fieldset>
        <legend>Ticket Prices</legend>
        <FormComponentTicketPrices
          record={event}
          setRecord={setEvent}
        />
      </fieldset>
    </>
  );
};

export default FormEvent;
