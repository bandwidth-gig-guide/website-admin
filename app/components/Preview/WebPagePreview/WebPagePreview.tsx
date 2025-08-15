import React from 'react';
import styles from './WebPagePreview.module.css'

interface Props {
  url: string;
  title?: string;
  isVisible: boolean;
}

const WebPagePreview: React.FC<Props> = ({ url, title = 'Embedded Page', isVisible }) => {
  return (
    <div className={styles.wrapper} style={{ display: isVisible ? "block" : "none"}}>
      <iframe src={url} title={title} />
    </div>
  );
};

export default WebPagePreview;
