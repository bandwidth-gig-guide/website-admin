// React / Next
import React, {useState, useEffect} from "react"
import Head from 'next/head';
import { PageType } from "../../types/enums/PageType";


// Utils
import { fetchIds } from '../../util/fetchIds'


const Event = () => {
  const [events, setEvents] = useState<uuid[]>([]);

  useEffect(() => {
    fetchIds(PageType.Event, setEvents);
  }, []);


  return (
    <>
      <Head>
        <title>Bandwidth Admin | Events</title>
        <meta name="description" content="Welcome to my website" />
      </Head>

      <h1>Events</h1>
      {events}

    </>
  );
};

export default Event;
