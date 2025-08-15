import React from 'react'
import { pascalcaseKeys } from '../../../util/pascalcaseKeys';
import styles from './JsonPreview.module.css'

interface Props {
  json: any;
  isVisible: boolean;
}

const JsonPreview: React.FC<Props> = ({ json, isVisible }) => {
  return (
    <div className={styles.wrapper} style={{ display: isVisible ? "block" : "none"}}>
      <div className={styles.innerWrapper}>
        <pre>{JSON.stringify(pascalcaseKeys(json), null, 2)}</pre>
      </div>
    </div>
  )
}

export default JsonPreview