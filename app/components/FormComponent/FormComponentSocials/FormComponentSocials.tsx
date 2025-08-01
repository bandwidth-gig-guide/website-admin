import React, { useEffect, useState } from "react";
import styles from "./FormComponentSocials.module.css";
import { Artist } from "../../../types/models/Artist";
import { Event } from "../../../types/models/Event";
import { Venue } from "../../../types/models/Venue";

type RecordWithSocials = Artist | Event | Venue;

interface Social {
  socialPlatform: string;
  handle: string;
  url: string;
}

const SOCIAL_PLATFORMS = [
  "Website",
  "Instagram",
  "Facebook",
  "Twitter",
  "TikTok",
  "SoundCloud",
  "Bandcamp",
];

const socialIcons: { [key: string]: string } = {
  Bandcamp: "/bandcamp.svg",
  Facebook: "/facebook.svg",
  Instagram: "/instagram.svg",
  SoundCloud: "/soundcloud.svg",
  TikTok: "/tiktok.svg",
  Twitter: "/twitter.svg",
  Website: "/website.svg",
};

interface Props {
  record: RecordWithSocials;
  setRecord: React.Dispatch<React.SetStateAction<RecordWithSocials>>;
}

const FormComponentSocials = ({ record, setRecord }: Props) => {

  // Get local copy of socials.
  const [draftSocials, setDraftSocials] = useState<Social[]>(
    SOCIAL_PLATFORMS.map(platform => ({
      socialPlatform: platform,
      handle: "",
      url: "",
    }))
  );

  // 
  useEffect(() => {
    const platformMap: { [key: string]: Social } = {};
    record.socials.forEach(social => {
      platformMap[social.socialPlatform] = social;
    });

    const updatedDraft = SOCIAL_PLATFORMS.map(platform => {
      return (
        platformMap[platform] || {
          socialPlatform: platform,
          handle: "",
          url: "",
        }
      );
    });

    setDraftSocials(updatedDraft);
  }, []);

  const handleChange = (index: number, field: keyof Social, value: string) => {
    const updated = [...draftSocials];
    updated[index] = {
      ...updated[index],
      [field]: value,
    };
    setDraftSocials(updated);

    // Filter out incomplete entries
    const valid = updated.filter(s => s.handle.trim() && s.url.trim());
    setRecord(prev => ({
      ...prev,
      socials: valid,
    }));
  };

  return (
    <div className={styles.wrapper}>
      {draftSocials.map((social, index) => (
        <div key={index} className={styles.socialRow}>
          <div
            className={`
              ${styles.iconWrapper} 
              ${!(social.handle && social.url) ? styles.incomplete : ""}
            `}
          >
            {socialIcons[social.socialPlatform] && (
              <img
                src={socialIcons[social.socialPlatform]}
                alt=""
              />
            )}
            <span>{social.socialPlatform}</span>
          </div>
          <input
            type="text"
            placeholder="@handle"
            value={social.handle}
            onChange={e => handleChange(index, "handle", e.target.value)}
            className={styles.input}
          />
          <input
            type="text"
            placeholder="https://"
            value={social.url}
            onChange={e => handleChange(index, "url", e.target.value)}
            className={styles.input}
          />
        </div>
      ))}
    </div>
  );
};

export default FormComponentSocials;
