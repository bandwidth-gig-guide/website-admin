import React, { useState, useEffect } from "react"
import { useRouter } from "next/router";
import axios from "axios"
import camelcaseKeys from "camelcase-keys";
import apiUrl from "../../api.config"
import { Event } from "../../types/models/Event"
import styles from "../../styles/page.module.css"
import WebPageEmbed from "../../components/WebpagePreview/WebpagePreivew";
import JsonPreview from "../../components/JsonPreview/JsonPreview";

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
        <JsonPreview json={event} />
        <WebPageEmbed url='https://thetotehotel.com/' />
        <WebPageEmbed url='https://thetotehotel.oztix.com.au/outlet/event/219ae37e-9956-401a-b430-c2a03f7828f3?utm_source=TheToteHotel&utm_medium=Website' />
      </div>
    </>
  );
};

export default EventDetail;