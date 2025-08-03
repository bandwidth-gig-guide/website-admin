import React from 'react'
import styles from './TableArtist.module.css'
import RowArtist from '../../Row/RowArtist';

interface Props {
  ids: uuid[];
}

const TableArtist: React.FC<Props> = ({ids}) => {
  return (
    <div className={styles.wrapper}>
      <table>
        <thead>
          <tr>
            <th>ArtistID</th>
            <th>Title</th>
            <th>Upcoming<br />Event&nbsp;Count</th>
            <th>State</th>
            <th>Country</th>
            <th>City</th>
            <th>Year<br />Founded</th>
            <th>Description<br />Word&nbsp;Count</th>
            <th>Image<br />Count</th>
            <th>Tag<br />Count</th>
            <th>Type<br />Count</th>
            <th>Socials</th>
            <th>Embeds</th>
          </tr>
        </thead>
        <tbody>
          {ids.map((id, index) => (
            <RowArtist artistId={id} key={index} />
          ))}
        </tbody>
      </table>
      
    </div>
  )
}

export default TableArtist