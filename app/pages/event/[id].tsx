import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import camelcaseKeys from "camelcase-keys";

// Config
import apiUrl from "../../api.config";

// Types
import { Event } from "../../types/models/Event";
import { PageType } from "../../types/enums/PageType";

// Components
import Form from "../../components/Form/Form"


const EventPage = () => {
  const [event, setEvent] = useState<Event>();
  const { id } = useRouter().query;

  useEffect(() => {
    if (!id) return;
    axios.get(`${apiUrl}/event/${id}`)
      .then(response => {
        setEvent(camelcaseKeys(response.data, { deep: true }));
      });
  }, [id]);

  return (
    <Form
      type={PageType.Event}
      record={event}
      setRecord={setEvent}
    />
  );
};

export default EventPage;