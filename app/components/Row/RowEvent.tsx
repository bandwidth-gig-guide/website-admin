import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import axios from 'axios';
import camelcaseKeys from "camelcase-keys";

// Config
import getConfig from "next/config";

// Types
import { Event } from '../../types/models/Event'
import { Social } from '../../types/models/Social';

// Components
import IconCheck from '../IconCheck/IconCheck';

interface Props {
  eventId: uuid
}

const RowEvent: React.FC<Props> = ({ eventId }) => {
  const [event, setEvent] = useState<Event>({} as Event);
  const [artistCount, setArtistCount] = useState<number>(0);
  const [imageCount, setImageCount] = useState<number>(0);
  const [priceCount, setPriceCount] = useState<number>(0);
  const [tagCount, setTagCount] = useState<number>(0);
  const [typeCount, setTypeCount] = useState<number>(0);
  const [descriptionWordCount, setDescriptionWordCount] = useState<number>(0);
  const [socials, setSocials] = useState<string[]>([]);
  const router = useRouter();
  const api = getConfig().publicRuntimeConfig.SERVICE_ADMIN_API_URL

  useEffect(() => {
    axios.get(`${api}/event/${eventId}`)
      .then(response => { setEvent(camelcaseKeys(response.data, { deep: true })) });
  }, [eventId]);

  useEffect(() => {
    setArtistCount(Array.isArray(event.performances) ? event.performances.length : 0);
    setImageCount(Array.isArray(event.images) ? event.images.length : 0);
    setPriceCount(Array.isArray(event.prices) ? event.prices.length : 0);
    setTagCount(Array.isArray(event.tags) ? event.tags.length : 0);
    setTypeCount(Array.isArray(event.types) ? event.types.length : 0);
    setDescriptionWordCount(
      typeof event.description === 'string'
        ? event.description.trim().split(/\s+/).length
        : 0
    );
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
    <tr onClick={handleRowClick}>
      <td>{event.eventId}</td>
      <td>{event.title}</td>
      <td>{event.startDateTime ? new Date(event.startDateTime).toLocaleString() : '-'}</td>
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