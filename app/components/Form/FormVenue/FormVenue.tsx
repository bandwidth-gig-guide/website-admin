import React, { ChangeEvent, FormEvent } from "react";
import { Venue } from "../../../types/models/Venue";
import { pascalcaseKeys } from "../../../util/pascalcaseKeys";
import axios from "axios";
import apiUrl from "../../../api.config";

// Reusable components
import FormComponentTextInput from "../../FormComponent/FormComponentTextInput/FormComponentTextInput";
import FormComponentNumberInput from "../../FormComponent/FormComponentNumberInput/FormComponentNumberInput";
import FormComponentDropdownList from "../../FormComponent/FormComponentDropdownList/FormComponentDropdownList";
import FormComponentTextArea from "../../FormComponent/FormComponentTextArea/FormComponentTextArea";
import FormComponentImages from "../../FormComponent/FormComponentImages/FormComponentImages";
import FormComponentSocials from "../../FormComponent/FormComponentSocials/FormComponentSocials";
import FormComponentList from "../../FormComponent/FormComponentList/FormComponentList";
import FormComponentEmbed from "../../FormComponent/FormComponentEmbed/FormComponentEmbed";
import FormComponentStages from "../../FormComponent/FormComponentStages/FormComponentStages";
import FormComponentOpeningHours from "../../FormComponent/FormComponentOpeningHours/FormComponentOpeningHours";


import { TAGS } from "../../../constants/tags";
import { VENUE_TYPES } from "../../../constants/venueTypes";
import { STATE_CODE } from "../../../constants/stateCode";
import { COUNTRY } from "../../../constants/country";


interface FormVenueProps {
  venue: Venue | null;
  setVenue: React.Dispatch<React.SetStateAction<Venue | null>>;
}

const FormVenue: React.FC<FormVenueProps> = ({ venue, setVenue }) => {
  if (!venue) return <div>Loading venue data...</div>;

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target;
    setVenue(prev => prev ? {
      ...prev,
      [name]: type === "checkbox" ? checked : value
    } : prev);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const data = pascalcaseKeys(venue);
      if (venue.venueId) {
        await axios.put(`${apiUrl}/venue/${venue.venueId}`, data, {
          headers: { "Content-Type": "application/json" }
        });
        alert("Venue updated!");
      } else {
        await axios.post(`${apiUrl}/venue`, data, {
          headers: { "Content-Type": "application/json" }
        });
        alert("Venue created!");
      }
    } catch (error) {
      console.error("Error submitting venue:", error);
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
            value={venue.title}
            onChange={handleChange}
          />
          <FormComponentTextInput
            label="City"
            name="city"
            value={venue.city}
            onChange={handleChange}
          />
          <FormComponentTextInput
            label="Street Address"
            name="streetAddress"
            value={venue.streetAddress}
            onChange={handleChange}
          />
          <FormComponentNumberInput
            label="Post Code"
            name="postCode"
            value={venue.postCode}
            onChange={handleChange}
            numberType="postCode"
          />
          <FormComponentDropdownList
            label="State"
            name="stateCode"
            value={venue.stateCode}
            onChange={handleChange}
            options={STATE_CODE}
          />
          <FormComponentTextInput
            label="Website"
            name="websiteUrl"
            value={venue.websiteUrl}
            onChange={handleChange}
          />
          <FormComponentTextInput
            label="Phone Number"
            name="phoneNumber"
            value={venue.phoneNumber}
            onChange={handleChange}
          />
          <FormComponentTextArea
            label="Description"
            name="description"
            value={venue.description}
            onChange={handleChange}
            required={true}
          />
        </div>
      </fieldset>

      {/* Social Links */}
      <fieldset>
        <legend>Socials</legend>
      <FormComponentSocials
        record={venue}
        setRecord={setVenue}
      />
      </fieldset>

      {/* Opening Hours */}
      <fieldset>
        <legend>Opening Hours</legend>
        <FormComponentOpeningHours
          record={venue}
          setRecord={setVenue}
        />
      </fieldset>

      {/* Images */}
      <fieldset>
        <legend>Images</legend>
        <FormComponentImages
          record={venue}
          setRecord={setVenue}
        />
      </fieldset>

      {/* Tags */}
      <fieldset>
        <legend>Tags</legend>
        <FormComponentList
          listName="tags"
          options={TAGS}
          record={venue}
          setRecord={setVenue}
        />
      </fieldset>

      {/* Types */}
      <fieldset>
        <legend>Types</legend>
        <FormComponentList
          listName="types"
          options={VENUE_TYPES}
          record={venue}
          setRecord={setVenue}
        />
      </fieldset>


      {/* Embeds */}
      <fieldset>
        <legend>Embeds</legend>
        <div style={{
          overflowX: "scroll",
          display: "flex",
          flexDirection: "row",
          flexWrap: "nowrap",
          gap: "12px"
        }}>
          <FormComponentEmbed
            label="Google Maps"
            name="googleMapsEmbedUrl"
            url={venue.googleMapsEmbedUrl}
            onChange={handleChange}
            required={true}
          />
        </div>
      </fieldset>

      {/* Stages */}
      <fieldset>
        <legend>Stages</legend>
        <FormComponentStages
          record={venue}
          setRecord={setVenue}
        />
      </fieldset>



      {/* Submit Button */}
      <button type="submit">Save Changes</button>
    </form >
  );
};

export default FormVenue;
