import React, { useState, useEffect } from "react"
import { useRouter } from "next/router";
import axios from "axios"
import camelcaseKeys from "camelcase-keys";
import apiUrl from "../../api.config"
import { Venue } from "../../types/models/Venue"
import styles from "../../styles/page.module.css"
import JsonPreview from "../../components/JsonPreview/JsonPreview";
import FormVenue from "../../components/Form/FormVenue/FormVenue";

const VenueDetail = () => {
  const [venue, setVenue] = useState<Venue | null>(null)
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    axios.get(`${apiUrl}/venue/${id}`)
      .then(response => { setVenue(camelcaseKeys(response.data, { deep: true })) })
  }, [id]);

  return (
    <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
      <FormVenue venue={venue} setVenue={setVenue} />
      {/* <JsonPreview json={venue} /> */}
    </div>
  );
};

export default VenueDetail;