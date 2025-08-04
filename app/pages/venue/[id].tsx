import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import camelcaseKeys from "camelcase-keys";

// Config
import apiUrl from "../../api.config";

// Types
import { Venue } from "../../types/models/Venue";
import { PageType } from "../../types/enums/PageType";

// Components
import Form from "../../components/Form/Form"

const VenuePage = () => {
  const [venue, setVenue] = useState<Venue>();
  const { id } = useRouter().query;

  useEffect(() => {
    if (!id) return;
    axios.get(`${apiUrl}/venue/${id}`)
      .then(response => {
        setVenue(camelcaseKeys(response.data, { deep: true }));
      });
  }, [id]);

  return (
    <Form
      type={PageType.Venue}
      record={venue}
      setRecord={setVenue}
    />
  );
};

export default VenuePage;
