// React / Next
import React, {useState, useEffect} from "react"
import Head from 'next/head';

// Utils
import { fetchIds } from '../util/fetchIds'


const Home = () => {
  const [artists, setArtists] = useState<uuid[]>([]);
  const [events, setEvents] = useState<uuid[]>([]);
  const [venues, setVenues] = useState<uuid[]>([]);

  useEffect(() => {
    fetchIds('artist', setArtists);
    fetchIds('event', setEvents);
    fetchIds('venue', setVenues);
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
