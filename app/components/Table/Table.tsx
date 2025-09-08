import React, { useState } from 'react'
import { PageType } from '../../types/enums/PageType';

// Styles
import styles from "./Table.module.css"

import TableArtist from './TableArtist/TableArtist';
import TableEvent from './TableEvent/TableEvent';
import TableVenue from './TableVenue/TableVenue';

interface Props {
  ids: uuid[];
  pageType: PageType;
}

const PAGE_SIZE = 4;

const Table: React.FC<Props> = ({ ids, pageType }) => {
  const [page, setPage] = useState(0);

  const start = page * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  const paginatedIds = ids.slice(start, end);

  const totalPages = Math.ceil(ids.length / PAGE_SIZE);

  return (
    <div className={styles.wrapper}>
      {pageType === PageType.Artist && <TableArtist ids={paginatedIds} />}
      {pageType === PageType.Event && <TableEvent ids={paginatedIds} />}
      {pageType === PageType.Venue && <TableVenue ids={paginatedIds} />}

      <div className={styles.pagination}>
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 0}
        >
          Previous
        </button>
        <span>
          Page {page + 1} of {totalPages}
        </span>
        <button
          onClick={() => setPage(page + 1)}
          disabled={page + 1 >= totalPages}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default Table