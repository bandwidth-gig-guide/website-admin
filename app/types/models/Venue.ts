import { Social } from "./Social";
import { OpeningHours } from "./OpeningHours";

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
    googleMapsEmbedUrl?: url;
    isFeatured: boolean;
    imageUrls: url[];
    socials: Social[];
    types: string[];
    tags: string[];
    openingHours?: OpeningHours;
    upcomingEventIds: url[];
}