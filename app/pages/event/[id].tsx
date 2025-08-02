import React, { useState, useEffect } from "react"
import { useRouter } from "next/router";
import axios from "axios"
import camelcaseKeys from "camelcase-keys";
import apiUrl from "../../api.config"
import { Event } from "../../types/models/Event"
import styles from "../../styles/page.module.css"
import WebPageEmbed from "../../components/WebpagePreview/WebpagePreivew";
import JsonPreview from "../../components/JsonPreview/JsonPreview";
import FormEvent from "../../components/Form/FormEvent/FormEvent"

const EventDetail = () => {
  const [event, setEvent] = useState<Event>({} as Event)

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    axios.get(`${apiUrl}/event/${id}`)
      .then(response => { setEvent(camelcaseKeys(response.data, { deep: true })) })
  }, [id]);

  return (
    <>
      <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
        <FormEvent event={event} setEvent={setEvent} />
        {/* <JsonPreview json={event} /> */}
      </div>
    </>
  );
};

export default EventDetail;