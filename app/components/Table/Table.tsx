import React from 'react'
import { PageType } from '../../types/enums/PageType';

import TableArtist from './TableArtist/TableArtist';
import TableEvent from './TableEvent/TableEvent';
import TableVenue from './TableVenue/TableVenue';

interface Props {
  ids: uuid[];
  pageType: PageType;
}

const Table: React.FC<Props> = ({ids, pageType}) => {
  switch (pageType) {
    case PageType.Artist: return <TableArtist ids={ids} />;
    case PageType.Event: return <TableEvent ids={ids} />;
    case PageType.Venue: return <TableVenue ids={ids} />;
    default: break;
  }

}

export default Table