import React, { ChangeEvent, FormEvent } from "react";
import { Artist } from "../../../types/models/Artist";
import { pascalcaseKeys } from "../../../util/pascalCaseKeys";
import axios from "axios";
import apiUrl from "../../../api.config";

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

  const handleArrayChange = (key: keyof Artist, index: number, value: string) => {
    if (!artist) return;
    const updated = [...(artist[key] as string[])];
    updated[index] = value;
    setArtist({ ...artist, [key]: updated });
  };

  const handleArrayAdd = (key: keyof Artist) => {
    if (!artist) return;
    const updated = [...(artist[key] as string[]), ""];
    setArtist({ ...artist, [key]: updated });
  };

  const handleArrayRemove = (key: keyof Artist, index: number) => {
    if (!artist) return;
    const updated = [...(artist[key] as string[])];
    updated.splice(index, 1);
    setArtist({ ...artist, [key]: updated });
  };

  const handleSocialChange = (index: number, field: string, value: string) => {
    if (!artist) return;
    const updated = [...artist.socials];
    updated[index] = { ...updated[index], [field]: value };
    setArtist({ ...artist, socials: updated });
  };

  const handleAddSocial = () => {
    if (!artist) return;
    setArtist({
      ...artist,
      socials: [...artist.socials, { socialPlatform: "", handle: "", url: "" }]
    });
  };

  const handleRemoveSocial = (index: number) => {
    if (!artist) return;
    const updated = artist.socials.filter((_, i) => i !== index);
    setArtist({ ...artist, socials: updated });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!artist) return;
    try {
      if (artist.artistId) {
        // Existing artist - update (PUT)
        await axios.put(`${apiUrl}/artist/${artist.artistId}`, pascalcaseKeys(artist), {
          headers: { "Content-Type": "application/json" }
        });
        alert("Artist updated!");
      } else {
        // New artist - create (POST)
        await axios.post(`${apiUrl}/artist`, pascalcaseKeys(artist), {
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
  {/* Basic Info Section */}
  <fieldset>
    <legend>Basic Information</legend>

    <label htmlFor="title">Title:</label>
    <input
      id="title"
      type="text"
      name="title"
      value={artist.title}
      onChange={handleChange}
      required
    />
  </fieldset>

  {/* Featured Flag Section */}
  <fieldset>
    <legend>Features</legend>

    <input
      id="isFeatured"
      type="checkbox"
      name="isFeatured"
      checked={artist.isFeatured}
      onChange={handleChange}
    />
    <label htmlFor="isFeatured">Is Featured</label>
  </fieldset>

  {/* Image URLs Section */}
  <fieldset>
    <legend>Image URLs</legend>

    {artist.imageUrls.map((url, idx) => {
      const inputId = `imageUrl-${idx}`;
      return (
        <div key={idx}>
          <label htmlFor={inputId}>{`Image URL #${idx + 1}:`}</label>
          <input
            id={inputId}
            type="text"
            value={url}
            onChange={e => handleArrayChange("imageUrls", idx, e.target.value)}
            placeholder={`Image URL #${idx + 1}`}
          />
          <button type="button" onClick={() => handleArrayRemove("imageUrls", idx)}>
            Remove
          </button>
        </div>
      );
    })}

    <button type="button" onClick={() => handleArrayAdd("imageUrls")}>
      Add Image
    </button>
  </fieldset>

  {/* Socials Section */}
  <fieldset>
    <legend>Social Links</legend>

    {artist.socials.map((social, idx) => {
      const platformId = `socialPlatform-${idx}`;
      const handleId = `socialHandle-${idx}`;
      const urlId = `socialUrl-${idx}`;
      return (
        <div key={idx}>
          <label htmlFor={platformId}>Platform:</label>
          <input
            id={platformId}
            type="text"
            placeholder="Platform"
            value={social.socialPlatform}
            onChange={e => handleSocialChange(idx, "socialPlatform", e.target.value)}
          />

          <label htmlFor={handleId}>Handle:</label>
          <input
            id={handleId}
            type="text"
            placeholder="Handle"
            value={social.handle}
            onChange={e => handleSocialChange(idx, "handle", e.target.value)}
          />

          <label htmlFor={urlId}>URL:</label>
          <input
            id={urlId}
            type="text"
            placeholder="URL"
            value={social.url}
            onChange={e => handleSocialChange(idx, "url", e.target.value)}
          />

          <button type="button" onClick={() => handleRemoveSocial(idx)}>
            Remove
          </button>
        </div>
      );
    })}

    <button type="button" onClick={handleAddSocial}>
      Add Social
    </button>
  </fieldset>

  {/* Submit Button */}
  <button type="submit">
    Save Changes
  </button>
</form>

  );
};

export default FormArtist;
