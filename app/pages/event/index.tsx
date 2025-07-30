import React, {useState, useEffect} from "react"
import Head from 'next/head';
import { PageType } from "../../types/enums/PageType";
import Table from "../../components/Table/Table";
import { fetchIds } from '../../util/fetchIds'

const Events = () => {
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

      <Table ids={events} pageType={PageType.Event} />
    </>
  );
};

export default Events;
