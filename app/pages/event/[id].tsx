import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from 'next/head';
import axios from "axios";
import camelcaseKeys from "camelcase-keys";

// Config
import getConfig from "next/config";

// Types
import { Event } from "../../types/models/Event";
import { PageType } from "../../types/enums/PageType";

// Components
import Form from "../../components/Form/Form"

interface Props {
  currentToggle: string | null;
}

const EventPage: React.FC<Props>= ({ currentToggle }) => {
  const [event, setEvent] = useState<Event>();
  const { id } = useRouter().query;
  const api = getConfig().publicRuntimeConfig.SERVICE_ADMIN_API_URL

  useEffect(() => {
    if (!id) return;
    axios.get(`${api}/event/${id}`)
      .then(response => {
        setEvent(camelcaseKeys(response.data, { deep: true }));
      });
  }, [id]);

  return (
    <>
      <Head>
        <title>Bandwidth Admin | {event?.title}</title>
        <meta name="description" content="" />
      </Head>

      <Form
        type={PageType.Event}
        record={event}
        setRecord={setEvent}
        currentToggle={currentToggle}
      />
    </>
  );
};

export default EventPage;