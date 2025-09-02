import { Social } from "./Social";
import { Image } from "./Image"

export type Artist = {
    artistId: uuid;
    title: string;
    country: string;
    city: string;
    stateCode: statecode;
    yearFounded: number;
    description: string;
    spotifyEmbedUrl?: url;
    youtubeEmbedUrl?: url;
    isFeatured: boolean;
    images: Image[];
    socials: Social[];
    types: string[];
    tags: string[];
    upcomingEventIds: uuid[];
}