export type EventVenue = {
    venueID: uuid;
    title: string;
    stageID?: uuid;
    stageTitle: string;
    imageUrl: url;
}