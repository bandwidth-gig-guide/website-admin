import React, { useState } from "react";
import Head from "next/head";

// Types
import { Venue, defaultVenue } from "../../types/models/Venue";
import { PageType } from "../../types/enums/PageType";

// Components
import Form from "../../components/Form/Form";

interface Props {
  currentToggle: string | null;
}

const NewVenuePage: React.FC<Props> = ({ currentToggle }) => {
  const [venue, setVenue] = useState<Venue>(defaultVenue);

  return (
    <>
      <Head>
        <title>Bandwidth Admin | New Venue</title>
        <meta name="description" content="Create a new Venue" />
      </Head>

      <Form
        type={PageType.Venue}
        record={venue}
        setRecord={setVenue}
        currentToggle={currentToggle}
      />
    </>
  );
};

export default NewVenuePage;
