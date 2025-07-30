import React from 'react'
import styles from './IconCheck.module.css'

const embedIcons: { [key: string]: string } = {
  Spotify: "./spotify.svg",
  YouTube: "./youtube.svg"
};

const socialIcons: { [key: string]: string } = {
  Bandcamp: "./bandcamp.svg",
  Facebook: "./facebook.svg",
  Instagram: "./instagram.svg",
  SoundCloud: "./soundcloud.svg",
  TikTok: "./tiktok.svg",
  Twitter: "./twitter.svg",
  Website: "./website.svg",
};

const venueIcons: { [key: string]: string } = {
  Website: "./website.svg",
  Phone: "./mobile.svg",
  GoogleMaps: "./google-maps.svg",
  Hours: "./date.svg",
};

interface Props {
  embedKeys?: string[];
  socialKeys?: string[];
  venueKeys?: string[];
}

const IconCheck: React.FC<Props> = ({ embedKeys, socialKeys, venueKeys}) => {

  const iconSets = [
    { keys: embedKeys, icons: embedIcons },
    { keys: socialKeys, icons: socialIcons },
    { keys: venueKeys, icons: venueIcons }
  ];

  const activeSet = iconSets.find(set => set.keys);

  if (!activeSet) return null;

  const { keys, icons } = activeSet;

  return (
    <div className={styles.wrapper}>
      {Object.keys(icons).map((platform) => (
        <img
          key={platform}
          src={icons[platform]}
          alt={platform}
          className={keys!.includes(platform) ? '' : styles.disabled}
        />
      ))}
    </div>
  );
}

export default IconCheck