import React from 'react'
import styles from './TableEvent.module.css'
import RowEvent from '../../Row/RowEvent'

interface Props {
  ids: uuid[];
}

const TableEvent: React.FC<Props> = ({ids}) => {
  return (
    <div className={styles.wrapper}>
      <table>
        <thead>
          <tr>
            <th>EventID</th>
            <th>Event&nbsp;Title</th>
            <th>Date&nbsp;/&nbsp;Time</th>
            <th>Venue</th>
            <th>Stage</th>
            <th>Headliner</th>
            <th>Artist<br />Count</th>
            <th>Prices<br />Count</th>
            <th>Description<br />Word&nbsp;Count</th>
            <th>Image<br/ >Count</th>
            <th>Tag<br/ >Count</th>
            <th>Type<br/ >Count</th>
            <th>Socials</th>
          </tr>
        </thead>
        <tbody>
          {ids.map((id, index) => (
            <RowEvent eventId={id} key={index} />
          ))}
        </tbody>
      </table>
      
    </div>
  )
}

export default TableEvent