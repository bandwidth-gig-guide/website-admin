import React from "react";
import FormArtist from "./FormArtist/FormArtist"
import FormVenue from "./FormVenue/FormVenue";
import FormEvent from "./FormEvent/FormEvent";
import { PageType } from "../../types/enums/PageType";

interface Props {
  type: PageType;
  record: any;
  setRecord: React.Dispatch<React.SetStateAction<any>>;
}

const Form: React.FC<Props> = ({ type, record, setRecord }) => {
  if (!record) return <div>Loading...</div>;

  switch (type) {
    case "artist":
      return <FormArtist artist={record} setArtist={setRecord} />;
    case "venue":
      return <p>Venue Form</p>
      // return <FormVenue venue={record} setVenue={setRecord} />;
    case "event":
      return <p>Event Form</p>
      // return <FormEvent event={record} setEvent={setRecord} />;
    default:
      return <div>Unsupported form type</div>;
  }
};

export default Form;
