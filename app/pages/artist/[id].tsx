import React, { useState, useEffect } from "react";
import axios from "axios";
import camelcaseKeys from "camelcase-keys";
import FormArtist from "../../components/Form/FormArtist/FormArtist";
import apiUrl from "../../api.config";
import { Artist } from "../../types/models/Artist";
import JsonPreview from "../../components/JsonPreview/JsonPreview";

import { useRouter } from "next/router";

const ArtistPage = () => {
  const [artist, setArtist] = useState<Artist | null>(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!id) return;
    axios.get(`${apiUrl}/artist/${id}`)
      .then(response => {
        setArtist(camelcaseKeys(response.data, { deep: true }));
      });
  }, [id]);

  return (
    <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
      <FormArtist artist={artist} setArtist={setArtist} />
      <JsonPreview json={artist} />
    </div>
  );
};

export default ArtistPage;
