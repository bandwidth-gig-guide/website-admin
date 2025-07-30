'use client';

import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import camelcaseKeys from "camelcase-keys";
import { pascalcaseKeys } from "../../util/pascalCaseKeys";
import apiUrl from "../../api.config";
import { Artist } from "../../types/models/Artist";
import styles from "../../styles/page.module.css";

const ArtistDetail = () => {
  const [artist, setArtist] = useState<Artist | null>(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!id) return;
    axios.get(`${apiUrl}/artist/${id}`)
      .then(response => {
        setArtist(camelcaseKeys(response.data, { deep: true }));
      });
  }, [id]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target;
    setArtist(prev => prev ? {
      ...prev,
      [name]: type === 'checkbox' ? checked : value
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
      await axios.put(`${apiUrl}/artist/${id}`, pascalcaseKeys(artist), {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      alert("Artist updated!");
    } catch (error) {
      console.error("Error updating artist:", error);
  };

}

  if (!artist) return <div>Loading...</div>;
  








  return (
    <div className={styles.pageWrapper}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label>Title:
          <input type="text" name="title" value={artist.title} onChange={handleChange} />
        </label>

        <label>Country:
          <input type="text" name="country" value={artist.country} onChange={handleChange} />
        </label>

        <label>City:
          <input type="text" name="city" value={artist.city} onChange={handleChange} />
        </label>

        <label>State Code:
          <input type="text" name="stateCode" value={artist.stateCode} onChange={handleChange} />
        </label>

        <label>Year Founded:
          <input type="number" name="yearFounded" value={artist.yearFounded} onChange={handleChange} />
        </label>

        <label>Description:
          <textarea name="description" value={artist.description} onChange={handleChange} />
        </label>

        <label>Spotify Embed URL:
          <input type="text" name="spotifyEmbedUrl" value={artist.spotifyEmbedUrl} onChange={handleChange} />
        </label>

        <label>YouTube Embed URL:
          <input type="text" name="youtubeEmbedUrl" value={artist.youtubeEmbedUrl} onChange={handleChange} />
        </label>

        <label>Is Featured:
          <input type="checkbox" name="isFeatured" checked={artist.isFeatured} onChange={handleChange} />
        </label>

        <hr />

        <h3>Image URLs</h3>
        {artist.imageUrls.map((url, idx) => (
          <div key={idx}>
            <input
              type="text"
              value={url}
              onChange={e => handleArrayChange("imageUrls", idx, e.target.value)}
            />
            <button type="button" onClick={() => handleArrayRemove("imageUrls", idx)}>Remove</button>
          </div>
        ))}
        <button type="button" onClick={() => handleArrayAdd("imageUrls")}>Add Image</button>

        <hr />

        <h3>Types</h3>
        {artist.types.map((type, idx) => (
          <div key={idx}>
            <input
              type="text"
              value={type}
              onChange={e => handleArrayChange("types", idx, e.target.value)}
            />
            <button type="button" onClick={() => handleArrayRemove("types", idx)}>Remove</button>
          </div>
        ))}
        <button type="button" onClick={() => handleArrayAdd("types")}>Add Type</button>

        <hr />

        <h3>Tags</h3>
        {artist.tags.map((tag, idx) => (
          <div key={idx}>
            <input
              type="text"
              value={tag}
              onChange={e => handleArrayChange("tags", idx, e.target.value)}
            />
            <button type="button" onClick={() => handleArrayRemove("tags", idx)}>Remove</button>
          </div>
        ))}
        <button type="button" onClick={() => handleArrayAdd("tags")}>Add Tag</button>

        <hr />

        <h3>Socials</h3>
        {artist.socials.map((social, idx) => (
          <div key={idx} style={{ marginBottom: '8px' }}>
            <input
              type="text"
              placeholder="Platform"
              value={social.socialPlatform}
              onChange={e => handleSocialChange(idx, "socialPlatform", e.target.value)}
            />
            <input
              type="text"
              placeholder="Handle"
              value={social.handle}
              onChange={e => handleSocialChange(idx, "handle", e.target.value)}
            />
            <input
              type="text"
              placeholder="URL"
              value={social.url}
              onChange={e => handleSocialChange(idx, "url", e.target.value)}
            />
            <button type="button" onClick={() => handleRemoveSocial(idx)}>Remove</button>
          </div>
        ))}
        <button type="button" onClick={handleAddSocial}>Add Social</button>

        <hr />

        <button type="submit">Save Changes</button>
      </form>

      <pre>{JSON.stringify(pascalcaseKeys(artist), null, 2)}</pre>

    </div>
  );
};

export default ArtistDetail;
