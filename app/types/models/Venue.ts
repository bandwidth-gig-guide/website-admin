import { Social } from "./Social";
import { OpeningHours } from "./OpeningHours";
import { VenueStage } from "./VenueStage";
import { Image } from "./Image"
import { StateCode } from "../enums/StateCode";

export type Venue = {
    venueId: uuid;
    title: string;
    city: string;
    stateCode: statecode;
    streetAddress: string;
    postCode: number;
    description: string;
    websiteUrl: url;
    phoneNumber: string;
    googleMapsEmbedUrl: url;
    isFeatured: boolean;
    images: Image[];
    socials: Social[];
    types: string[];
    tags: string[];
    openingHours: OpeningHours;
    upcomingEventIds: url[];
    venueStages: VenueStage[];
}

export const defaultVenue: Venue = {
  venueId: "" as unknown as uuid,
  title: "",
  city: "",
  stateCode: StateCode.VIC, 
  streetAddress: "",
  postCode: 3000,
  description: "",
  websiteUrl: "" as unknown as url,
  phoneNumber: "",
  googleMapsEmbedUrl: "" as unknown as url,
  isFeatured: false,
  images: [],
  socials: [],
  types: [],
  tags: [],
  openingHours: {
    monOpen: "09:00:00",
    monClose: "17:00:00",
    tueOpen: "09:00:00",
    tueClose: "17:00:00",
    wedOpen: "09:00:00",
    wedClose: "17:00:00",
    thurOpen: "09:00:00",
    thurClose: "17:00:00",
    friOpen: "09:00:00",
    friClose: "17:00:00",
    satOpen: "09:00:00",
    satClose: "17:00:00",
    sunOpen: "09:00:00",
    sunClose: "17:00:00",
  },
  upcomingEventIds: [],
  venueStages: [{
        stageId: "" as unknown as uuid,
        title: "Main Stage",
        description: "",
        capacity: 100
  }]
};