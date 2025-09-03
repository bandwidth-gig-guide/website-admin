import React, { useState } from "react";
import Head from "next/head";

// Types
import { Event } from "../../types/models/Event";
import { PageType } from "../../types/enums/PageType";

// Components
import Form from "../../components/Form/Form";

interface Props {
  currentToggle: string | null;
}

const NewEventPage: React.FC<Props> = ({ currentToggle }) => {
  const [Event, setEvent] = useState<Event>({} as Event);

  return (
    <>
      <Head>
        <title>Bandwidth Admin | New Event</title>
        <meta name="description" content="Create a new Event" />
      </Head>

      <Form
        type={PageType.Event}
        record={Event}
        setRecord={setEvent}
        currentToggle={currentToggle}
      />
    </>
  );
};

export default NewEventPage;
