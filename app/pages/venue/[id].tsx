import React, { useState, useEffect } from "react"
import { useRouter } from "next/router";
import axios from "axios"
import camelcaseKeys from "camelcase-keys";
import apiUrl from "../../api.config"
import { Venue } from "../../types/models/Venue"
import styles from "../../styles/page.module.css"

const VenueDetail = () => {
  const [venue, setVenue] = useState<Venue>({} as Venue)

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    axios.get(`${apiUrl}/venue/${id}`)
         .then(response => { setVenue(camelcaseKeys(response.data, { deep: true }))})
    }, [id]);

  return (
    <>
      <div className={styles.pageWrapper}>
        <pre>
          {JSON.stringify(venue, null, 2)}
        </pre>
      </div>
    </>
  );
};

export default VenueDetail;