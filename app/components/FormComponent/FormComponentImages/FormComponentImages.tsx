import React, { useState, useEffect } from "react";
import styles from "./FormComponentImages.module.css";
import { Artist } from "../../../types/models/Artist";
import { Event } from "../../../types/models/Event";
import { Venue } from "../../../types/models/Venue";
import { Image as ImageObject } from "../../../types/models/Image";

import { IMAGE_MIN_WIDTH, IMAGE_MIN_HEIGHT } from "../../../constants/minMaxValues";

type RecordWithImages = Artist | Event | Venue;

type ImageMetaData = {
  url: string;
  fileType: string;
  fileSizeDisplay: string;
  fileSizeBytes: number;
  width: number;
  height: number;
};

interface Props<T extends RecordWithImages> {
  record: T;
  setRecord: React.Dispatch<React.SetStateAction<T>>;
}

const FormComponentImages = <T extends RecordWithImages>({ 
  record, 
  setRecord 
}: Props<T>) => {
  const images: ImageObject[] = (record.images || []).slice().sort((a, b) => a.displayOrder - b.displayOrder);
  const [metaDataList, setMetaDataList] = useState<ImageMetaData[]>([]);
  const [fullscreenIndex, setFullscreenIndex] = useState<number | null>(null);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  useEffect(() => {
    setMetaDataList(prev => {
      return images.map((image, index) => {
        if (prev[index]?.url !== image.url) {
          return {
            url: image.url,
            fileType: "",
            fileSizeDisplay: "",
            fileSizeBytes: 0,
            width: 0,
            height: 0,
          };
        }
        return prev[index];
      });
    });
  }, [images, record.images]);

  const updateImages = (newImages: ImageObject[]) => {
    const orderedImages = newImages.map((img, idx) => ({
      ...img,
      displayOrder: idx + 1,
    }));
    setRecord(prev => ({
      ...prev,
      images: orderedImages,
    }));
  };

  const handleInputChange = (index: number, value: string) => {
    const stripped = value.split("?")[0];
    const updated = [...images];
    updated[index] = {
      ...updated[index],
      url: stripped,
    };
    updateImages(updated);
  };

  const handleAdd = () => {
    updateImages([
      ...images,
      { url: "", displayOrder: images.length }
    ]);
  };

  const handleRemove = (index: number) => {
    const updated = [...images];
    updated.splice(index, 1);
    updateImages(updated);
  };

  const handleReorder = (fromIndex: number, toIndex: number) => {
    if (
      fromIndex < 0 ||
      toIndex < 0 ||
      fromIndex >= images.length ||
      toIndex >= images.length ||
      fromIndex === toIndex
    ) return;

    const updatedImages = [...images];
    const [movedImage] = updatedImages.splice(fromIndex, 1);
    updatedImages.splice(toIndex, 0, movedImage);

    setMetaDataList(prev => {
      const updatedMeta = [...prev];
      const [movedMeta] = updatedMeta.splice(fromIndex, 1);
      updatedMeta.splice(toIndex, 0, movedMeta);
      return updatedMeta;
    });

    updateImages(updatedImages);
  };

  const handleImageLoad = (index: number, e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    const width = img.naturalWidth;
    const height = img.naturalHeight;

    fetch(img.src)
      .then(res => res.blob())
      .then(blob => {
        const fileSizeDisplay = blob.size < 1024 * 1024
          ? `${(blob.size / 1024).toFixed(1)} KB`
          : `${(blob.size / (1024 * 1024)).toFixed(2)} MB`;

        setMetaDataList(prev => {
          const updated = [...prev];
          updated[index] = {
            url: img.src,
            fileType: blob.type || "Unknown",
            fileSizeDisplay,
            fileSizeBytes: blob.size,
            width,
            height,
          };
          return updated;
        });
      })
      .catch(() => {
        setMetaDataList(prev => {
          const updated = [...prev];
          updated[index] = {
            url: img.src,
            fileType: "Unknown",
            fileSizeDisplay: "Unknown",
            fileSizeBytes: 0,
            width,
            height,
          };
          return updated;
        });
      });
  };

  return (
    <div className={styles.wrapper}>
      {images.map((image, index) => {
        const meta = metaDataList[index] || {
          url: image.url,
          fileType: "",
          fileSizeDisplay: "",
          fileSizeBytes: 0,
          width: 0,
          height: 0,
        };
        return (
          <div
            key={image.imageId ?? index}
            className={`${styles.cardWrapper} ${draggedIndex === index ? styles.dragging : ""}`}
            draggable
            onDragStart={() => setDraggedIndex(index)}
            onDragOver={e => e.preventDefault()}
            onDrop={() => {
              if (draggedIndex !== null) {
                handleReorder(draggedIndex, index);
                setDraggedIndex(null);
              }
            }}
          >
            <div className={styles.imgWrapper}>
              {image && image.url && (
                <img
                  src={image.url}
                  alt=""
                  onLoad={e => handleImageLoad(index, e)}
                  className={styles.thumbnail}
                  onClick={() => setFullscreenIndex(index)}
                />
              )}
            </div>
            <div className={styles.textWrapper}>
              <div className={styles.topRow}>
                <input
                  id={`image-${index}`}
                  type="text"
                  value={image.url}
                  onChange={e => handleInputChange(index, e.target.value)}
                />
                <button 
                  type="button" 
                  onClick={() => handleRemove(index)} className={styles.removeButton}
                >
                  <img src="/circle-cross.svg" alt="" />
                </button>
              </div>
              <div className={styles.metaText}>
                {meta.width > 0 && (
                  <>
                    <span className={meta.width < IMAGE_MIN_WIDTH ? styles.metaWarning : ""}>
                      {meta.width}
                    </span>
                    <span>&nbsp;x&nbsp;</span>
                    <span className={meta.height < IMAGE_MIN_HEIGHT ? styles.metaWarning : ""}>
                      {meta.height}
                    </span>
                  </>
                )}
                {meta.fileSizeDisplay && (
                  <span className={meta.fileSizeBytes > 500 * 1024 ? styles.metaWarning : ""}>
                    &nbsp;({meta.fileSizeDisplay})
                  </span>
                )}
                {meta.fileType && (
                  <span>
                    &nbsp;| {meta.fileType}
                  </span>
                )}
              </div>
            </div>
          </div>
        );
      })}

      <button type="button" onClick={handleAdd} className="addButton">
        Add Image
      </button>

      {fullscreenIndex !== null && (
        <div className={styles.fullscreenOverlay} onClick={() => setFullscreenIndex(null)}>
          <img src={images[fullscreenIndex].url} alt="" className={styles.fullscreenImage} />
        </div>
      )}

    </div>
  );
};

export default FormComponentImages;