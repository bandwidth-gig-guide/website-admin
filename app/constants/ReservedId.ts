export const ReservedId = {
    SpecialGuest: {title: "Special Guest", id: '00000000-0000-0000-0000-000000000000'},
    DJSet: {title: "DJ Set", id: '00000000-0000-0000-0000-000000000001'},
} as const;

export type ReservedId = typeof ReservedId[keyof typeof ReservedId];

// Reminder to self: `title` is for the button on the admin site. The actual title shown on the 
// main website can be changed at `https://admin.bandwidthmelbourne.com/artist/{id}`