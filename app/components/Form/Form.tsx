import React from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { pascalcaseKeys } from "../../util/pascalcaseKeys";

// Styling
import styles from "./Form.module.css";

// Config
import apiUrl from "../../api.config";

// Types
import { PageType } from "../../types/enums/PageType";

// Components
import FormComponentHeader from "../FormComponent/FormComponentHeader/FormComponentHeader";
import FormArtist from "./FormArtist"
import FormVenue from "./FormVenue";
import FormEvent from "./FormEvent";
import JsonPreview from "../Preview/JsonPreview/JsonPreview";
import WebPagePreview from "../Preview/WebPagePreview/WebPagePreview";

interface Props {
  type: PageType;
  record: any;
  setRecord: React.Dispatch<React.SetStateAction<any>>;
  currentToggle: string | null;
}

const Form: React.FC<Props> = ({ type, record, setRecord, currentToggle }) => {
  if (!record) return;

  const recordId: uuid = record[`${type}Id`];
  const isExistingRecord: boolean = recordId != undefined;
  const url = `${apiUrl}/${type}${isExistingRecord ? `/${recordId}` : ''}`
  const urlMainWebsite = `http://localhost:8000/${type}`

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setRecord((prev: any) => prev ? { ...prev, [name]: value } : prev);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = pascalcaseKeys(record);
      const headers = { headers: { "Content-Type": "application/json" } };
      if (isExistingRecord) {
        await axios.put(url, data, headers);
        alert(`Successfully updated ${type}`);
      }
      else {
        await axios.post(url, data, headers);
        alert(`Successfully created ${type}`);
      }
      window.location.reload();
    } catch (error) {
      alert(`Error: ${error}`);
    }
  };

  const handleDelete = async () => {
    try {
      if (isExistingRecord) {
        if (!window.confirm(`Are you sure you want to delete this ${type}?`)) return;
        await axios.delete(url);
        alert(`Successfully deleted ${type}`);
        useRouter().push(`/${type}`);
      }
      else {
        if (!window.confirm(`Are you sure you want to cancel this ${type}?`)) return;
        useRouter().push(`/${type}`);
      }
    } catch (error) {
      alert(`Error: ${error}`);
    }
  };

  const handleReset = () => {
    if (!window.confirm("Are you sure you want to reset the form?")) return;
    window.location.reload();
  };

  return (
    <div className={styles.wrapper}>

      {/* Form */}
      <div className={styles.formWrapper}>
        <form>
          <FormComponentHeader
            type={type}
            record={record}
            onSubmit={handleSubmit}
            onDelete={handleDelete}
            onReset={handleReset}
          />

          {type === PageType.Artist &&
            <FormArtist
              artist={record}
              setArtist={setRecord}
              onChange={handleChange}
            />
          }

          {type === PageType.Event &&
            <FormEvent
              event={record}
              setEvent={setRecord}
              onChange={handleChange}
            />
          }

          {type === PageType.Venue &&
            <FormVenue
              venue={record}
              setVenue={setRecord}
              onChange={handleChange}
            />
          }
        </form>
      </div>

      {/* Preview (Current Toggle) */}
      <>
        <JsonPreview json={record} isVisible={currentToggle === "json"} />
        <WebPagePreview url={record.originalPostUrl} isVisible={currentToggle === "og-post"} />
        <WebPagePreview url={record.ticketSaleUrl} isVisible={currentToggle === "ticket-sale"} />
        {isExistingRecord && <WebPagePreview url={urlMainWebsite} isVisible={currentToggle === "website-main"} />}
      </>
    </div>
  )
};

export default Form;