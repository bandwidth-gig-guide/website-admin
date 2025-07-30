import React from 'react'
import { pascalcaseKeys } from '../../util/pascalcaseKeys';
import styles from './JsonPreview.module.css'

interface Props {
  json: any;
}

const JsonPreview: React.FC<Props> = ({ json }) => {
  return (
    <div className={styles.wrapper}>
      <pre>{JSON.stringify(pascalcaseKeys(json), null, 2)}</pre>
    </div>
  )
}

export default JsonPreview