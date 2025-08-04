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
const embedConfigMap: Record<EmbedName, { icon: string; url: string }> = {
  spotifyEmbedUrl: {
    icon: '/spotify.svg',
    url: 'https://open.spotify.com/',
  },
  youtubeEmbedUrl: {
    icon: '/youtube.svg',
    url: 'https://www.youtube.com/',
  },
  googleMapsEmbedUrl: {
    icon: '/google-maps.svg',
    url: 'https://www.google.com/maps',
  },
};

const FormComponentEmbed: React.FC<Props> = ({
  label,
  name,
  url = "",
  onChange,
  required = true
}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.inputWrapper}>
        <label htmlFor={name}>
          <a href={embedConfigMap[name].icon} target="_blank">
            <img src={embedConfigMap[name].url} alt={label} />
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
      <iframe src={url} loading="lazy" />
    </div>
  );
};

export default FormComponentEmbed;
