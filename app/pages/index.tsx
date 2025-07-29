// React / Next
import React, {useState, useEffect} from "react"
import Head from 'next/head';

// External libraries
import axios from 'axios';
import camelcaseKeys from 'camelcase-keys';

// Components

// Config
import apiUrl from '../api.config';


const Home = () => {

  // State
  const [events, setEvents] = useState<uuid[]>([]);
  const [artists, setArtists] = useState<uuid[]>([]);
  const [venues, setVenues] = useState<uuid[]>([]);

  // Fetch IDs
  useEffect(() => {
    const fetch = async (type: string) => {
      try {
        const url = `${apiUrl}/${type}`
        const response = await axios.get(url);

        switch (type) {
          case 'event': setEvents(camelcaseKeys(response.data, { deep: true })); break;
          case 'artist': setArtists(camelcaseKeys(response.data, { deep: true })); break;
          case 'venue': setVenues(camelcaseKeys(response.data, { deep: true })); break;
          default: break;
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetch('event');
    fetch('artist');
    fetch('venue');

  }, []);


  return (
    <>
      <Head>
        <title>Bandwidth</title>
        <meta name="description" content="Welcome to my website" />
      </Head>

      <h1>Homepage</h1>
      <h2>Events</h2>
      {events}
      <h2>Artists</h2>
      {artists}
      <h2>Venues</h2>
      {venues}

    </>
  );
};

export default Home;
