import { Social } from "./Social";

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
    imageUrls: url[];
    socials: Social[];
    types: string[];
    tags: string[];
    upcomingEventIds: uuid[];
}