import React, { useState } from 'react'
import { PageType } from '../../types/enums/PageType';
import { useRouter } from 'next/router';

import styles from "./Table.module.css"

import TableArtist from './TableArtist/TableArtist';
import TableEvent from './TableEvent/TableEvent';
import TableVenue from './TableVenue/TableVenue';

interface Props {
  ids: uuid[];
  pageType: PageType;
}

const PAGE_SIZE = 48;

const Table: React.FC<Props> = ({ ids, pageType }) => {
  const router = useRouter();

  const [page, setPage] = useState(0);
  const start = page * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  const paginatedIds = ids.slice(start, end);
  const totalPages = Math.ceil(ids.length / PAGE_SIZE);

  return (
    <div className={styles.wrapper}>

      <div className={styles.topRow}>

        <h2>MANAGE {pageType.toUpperCase()}S</h2>

        <div className={styles.actions}>
          <button onClick={() => router.push(`/${pageType}/new`)}>
            Create New {pageType.charAt(0).toUpperCase() + pageType.slice(1)}
          </button>
        </div>

        <div className={styles.pagination}>
          <button onClick={() => setPage(page - 1)} disabled={page === 0}>Previous</button>
          <span>Page {page + 1} of {totalPages}</span>
          <button onClick={() => setPage(page + 1)} disabled={page + 1 >= totalPages}>Next</button>
        </div>

      </div>

      <>
        {pageType === PageType.Artist && <TableArtist ids={paginatedIds} />}
        {pageType === PageType.Event && <TableEvent ids={paginatedIds} />}
        {pageType === PageType.Venue && <TableVenue ids={paginatedIds} />}
      </>
      
    </div>
  )
}

export default Table