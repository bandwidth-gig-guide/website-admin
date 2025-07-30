import React from 'react'
import styles from './TableVenue.module.css'
import RowVenue from '../../Row/RowVenue/RowVenue';

interface Props {
  ids: uuid[];
}

const TableVenue: React.FC<Props> = ({ids}) => {
  return (
    <div className={styles.wrapper}>
      <table>
        <thead>
          <tr>
            <th>VenueID</th>
            <th>Title</th>
            <th>Upcoming<br />Event&nbsp;Count</th>
            <th>State</th>
            <th>City</th>
            <th>Street<br />Address</th>
            <th>Post<br />Code</th>
            <th>Stage<br />Count</th>
            <th>Description<br />Word&nbsp;Count</th>
            <th>Image<br />Count</th>
            <th>Tag<br />Count</th>
            <th>Type<br />Count</th>
            <th>Contact<br />Info</th>
            <th>Socials</th>
          </tr>
        </thead>
        <tbody>
          {ids.map((id, index) => (
            <RowVenue venueId={id} key={index} />
          ))}
        </tbody>
      </table>
      
    </div>
  )
}

export default TableVenue