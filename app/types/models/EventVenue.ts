export type EventVenue = {
    venueId: uuid;
    title: string;
    stageId?: uuid;
    stageTitle: string;
    imageUrl: url;
}