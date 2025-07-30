import React, { useState, useEffect } from 'react'
import { Event } from '../../../types/models/Event'
import { Social } from '../../../types/models/Social';
import axios from 'axios';
import apiUrl from '../../../api.config'
import camelcaseKeys from "camelcase-keys";
import styles from './RowEvent.module.css'
import IconCheck from '../../IconCheck/IconCheck';
import { useRouter } from 'next/router';

interface Props {
  eventId: uuid
}

const RowEvent: React.FC<Props> = ({ eventId }) => {
  const [event, setEvent] = useState<Event>({} as Event);
  const [socials, setSocials] = useState<string[]>([]);
  const [typeCount, setTypeCount] = useState<number>(0);
  const [tagCount, setTagCount] = useState<number>(0);
  const [imageCount, setImageCount] = useState<number>(0);
  const [artistCount, setArtistCount] = useState<number>(0);
  const [priceCount, setPriceCount] = useState<number>(0);
  const [descriptionWordCount, setDescriptionWordCount] = useState<number>(0);
  const router = useRouter();

  useEffect(() => {
    axios.get(`${apiUrl}/event/${eventId}`)
      .then(response => { setEvent(camelcaseKeys(response.data, { deep: true })) });
  }, [eventId]);

  useEffect(() => {
    setTypeCount(Array.isArray(event.types) ? event.types.length : 0);
    setTagCount(Array.isArray(event.tags) ? event.tags.length : 0);
    setImageCount(Array.isArray(event.imageUrls) ? event.imageUrls.length : 0);
    setDescriptionWordCount(
      typeof event.description === 'string'
        ? event.description.trim().split(/\s+/).length
        : 0
    );
    setArtistCount(Array.isArray(event.performances) ? event.performances.length : 0);
    setPriceCount(Array.isArray(event.prices) ? event.prices.length : 0);
    setSocials(
      Array.isArray(event.socials)
        ? event.socials
            .map((social: Social) => social.socialPlatform)
            .filter(Boolean)
        : []
    );
  }, [event]);

  const handleRowClick = () => {
    router.push(`/event/${eventId}`);
  };

  return (
    <tr className={styles.wrapper} onClick={handleRowClick}>
      <td>{event.eventId}</td>
      <td>{event.title}</td>
      <td>{event.startDateTime}</td>
      <td>{event.venue?.title}</td>
      <td>{event.venue?.stageTitle}</td>
      <td>{event.performances && event.performances.length > 0 ? event.performances[0].title : ''}</td>
      <td>{artistCount}</td>
      <td>{priceCount}</td>
      <td>{descriptionWordCount}</td>
      <td>{imageCount}</td>
      <td>{tagCount}</td>
      <td>{typeCount}</td>
      <td><IconCheck socialKeys={socials} /></td>
    </tr>
  )
}

export default RowEvent