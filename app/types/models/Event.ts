import { Social } from "./Social"
import { EventVenue } from "./EventVenue"
import { EventPerformance } from "./EventPerformance";
import { EventPrice } from "./EventPrice";

export type Event = {
    eventId: uuid;
    title: string;
    startDateTime: Date;
    description: string;
    originalPostUrl: url;
    ticketSaleUrl: url;
    isFeatured: boolean;
    imageUrls: url[];
    socials: Social[];
    types: string[];
    tags: string[];
    venue: EventVenue;
    performances: EventPerformance[];
    prices: EventPrice[];
}