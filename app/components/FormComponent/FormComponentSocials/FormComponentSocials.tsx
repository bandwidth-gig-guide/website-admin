import React, { useEffect, useState } from "react";
import styles from "./FormComponentSocials.module.css";
import { Artist } from "../../../types/models/Artist";
import { Event } from "../../../types/models/Event";
import { Venue } from "../../../types/models/Venue";

const SOCIALS = [
  { platform: "Website", icon: "/website.svg" },
  { platform: "Instagram", icon: "/instagram.svg" },
  { platform: "Facebook", icon: "/facebook.svg" },
  { platform: "Twitter", icon: "/twitter.svg" },
  { platform: "TikTok", icon: "/tiktok.svg" },
  { platform: "SoundCloud", icon: "/soundcloud.svg" },
  { platform: "Bandcamp", icon: "/bandcamp.svg" },
];

type RecordWithSocials = Artist | Event | Venue;

interface Social {
  socialPlatform: string;
  handle: string;
  url: string;
}

interface Props<T extends RecordWithSocials> {
  record: T;
  setRecord: React.Dispatch<React.SetStateAction<T>>;
}

const FormComponentSocials = <T extends RecordWithSocials>({
  record,
  setRecord
}: Props<T>) => {

  const [draftSocials, setDraftSocials] = useState<Social[]>(
    SOCIALS.map(({ platform }) => ({
      socialPlatform: platform,
      handle: "",
      url: "",
    }))
  );

  useEffect(() => {
    if (record.socials === undefined) return;

    const platformMap: { [key: string]: Social } = {};
    record.socials.forEach(social => {
      platformMap[social.socialPlatform] = social;
    });

    const updatedDraft = SOCIALS.map(({ platform }) => {
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

    const valid = updated.filter(s => s.handle.trim() && s.url.trim());
    setRecord(prev => ({
      ...prev,
      socials: valid,
    }));
  };

  return (
    <div className={styles.wrapper}>
      {draftSocials.map((social, index) => {
        const { icon } = SOCIALS[index];
        return (
          <div key={index} className={styles.socialRow}>
            <div
              className={`
                ${styles.iconWrapper} 
                ${!(social.handle && social.url) ? styles.incomplete : ""}
              `}
            >
              {icon && (
                <img
                  src={icon}
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
        );
      })}
    </div>
  );
};

export default FormComponentSocials;
