import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import axios from 'axios';
import camelcaseKeys from "camelcase-keys";

// Config
import apiUrl from '../../api.config'

// Types
import { Venue } from '../../types/models/Venue'
import { Social } from '../../types/models/Social';

// Components
import IconCheck from '../IconCheck/IconCheck';

interface Props {
  venueId: uuid
}

const RowVenue: React.FC<Props> = ({ venueId }) => {
  const [venue, setVenue] = useState<Venue>({} as Venue);
  const [imageCount, setImageCount] = useState<number>(0);
  const [stageCount, setStageCount] = useState<number>(0);
  const [tagCount, setTagCount] = useState<number>(0);
  const [typeCount, setTypeCount] = useState<number>(0);
  const [upcomingEventCount, setUpcomingEventCount] = useState<number>(0);
  const [contacts, setContacts] = useState<string[]>([]);
  const [descriptionWordCount, setDescriptionWordCount] = useState<number>(0);
  const [socials, setSocials] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    axios.get(`${apiUrl}/venue/${venueId}`)
      .then(response => { setVenue(camelcaseKeys(response.data, { deep: true })) });
  }, [venueId]);

  useEffect(() => {
      setImageCount(Array.isArray(venue.imageUrls) ? venue.imageUrls.length : 0);
      setStageCount(Array.isArray(venue.venueStages) ? venue.venueStages.length : 0);
      setTagCount(Array.isArray(venue.tags) ? venue.tags.length : 0);
      setTypeCount(Array.isArray(venue.types) ? venue.types.length : 0);
      setUpcomingEventCount(Array.isArray(venue.upcomingEventIds) ? venue.upcomingEventIds.length : 0);
      setContacts([
        venue.websiteUrl && 'Website',
        venue.phoneNumber && 'Phone',
        venue.googleMapsEmbedUrl && 'GoogleMaps',
        venue.openingHours && 'Hours',
      ].filter(Boolean) as string[]);
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
    }, [venue]);

  const handleRowClick = () => {
    router.push(`/venue/${venueId}`);
  };

  return (
    <tr onClick={handleRowClick}>
      <td>{venue.venueId}</td>
      <td>{venue.title}</td>
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