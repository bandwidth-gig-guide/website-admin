// React / Next
import React, {useState, useEffect} from "react"
import Head from 'next/head';

// Utils
import { fetchIds } from '../../util/fetchIds'


const Venue = () => {
  const [venues, setVenues] = useState<uuid[]>([]);

  useEffect(() => {
    fetchIds('venue', setVenues);
  }, []);


  return (
    <>
      <Head>
        <title>Bandwidth Admin | Venues</title>
        <meta name="description" content="Welcome to my website" />
      </Head>

      <h1>Venues</h1>
      {venues}

    </>
  );
};

export default Venue;
