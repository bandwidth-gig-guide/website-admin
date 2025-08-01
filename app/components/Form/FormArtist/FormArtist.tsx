import React, { ChangeEvent, FormEvent } from "react";
import { Artist } from "../../../types/models/Artist";
import { pascalcaseKeys } from "../../../util/pascalcaseKeys";
import axios from "axios";
import apiUrl from "../../../api.config";

// Reusable components
import FormComponentTextInput from "../../FormComponent/FormComponentTextInput/FormComponentTextInput";
import FormComponentNumberInput from "../../FormComponent/FormComponentNumberInput/FormComponentNumberInput";
import FormComponentCheckbox from "../../FormComponent/FormComponentCheckbox/FormComponentCheckbox";
import FormComponentTextArea from "../../FormComponent/FormComponentTextArea/FormComponentTextArea";
import FormComponentImages from "../../FormComponent/FormComponentImages/FormComponentImages";
import FormComponentSocials from "../../FormComponent/FormComponentSocials/FormComponentSocials";
import FormComponentList from "../../FormComponent/FormComponentList/FormComponentList";
import FormComponentEmbed from "../../FormComponent/FormComponentEmbed/FormComponentEmbed";


import { TAGS } from "../../../constants/tags";
import { ARTIST_TYPES } from "../../../constants/artistTypes";


interface FormArtistProps {
  artist: Artist | null;
  setArtist: React.Dispatch<React.SetStateAction<Artist | null>>;
}

const FormArtist: React.FC<FormArtistProps> = ({ artist, setArtist }) => {
  if (!artist) return <div>Loading artist data...</div>;

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target;
    setArtist(prev => prev ? {
      ...prev,
      [name]: type === "checkbox" ? checked : value
    } : prev);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const data = pascalcaseKeys(artist);
      if (artist.artistId) {
        await axios.put(`${apiUrl}/artist/${artist.artistId}`, data, {
          headers: { "Content-Type": "application/json" }
        });
        alert("Artist updated!");
      } else {
        await axios.post(`${apiUrl}/artist`, data, {
          headers: { "Content-Type": "application/json" }
        });
        alert("Artist created!");
      }
    } catch (error) {
      console.error("Error submitting artist:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Basic Info */}
      <fieldset>
        <legend>Basic Information</legend>
        <FormComponentTextInput
          label="Title"
          name="title"
          value={artist.title}
          onChange={handleChange}
        />

        <FormComponentNumberInput
          label="Year Founded"
          name="yearFounded"
          value={artist.yearFounded}
          onChange={handleChange}
          min={1920}
          max={new Date().getFullYear()}
          numberType="year"
        />
      </fieldset>

      {/* Featured Flag */}
      <fieldset>
        <legend>Features</legend>
        <FormComponentCheckbox
          label="Featured"
          name="isFeatured"
          checked={artist.isFeatured}
          onChange={handleChange}
        />
      </fieldset>

      {/* Description */}
      <fieldset>
        <legend>Description</legend>
        <FormComponentTextArea
          label="Description"
          name="description"
          value={artist.description}
          onChange={handleChange}
          required={true}
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
          label="Spotify"
          name="spotifyEmbedUrl"
          url={artist.spotifyEmbedUrl}
          onChange={handleChange}
          required={true}
        />
        <FormComponentEmbed
          label="Youtube"
          name="youtubeEmbedUrl"
          url={artist.youtubeEmbedUrl}
          onChange={handleChange}
          required={true}
        />
      </div>
    </fieldset>

      {/* Images */ }
  <fieldset>
    <legend>Images</legend>
    <FormComponentImages
      record={artist}
      setRecord={setArtist}
    />
  </fieldset>

  {/* Social Links */ }
  <FormComponentSocials
    record={artist}
    setRecord={setArtist}
  />

  {/* Tags */ }
  <fieldset>
    <legend>Tags</legend>
    <FormComponentList
      listName="tags"
      options={TAGS}
      record={artist}
      setRecord={setArtist}
    />
  </fieldset>

  {/* Types */ }
  <fieldset>
    <legend>Types</legend>
    <FormComponentList
      listName="types"
      options={ARTIST_TYPES}
      record={artist}
      setRecord={setArtist}
    />
  </fieldset>

  {/* Submit Button */ }
  <button type="submit">Save Changes</button>
    </form >
  );
};

export default FormArtist;
