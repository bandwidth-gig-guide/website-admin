export type EventBrief = {
    eventId: uuid;
    title: string;
    startDateTime: Date;
    venueTitle: string;
    isFeatured: boolean;
    imageUrl?: url;
    artistTitles: string[];
    minPrice: number;
}