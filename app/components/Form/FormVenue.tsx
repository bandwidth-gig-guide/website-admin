import React, { ChangeEvent } from "react";
import styles from './FormVenue.module.css'

// Components
import FormComponentDropdownList from "../FormComponent/FormComponentDropdownList/FormComponentDropdownList";
import FormComponentEmbed from "../FormComponent/FormComponentEmbed/FormComponentEmbed";
import FormComponentImages from "../FormComponent/FormComponentImages/FormComponentImages";
import FormComponentList from "../FormComponent/FormComponentList/FormComponentList";
import FormComponentNumberInput from "../FormComponent/FormComponentNumberInput/FormComponentNumberInput";
import FormComponentOpeningHours from "../FormComponent/FormComponentOpeningHours/FormComponentOpeningHours";
import FormComponentSocials from "../FormComponent/FormComponentSocials/FormComponentSocials";
import FormComponentStages from "../FormComponent/FormComponentStages/FormComponentStages";
import FormComponentTextArea from "../FormComponent/FormComponentTextArea/FormComponentTextArea";
import FormComponentTextInput from "../FormComponent/FormComponentTextInput/FormComponentTextInput";
import FormComponentCheckbox from "../FormComponent/FormComponentCheckbox/FormComponentCheckbox";

// Types & Constants
import { Venue } from "../../types/models/Venue";
import { TAGS } from "../../constants/tags";
import { VENUE_TYPES } from "../../constants/venueTypes";
import { STATE_CODE } from "../../constants/stateCode";

interface Props {
  venue: Venue;
  setVenue: React.Dispatch<React.SetStateAction<Venue>>;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const FormVenue: React.FC<Props> = ({
  venue,
  setVenue,
  onChange
}) => {
  if (!venue) return;

  return (
    <>
      <fieldset>
        <legend>Basic Information</legend>
        <div className="multipleComponentsWrapper">
          <FormComponentTextInput
            label="Title"
            name="title"
            value={venue.title}
            onChange={onChange}
          />
          <FormComponentTextInput
            label="City"
            name="city"
            value={venue.city}
            onChange={onChange}
          />
          <FormComponentTextInput
            label="Street Address"
            name="streetAddress"
            value={venue.streetAddress}
            onChange={onChange}
          />
          <FormComponentNumberInput
            label="Post Code"
            name="postCode"
            value={venue.postCode}
            onChange={onChange}
            numberType="postCode"
          />
          <FormComponentDropdownList
            label="State"
            name="stateCode"
            value={venue.stateCode}
            onChange={onChange}
            options={STATE_CODE}
          />
          <FormComponentTextInput
            label="Website"
            name="websiteUrl"
            value={venue.websiteUrl}
            onChange={onChange}
          />
          <FormComponentTextInput
            label="Phone Number"
            name="phoneNumber"
            value={venue.phoneNumber}
            onChange={onChange}
          />
          <FormComponentTextArea
            label="Description"
            name="description"
            value={venue.description}
            onChange={onChange}
            required={true}
          />
        </div>
      </fieldset>

      <fieldset>
        <legend>Toggles</legend>
          <div className={styles.chipWrapper}>
            <FormComponentCheckbox
              label="Featured Venue"
              name="isFeatured"
              checked={venue.isFeatured}
              onChange={(e) => setVenue(prev => ({ ...prev, isFeatured: e.target.checked }))}
            />
            <FormComponentCheckbox
              label="Monitored Venue"
              name="isMonitored"
              checked={venue.isMonitored}
              onChange={(e) => setVenue(prev => ({ ...prev, isMonitored: e.target.checked }))}
            />
          </div>
      </fieldset>

      <fieldset>
        <legend>Socials</legend>
        <FormComponentSocials record={venue} setRecord={setVenue} />
      </fieldset>

      <fieldset>
        <legend>Opening Hours</legend>
        <FormComponentOpeningHours record={venue} setRecord={setVenue} />
      </fieldset>

      <fieldset>
        <legend>Images</legend>
        <FormComponentImages record={venue} setRecord={setVenue} />
      </fieldset>

      <fieldset>
        <legend>Tags</legend>
        <FormComponentList
          listName="tags"
          options={TAGS}
          record={venue}
          setRecord={setVenue}
        />
      </fieldset>

      <fieldset>
        <legend>Types</legend>
        <FormComponentList
          listName="types"
          options={VENUE_TYPES}
          record={venue}
          setRecord={setVenue}
        />
      </fieldset>

      <fieldset>
        <legend>Embeds</legend>
        <div className="embedWrapper">
          <FormComponentEmbed
            label="Google Maps"
            name="googleMapsEmbedUrl"
            url={venue.googleMapsEmbedUrl}
            onChange={onChange}
            required={true}
          />
        </div>
      </fieldset>

      <fieldset>
        <legend>Stages</legend>
        <FormComponentStages record={venue} setRecord={setVenue} />
      </fieldset>
    </>
  );
};

export default FormVenue;
