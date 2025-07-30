import React, { useState, useEffect } from "react"
import { useRouter } from "next/router";
import axios from "axios"
import camelcaseKeys from "camelcase-keys";
import apiUrl from "../../api.config"
import { Artist } from "../../types/models/Artist"
import styles from "../../styles/page.module.css"

const ArtistDetail = () => {
  const [artist, setArtist] = useState<Artist>({} as Artist)

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    axios.get(`${apiUrl}/artist/${id}`)
         .then(response => { setArtist(camelcaseKeys(response.data, { deep: true }))})
    }, [id]);

  return (
    <>
      <div className={styles.pageWrapper}>
        <pre>
          {JSON.stringify(artist, null, 2)}
        </pre>
      </div>
    </>
  );
};

export default ArtistDetail;