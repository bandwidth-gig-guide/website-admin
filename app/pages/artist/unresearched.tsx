import React, { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from 'next/router';
import { ArtistUnresearched } from "../../types/models/ArtistUnresearched";
import getConfig from "next/config";
import axios from 'axios';
import camelcaseKeys from "camelcase-keys";
import styles from '../../components/Table/Table.module.css'

const PAGE_SIZE = 48;


const UnresearchedArtistPage = () => {
  const [artists, setArtists] = useState<ArtistUnresearched[]>([]);
  const [page, setPage] = useState(0);
  const router = useRouter();
  const api = getConfig().publicRuntimeConfig.SERVICE_ADMIN_API_URL
  const url = `${api}/artist/id-and-title/unresearched`
  const start = page * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  const paginatedArtists = artists.slice(start, end);
  const totalPages = Math.ceil(artists.length / PAGE_SIZE);


  useEffect(() => {
    const fetchData = async () => {
      try {
        axios.get(url)
          .then(response => { setArtists(camelcaseKeys(response.data, { deep: true })) })
          
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);


  const handleRowClick = (artistId: uuid) => {
    router.push(`/artist/${artistId}`);
  };


  const formatDateTime = (datetime: string) => {
    return (
      new Date(datetime).toLocaleDateString('en-AU', {
        year: 'numeric',
        month: 'short',
        day: '2-digit'
      })
    )
  }


  const getDaysUntil = (datetime: string) => {
    return (
      Math.ceil((
        new Date(datetime).getTime() -
        new Date().getTime()) /
        (1000 * 60 * 60 * 24)
      )
    )
  }


  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.topRow}>

          <h2>UNRESEARCHED ARTISTS</h2>

          <div className={styles.pagination}>
            <button onClick={() => setPage(page - 1)} disabled={page === 0}>Previous</button>
            <span>Page {page + 1} of {totalPages}</span>
            <button onClick={() => setPage(page + 1)} disabled={page + 1 >= totalPages}>Next</button>
          </div>

        </div>
        <table>
          <thead>
            <tr>
              <th>ArtistID</th>
              <th>Title</th>
              <th>Next Event Date</th>
              <th>Days Until Next Event</th>
              <th>Upcoming Event Count</th>
            </tr>
          </thead>
          <tbody>
            {artists ? paginatedArtists.map((artist, index) => (
              <tr key={index} onClick={() => handleRowClick(artist.artistId)}>
                <td>{artist.artistId}</td>
                <td>{artist.title}</td>
                <td>{formatDateTime(artist.nextEventDateTime)}</td>
                <td>{getDaysUntil(artist.nextEventDateTime)}</td>
                <td>{artist.upcomingEventCount}</td>
              </tr>
            )) : (
              <tr>
                <td colSpan={5}>No artists found!</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Head>
        <title>Bandwidth Admin | Unresearched Artist</title>
        <meta name="description" content="Artists that need to be researched" />
      </Head>
    </>
  );
};

export default UnresearchedArtistPage;
