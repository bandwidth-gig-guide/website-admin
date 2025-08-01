import React from 'react';
import styles from './WebpagePreview.module.css'

interface Props {
  url: string;
  title?: string;
}

const WebPageEmbed: React.FC<Props> = ({ url, title = 'Embedded Page' }) => {
  return (
    <div className={styles.wrapper}>
      <iframe
        src={url}
        title={title}
        sandbox="allow-scripts allow-same-origin"
      />
    </div>
  );
};

export default WebPageEmbed;
