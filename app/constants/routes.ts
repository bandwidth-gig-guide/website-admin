export const ROUTES = [
  { label: "Events", type: 'event', href: "/event", toggles: ["website-main", "json", "og-post", "ticket-sale"] },
  { label: "Artists", type: 'artist', href: "/artist", toggles: ["website-main", "json"] },
  { label: "Venues", type: 'venue', href: "/venue", toggles: ["website-main", "json"] },
  { label: "Images", type: 'image', href: "/images", toggles: ["json"] },
  { label: "Featured", type: 'feature', href: "/features", toggles: ["json"] },
];

export const ROUTES_NEW_PAGES = [
  { label: "New Event", type: 'event', href: "/event/new", toggles: ["website-main", "json", "og-post", "ticket-sale"] },
  { label: "New Artist", type: 'artist', href: "/artist/new", toggles: ["website-main", "json"] },
  { label: "New Venue", type: 'venue', href: "/venue/new", toggles: ["website-main", "json"] },
]