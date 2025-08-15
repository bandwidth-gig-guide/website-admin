import React from 'react'
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

const Table: React.FC<Props> = ({ids, pageType}) => {
  return (
    <div className={styles.wrapper}>
      {pageType === PageType.Artist && <TableArtist ids={ids} />}
      {pageType === PageType.Event && <TableEvent ids={ids} />}
      {pageType === PageType.Venue && <TableVenue ids={ids} />}
    </div>
  )
}

export default Table