// ============================================================
// PALAK & NALIN — WEDDING INVITATION
// Single source of truth for wedding content.
// ============================================================
window.INVITE_CONFIG = {
  bride: "Palak",
  groom: "Nalin",
  brideFull: "Palak Jindal",
  groomFull: "Nalin Chandra Goel",

  city: "Lucknow",
  dateISO: "2026-12-03",
  dateLabel: "03 DECEMBER 2026",

  // The Shaadi card says 8:00 PM; the main invitation says 7:30 PM onwards.
  // Confirm the final guest-facing timing before launch.
  weddingDateTime: "2026-12-03T20:00:00+05:30",

  venue: "The Hilton Lucknow",
  venueAddress: "Vibhuti Khand, Lucknow",
  venueDescription: "An elegant setting in Lucknow for an evening of celebration, togetherness and new beginnings.",
  mapEmbedUrl: "https://www.google.com/maps?q=Hilton+Lucknow,+Vibhuti+Khand,+Lucknow&output=embed",
  mapLink: "https://www.google.com/maps/search/?api=1&query=Hilton+Lucknow",

  // Set this once the final domain is registered, e.g. https://palaknalin.live
  siteUrl: "https://palaknalin.live",

  family: {
    brideGrandparents: [
      "Mr. Bimal Jindal",
      "(Late) Mrs. Murti Jindal"
    ],
    brideParents: [
      "Mrs. Nisha Jindal",
      "Mr. Vinod Jindal"
    ],
    groomParents: [
      "Dr. Namita Chandra",
      "Dr. Shaleen Chandra"
    ]
  },

  heroEyebrow: "Together with their families",
  heroInvite: "Invite You To Celebrate Their Wedding",
  heroLine: "Awaiting to Celebrate With You.",
  storyMessage: "Two hearts, one beautiful journey, and a lifetime of memories waiting to be made.",

  openingText: "Click to Open Invite",
  logoText: "NALĀKS",
  tagline: "Well-behaved, mostly.",
  logoMark: "NP",

  rsvpTitle: "Will You Join Us?",
  rsvpNote: "Kindly confirm your attendance — we would be honoured to celebrate with you.",
  rsvpSuccess: "Thank you for celebrating this special moment with us!",

  assets: {
    background: "assets/couple-formal.webp",
    music: "",
    shareCard: "assets/share-card.png"
  },

  colors: {
    ivory: "#faf6ee",
    cream: "#f4ecdc",
    warmWhite: "#fffdf8",
    blush: "#e3a7ad",
    blushDeep: "#c97f87",
    gold: "#c2a15c",
    goldDeep: "#a5823f",
    peach: "#f0c49b",
    sage: "#a3b18a",
    leaf: "#7d9270",
    ink: "#43403a",
    inkSoft: "#6f6a61"
  },

  developmentMode: false,

  sections: {
    hero: true,
    story: true,
    timeline: true,
    events: true,
    countdown: true,
    venue: true,
    rsvp: true,
    footer: true
  },

  // Source-verified event schedule from the supplied invitation.
  // Descriptions are presentation copy, not schedule facts.
  events: [
    {
      day: "WEDNESDAY",
      date: "02 December 2026",
      dateTime: "2026-12-02T19:30:00+05:30",
      name: "SANGEET",
      time: "7:30 in the evening",
      venue: "",
      theme: "sangeet",
      description: "An evening of music, celebration and togetherness as the festivities begin.",
      image: "assets/sangeet.jpg"
    },
    {
      day: "THURSDAY",
      date: "03 December 2026",
      dateTime: "2026-12-03T11:00:00+05:30",
      name: "HALDI",
      time: "11:00 in the morning",
      venue: "",
      theme: "haldi",
      description: "A joyful morning of colour, blessings and the traditions that make the celebration special.",
      image: "assets/haldi.jpg"
    },
    {
      day: "THURSDAY",
      date: "03 December 2026",
      dateTime: "2026-12-03T20:00:00+05:30",
      name: "SHAADI",
      time: "8:00 in the evening",
      venue: "The Hilton Lucknow",
      theme: "shaadi",
      description: "The evening's main celebration — a beautiful union of two families and two hearts.",
      image: "assets/shaadi.jpg"
    }
  ],

  gallery: [
    "assets/couple-formal.webp",
    "assets/couple-floral.webp",
    "assets/couple-mirror.webp",
    "assets/couple-pottery.webp",
    "assets/couple-selfie.webp"
  ]
};
