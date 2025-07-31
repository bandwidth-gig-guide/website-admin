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

interface FormArtistProps {
  artist: Artist | null;
  setArtist: React.Dispatch<React.SetStateAction<Artist | null>>;
}

const FormArtist: React.FC<FormArtistProps> = ({ artist, setArtist }) => {
  if (!artist) return <div>Loading artist data...</div>;

  // === General Handlers ===
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target;
    setArtist(prev => prev ? {
      ...prev,
      [name]: type === "checkbox" ? checked : value
    } : prev);
  };

  // === Social Handlers ===
  const handleSocialChange = (index: number, field: keyof typeof artist.socials[0], value: string) => {
    const updated = [...artist.socials];
    updated[index] = { ...updated[index], [field]: value };
    setArtist({ ...artist, socials: updated });
  };

  const handleAddSocial = () => {
    setArtist({ ...artist, socials: [...artist.socials, { socialPlatform: "", handle: "", url: "" }] });
  };

  const handleRemoveSocial = (index: number) => {
    const updated = artist.socials.filter((_, i) => i !== index);
    setArtist({ ...artist, socials: updated });
  };

  // === Submit Handler ===
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

      {/* Images */}
      <fieldset>
        <legend>Images</legend>
        <FormComponentImages
          record={artist}
          setRecord={setArtist}
        />
      </fieldset>

      {/* Social Links */}
      <FormComponentSocials
        socials={artist.socials}
        onAdd={handleAddSocial}
        onRemove={handleRemoveSocial}
        onChange={handleSocialChange}
      />

      {/* Submit Button */}
      <button type="submit">Save Changes</button>
    </form>
  );
};

export default FormArtist;
