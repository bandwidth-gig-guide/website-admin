import React, {useState, useEffect} from "react"
import Head from 'next/head';
import { PageType } from "../../types/enums/PageType";
import Table from "../../components/Table/Table";
import { fetchIds } from '../../util/fetchIds'

const Artists = () => {
  const [artists, setArtists] = useState<uuid[]>([]);

  useEffect(() => {
    fetchIds(PageType.Artist, setArtists);
  }, []);

  return (
    <>
      <Head>
        <title>Bandwidth Admin | Artists</title>
        <meta name="description" content="Welcome to my website" />
      </Head>

      <Table ids={artists} pageType={PageType.Artist} />
    </>
  );
};

export default Artists;
