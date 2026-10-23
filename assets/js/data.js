/* PAIGE 18 Production — placeholder content.
   Replace titles, years, loglines and media paths with real data.
   `poster` / `preview` can point to real files (e.g. "assets/img/the-quiet-hours.jpg");
   when empty, a styled IMG placeholder is rendered instead. */

window.P18 = {
  /* AI-generated placeholder imagery (OpenArt), stored in assets/img and assets/video. Swap for real stills / key art. */
  media: {
    hero: "assets/img/hero.jpg",
    heroVideo: "assets/video/hero-reel.mp4",
    about1: "assets/img/about1.jpg",
    about2: "assets/img/about2.jpg",
    reel: "assets/img/reel.jpg"
  },

  news: [
    { date: "2026-10-02", tag: "Festival", title: "The Quiet Hours selected for its first international festival run", work: "the-quiet-hours" },
    { date: "2026-09-14", tag: "Casting", title: "Open call: actors for the Low Tide 2026 remount", work: "low-tide" },
    { date: "2026-08-21", tag: "Release", title: "Ash & Harbour season one now streaming", work: "ash-and-harbour" }
  ],

  works: [
    {
      id: "the-quiet-hours",
      poster: "assets/img/poster-the-quiet-hours.jpg",
      title: "The Quiet Hours",
      type: "film",
      year: 2025,
      runtime: "94 min",
      logline: "A night-shift ferry operator finds a stranger's diary that predicts the next seven days of her life.",
      director: "Mara Ellison",
      status: "Festival run",
      preview: "",
      tone: [208, 14],
      featured: true
    },
    {
      id: "ash-and-harbour",
      poster: "assets/img/poster-ash-and-harbour.jpg",
      title: "Ash & Harbour",
      type: "series",
      year: 2025,
      runtime: "6 × 22 min",
      logline: "Three estranged siblings return to a fishing town on the Sunshine Coast to sell the house that raised them.",
      director: "Jun Park",
      status: "Streaming",
      preview: "",
      tone: [200, 10],
      featured: true
    },
    {
      id: "low-tide",
      poster: "assets/img/poster-low-tide.jpg",
      title: "Low Tide",
      type: "theatre",
      year: 2024,
      runtime: "105 min",
      logline: "A two-hander staged in near darkness: a lighthouse keeper and the radio voice that answers back.",
      director: "Theo Vance",
      status: "Remount 2026",
      preview: "",
      tone: [0, 18],
      featured: true
    },
    {
      id: "glass-city",
      poster: "assets/img/poster-glass-city.jpg",
      title: "Glass City",
      type: "series",
      year: 2024,
      runtime: "8 × 12 min",
      logline: "A web series about four strangers who share a single Vancouver apartment on rotating 6-hour leases.",
      director: "Mara Ellison",
      status: "Released",
      preview: "",
      tone: [215, 8]
    },
    {
      id: "red-room",
      poster: "assets/img/poster-red-room.jpg",
      title: "Red Room",
      type: "theatre",
      year: 2023,
      runtime: "80 min",
      logline: "An immersive one-act set inside a closing cinema, where the audience becomes the last screening.",
      director: "Theo Vance",
      status: "Closed",
      preview: "",
      tone: [4, 30],
      featured: true
    },
    {
      id: "north-of-nowhere",
      poster: "assets/img/poster-north-of-nowhere.jpg",
      title: "North of Nowhere",
      type: "film",
      year: 2023,
      runtime: "17 min",
      logline: "A short about a truck-stop cook and the one customer who comes back every winter.",
      director: "Jun Park",
      status: "Festival run",
      preview: "",
      tone: [190, 12]
    },
    {
      id: "paper-saints",
      poster: "assets/img/poster-paper-saints.jpg",
      title: "Paper Saints",
      type: "film",
      year: 2022,
      runtime: "88 min",
      logline: "Two forgers in 1970s Gastown are hired to fake a miracle — and accidentally perform one.",
      director: "Mara Ellison",
      status: "Released",
      preview: "",
      tone: [30, 12]
    },
    {
      id: "understudy",
      poster: "assets/img/poster-understudy.jpg",
      title: "Understudy",
      type: "theatre",
      year: 2022,
      runtime: "95 min",
      logline: "On closing night, the understudy goes on — and refuses to say the lines as written.",
      director: "Theo Vance",
      status: "Closed",
      preview: "",
      tone: [0, 6]
    }
  ],

  people: [
    { name: "Mara Ellison", photo: "assets/img/people-mara.jpg", role: "Founder · Director", note: "Writer-director working between feature film and long-form series." },
    { name: "Theo Vance", photo: "assets/img/people-theo.jpg", role: "Artistic Director · Theatre", note: "Leads the stage program and our devised, ensemble-built work." },
    { name: "Jun Park", photo: "assets/img/people-jun.jpg", role: "Head Writer", note: "Showrunner for our web and streaming series slate." },
    { name: "Lena Moreau", photo: "assets/img/people-lena.jpg", role: "Executive Producer", note: "Oversees financing, co-productions and distribution partnerships." }
  ]
};
