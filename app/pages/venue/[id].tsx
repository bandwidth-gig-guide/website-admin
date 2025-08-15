import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from 'next/head';
import axios from "axios";
import camelcaseKeys from "camelcase-keys";

// Config
import apiUrl from "../../api.config";

// Types
import { Venue } from "../../types/models/Venue";
import { PageType } from "../../types/enums/PageType";

// Components
import Form from "../../components/Form/Form"

interface Props {
  currentToggle: string | null;
}

const VenuePage: React.FC<Props> = ({ currentToggle }) => {
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
    <>
      <Head>
        <title>Bandwidth Admin | {venue?.title}</title>
        <meta name="description" content="" />
      </Head>
    <Form
      type={PageType.Venue}
      record={venue}
      setRecord={setVenue}
      currentToggle={currentToggle}
    />
    </>
  );
};

export default VenuePage;
