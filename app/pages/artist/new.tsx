import React, { useState } from "react";
import Head from "next/head";

// Types
import { Artist } from "../../types/models/Artist";
import { PageType } from "../../types/enums/PageType";

// Components
import Form from "../../components/Form/Form";

interface Props {
  currentToggle: string | null;
}

const NewArtistPage: React.FC<Props> = ({ currentToggle }) => {
  const [artist, setArtist] = useState<Artist>({} as Artist);

  return (
    <>
      <Head>
        <title>Bandwidth Admin | New Artist</title>
        <meta name="description" content="Create a new artist" />
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

export default NewArtistPage;
