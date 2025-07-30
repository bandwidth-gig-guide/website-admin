import React, { useState, useEffect } from "react"
import { useRouter } from "next/router";
import axios from "axios"
import camelcaseKeys from "camelcase-keys";
import apiUrl from "../../api.config"
import { Event } from "../../types/models/Event"
import styles from "../../styles/page.module.css"

const EventDetail = () => {
  const [event, setEvent] = useState<Event>({} as Event)

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    axios.get(`${apiUrl}/event/${id}`)
         .then(response => { setEvent(camelcaseKeys(response.data, { deep: true }))})
    }, [id]);

  return (
    <>
      <div className={styles.pageWrapper}>
        <pre>
          {JSON.stringify(event, null, 2)}
        </pre>
      </div>
    </>
  );
};

export default EventDetail;