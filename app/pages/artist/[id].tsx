import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from 'next/head';
import axios from "axios";
import camelcaseKeys from "camelcase-keys";

// Config
import getConfig from "next/config";

// Types
import { Artist } from "../../types/models/Artist";
import { PageType } from "../../types/enums/PageType";

// Components
import Form from "../../components/Form/Form"

interface Props {
  currentToggle: string | null;
}

const ArtistPage: React.FC<Props> = ({ currentToggle }) => {
  const [artist, setArtist] = useState<Artist>();
  const { id } = useRouter().query;
  const api = getConfig().publicRuntimeConfig.SERVICE_ADMIN_API_URL

  useEffect(() => {
    if (!id) return;
    axios.get(`${api}/artist/${id}`)
      .then(response => {
        setArtist(camelcaseKeys(response.data, { deep: true }));
      });
  }, [id]);

  return (
    <>
      <Head>
        <title>Bandwidth Admin | {artist?.title}</title>
        <meta name="description" content="" />
      </Head>

      <Form
        type={PageType.Artist}
        record={artist}
        setRecord={setArtist}
        currentToggle={currentToggle}
      />
    </>

  );
};

export default ArtistPage;