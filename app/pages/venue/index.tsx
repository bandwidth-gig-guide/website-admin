import React, {useState, useEffect} from "react"
import Head from 'next/head';
import { PageType } from "../../types/enums/PageType";
import Table from "../../components/Table/Table";
import { fetchIds } from '../../util/fetchIds'

const Venues = () => {
  const [venues, setVenues] = useState<uuid[]>([]);

  useEffect(() => {
    fetchIds(PageType.Venue, setVenues);
  }, []);

  return (
    <>
      <Head>
        <title>Bandwidth Admin | Venues</title>
        <meta name="description" content="Welcome to my website" />
      </Head>

      <Table ids={venues} pageType={PageType.Venue} />
    </>
  );
};

export default Venues;
