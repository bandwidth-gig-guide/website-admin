import React, { useState, useEffect } from 'react'
import { Venue } from '../../../types/models/Venue'
import { Social } from '../../../types/models/Social';
import axios from 'axios';
import apiUrl from '../../../api.config'
import camelcaseKeys from "camelcase-keys";
import styles from './RowVenue.module.css'
import IconCheck from '../../IconCheck/IconCheck';
import { useRouter } from 'next/router';

interface Props {
  venueId: uuid
}

const RowVenue: React.FC<Props> = ({ venueId }) => {
  const [venue, setVenue] = useState<Venue>({} as Venue);
  const [socials, setSocials] = useState<string[]>([]);
  const [contacts, setContacts] = useState<string[]>([]);
  const [typeCount, setTypeCount] = useState<number>(0);
  const [stageCount, setStageCount] = useState<number>(0);
  const [tagCount, setTagCount] = useState<number>(0);
  const [upcomingEventCount, setUpcomingEventCount] = useState<number>(0);
  const [imageCount, setImageCount] = useState<number>(0);
  const [descriptionWordCount, setDescriptionWordCount] = useState<number>(0);
  const router = useRouter();

  useEffect(() => {
    axios.get(`${apiUrl}/venue/${venueId}`)
      .then(response => { setVenue(camelcaseKeys(response.data, { deep: true })) });
  }, [venueId]);

  useEffect(() => {
      setTypeCount(Array.isArray(venue.types) ? venue.types.length : 0);
      setStageCount(Array.isArray(venue.venueStages) ? venue.venueStages.length : 0);
      setTagCount(Array.isArray(venue.tags) ? venue.tags.length : 0);
      setUpcomingEventCount(Array.isArray(venue.upcomingEventIds) ? venue.upcomingEventIds.length : 0);
      setImageCount(Array.isArray(venue.imageUrls) ? venue.imageUrls.length : 0);
      setDescriptionWordCount(
        typeof venue.description === 'string'
          ? venue.description.trim().split(/\s+/).length
          : 0
      );
      setSocials(
        Array.isArray(venue.socials)
          ? venue.socials
              .map((social: Social) => social.socialPlatform)
              .filter(Boolean)
          : []
      );
      setContacts([
        venue.websiteUrl && 'Website',
        venue.phoneNumber && 'Phone',
        venue.googleMapsEmbedUrl && 'GoogleMaps',
        venue.openingHours && 'Hours',
      ].filter(Boolean) as string[]);
    }, [venue]);

  const handleRowClick = () => {
    router.push(`/venue/${venueId}`);
  };

  return (
    <tr className={styles.wrapper} onClick={handleRowClick}>
      <td>{venue.venueId}</td>
      <td>{venue.isFeatured ? <img src='./featured-red.svg' className='featuredIcon'/> : ''} {venue.title}</td>
      <td>{upcomingEventCount}</td>
      <td>{venue.stateCode}</td>
      <td>{venue.city}</td>
      <td>{venue.streetAddress}</td>
      <td>{venue.postCode}</td>
      <td>{stageCount}</td>
      <td>{descriptionWordCount}</td>
      <td>{imageCount}</td>
      <td>{tagCount}</td>
      <td>{typeCount}</td>
      <td><IconCheck venueKeys={contacts} /></td>
      <td><IconCheck socialKeys={socials} /></td>
    </tr>
  )
}

export default RowVenue