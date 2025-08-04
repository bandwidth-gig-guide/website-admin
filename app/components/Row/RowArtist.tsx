import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import axios from 'axios';
import camelcaseKeys from "camelcase-keys";

// Config
import apiUrl from '../../api.config'

// Types
import { Artist } from '../../types/models/Artist'
import { Social } from '../../types/models/Social';

// Components
import IconCheck from '../IconCheck/IconCheck';

interface Props {
  artistId: uuid
}

const RowArtist: React.FC<Props> = ({ artistId }) => {
  const [artist, setArtist] = useState<Artist>({} as Artist);
  const [imageCount, setImageCount] = useState<number>(0);
  const [tagCount, setTagCount] = useState<number>(0);
  const [typeCount, setTypeCount] = useState<number>(0);
  const [upcomingEventCount, setUpcomingEventCount] = useState<number>(0);
  const [descriptionWordCount, setDescriptionWordCount] = useState<number>(0);
  const [socials, setSocials] = useState<string[]>([]);
  const [embeds, setEmbeds] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    axios.get(`${apiUrl}/artist/${artistId}`)
      .then(response => { setArtist(camelcaseKeys(response.data, { deep: true })) });
  }, [artistId]);

  useEffect(() => {
    setImageCount(Array.isArray(artist.imageUrls) ? artist.imageUrls.length : 0);
    setTagCount(Array.isArray(artist.tags) ? artist.tags.length : 0);
    setTypeCount(Array.isArray(artist.types) ? artist.types.length : 0);
    setUpcomingEventCount(Array.isArray(artist.upcomingEventIds) ? artist.upcomingEventIds.length : 0);
    setDescriptionWordCount(
      typeof artist.description === 'string'
        ? artist.description.trim().split(/\s+/).length
        : 0
    );
    setSocials(
      Array.isArray(artist.socials)
        ? artist.socials
            .map((social: Social) => social.socialPlatform)
            .filter(Boolean)
        : []
    );
    setEmbeds([
      artist.spotifyEmbedUrl && 'Spotify',
      artist.youtubeEmbedUrl && 'YouTube',
    ].filter(Boolean) as string[]);
  }, [artist]);

  const handleRowClick = () => {
    router.push(`/artist/${artistId}`);
  };

  return (
    <tr onClick={handleRowClick}>
      <td>{artist.artistId}</td>
      <td>{artist.title}</td>
      <td>{upcomingEventCount}</td>
      <td>{artist.stateCode}</td>
      <td>{artist.country}</td>
      <td>{artist.city}</td>
      <td>{artist.yearFounded}</td>
      <td>{descriptionWordCount}</td>
      <td>{imageCount}</td>
      <td>{tagCount}</td>
      <td>{typeCount}</td>
      <td><IconCheck socialKeys={socials} /></td>
      <td><IconCheck embedKeys={embeds} /></td>
    </tr>
  )
}

export default RowArtist