import React from "react";
import styles from './FormComponentEmbed.module.css'

type EmbedName = 'spotifyEmbedUrl' | 'youtubeEmbedUrl' | 'googleMapsEmbedUrl';

interface Props {
  label: string;
  name: EmbedName;
  url?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

const nameToIconMap: Record<EmbedName, string> = {
  spotifyEmbedUrl: '/spotify.svg',
  youtubeEmbedUrl: '/youtube.svg',
  googleMapsEmbedUrl: '/google-maps.svg'
}

const nameToUrlMap: Record<EmbedName, string> = {
  spotifyEmbedUrl: 'https://open.spotify.com/',
  youtubeEmbedUrl: 'https://www.youtube.com/',
  googleMapsEmbedUrl: 'https://www.google.com/maps'
}

const FormComponentEmbed: React.FC<Props> = ({ label, name, url, onChange, required }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.inputWrapper}>
        <label htmlFor={name}>
          <a href={nameToUrlMap[name]} target="_blank">
            <img src={nameToIconMap[name]} alt={label} />
          </a>
        </label>
        <input
          id={name}
          name={name}
          value={url}
          onChange={onChange}
          required={required}
          placeholder={label}
        />
      </div>
      <iframe
        src={url}
        loading="lazy"
      />
    </div>
  );
};

export default FormComponentEmbed;
