import { Social } from "./Social"
import { EventVenue } from "./EventVenue"
import { EventPerformance } from "./EventPerformance";
import { EventPrice } from "./EventPrice";
import { Image } from "./Image"

export type Event = {
    eventId: uuid;
    title: string;
    startDateTime: string;
    description: string;
    originalPostUrl: url;
    ticketSaleUrl: url;
    isFeatured: boolean;
    images: Image[];
    socials: Social[];
    types: string[];
    tags: string[];
    venue: EventVenue;
    performances: EventPerformance[];
    prices: EventPrice[];
}