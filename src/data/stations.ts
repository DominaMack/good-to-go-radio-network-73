export interface Station {
  id: string;
  slug: string;
  name: string;
  hostName?: string;
  genre?: string;
  tagline: string;
  description: string;
  streamUrl?: string;
  tier: "standard" | "featured" | "premium";
  featured: boolean;
  approved: boolean;
  homepageRank?: number;
  status: "draft" | "active" | "paused";
  billingStatus: "paid" | "past_due" | "cancelled";
  socialLinks?: {
    website?: string;
    facebook?: string;
    instagram?: string;
    youtube?: string;
    tiktok?: string;
    vimeo?: string;
    odysee?: string;
  };
  gradient: string;
  initials: string;
  coverImage: string;
<<<<<<< ours
<<<<<<< ours
<<<<<<< ours
  coverPosition?: string;
=======
>>>>>>> theirs
=======
>>>>>>> theirs
=======
>>>>>>> theirs
}

export const FEATURED_HOMEPAGE_LIMIT = 10;

export const stations: Station[] = [
  {
    id: "station-good-to-go-radio",
    slug: "good-to-go-radio",
    name: "Good To Go Radio",
    hostName: "Gregory Buckles",
    genre: "Talk & Music",
    tagline: "The Flagship",
    description: "Host Gregory Buckles leads the flagship of the network with talk, music, activism, gospel, blues, and real community voices. Where community meets rhythm — and change becomes sound.",
    streamUrl: "https://c38.radioboss.fm/stream/310",
    tier: "premium",
    featured: true,
    approved: true,
    homepageRank: 1,
    status: "active",
    billingStatus: "paid",
    gradient: "from-amber-500 via-yellow-500 to-amber-700",
    initials: "GTG",
    coverImage: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=1200&q=80",
<<<<<<< ours
<<<<<<< ours
<<<<<<< ours
    coverPosition: "center",
=======
>>>>>>> theirs
=======
>>>>>>> theirs
=======
>>>>>>> theirs
  },
  {
    id: "station-good-trouble-podcast",
    slug: "good-trouble-podcast",
    name: "Good Trouble Podcast",
    hostName: "Gregory Buckles with Timeka Garrett",
    genre: "Podcast",
    tagline: "Bold Conversations",
    description: "Gregory Buckles with Timeka Garrett explore activism, justice, leadership, and the journeys of entrepreneurs who stepped out on faith. Inspired by Congressman John Lewis and grounded in authenticity.",
    streamUrl: "https://us1.streamingpulse.com:2199/start/gregory",
    tier: "premium",
    featured: true,
    approved: true,
    homepageRank: 2,
    status: "active",
    billingStatus: "paid",
    gradient: "from-yellow-600 via-amber-600 to-orange-700",
    initials: "GT",
    coverImage: "https://images.unsplash.com/photo-1589903308904-1010c2294adc?auto=format&fit=crop&w=1200&q=80",
<<<<<<< ours
<<<<<<< ours
<<<<<<< ours
    coverPosition: "center",
=======
>>>>>>> theirs
=======
>>>>>>> theirs
=======
>>>>>>> theirs
  },
  {
    id: "station-wesleyan-forever-radio",
    slug: "wesleyan-forever-radio",
    name: "Wesleyan Forever Radio",
    hostName: "Kenneth Rouche",
    genre: "Gospel Choir Radio 24/7",
    tagline: "Faith & Heritage",
    description: "Kenneth Rouche brings faithful, musical, and powerfully spiritual gospel choir radio 24/7. A dedicated home for worship, choir favorites, and uplifting praise from wesleyanforever.com.",
    streamUrl: "https://s2.radio.co/seed639db7/listen",
    tier: "featured",
    featured: true,
    approved: true,
    homepageRank: 3,
    status: "active",
    billingStatus: "paid",
    socialLinks: {
      website: "https://wesleyanforever.com",
    },
    gradient: "from-amber-400 via-yellow-600 to-yellow-800",
    initials: "WF",
    coverImage: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?auto=format&fit=crop&w=1200&q=80",
<<<<<<< ours
<<<<<<< ours
<<<<<<< ours
    coverPosition: "center",
=======
>>>>>>> theirs
=======
>>>>>>> theirs
=======
>>>>>>> theirs
  },
  {
    id: "station-the-golden-boy-blues-radio",
    slug: "the-golden-boy-blues-radio",
    name: "The Golden Boy Blues Radio",
    hostName: "Leonard \"The Golden Boy\" McMorris",
    genre: "Blues 24/7",
    tagline: "Pure Blues",
    description: "Hosted by Leonard \"The Golden Boy\" McMorris, this station delivers signature blues style and fire from the heart of the blues scene 24/7. Follow at facebook.com/bernard.goldenboy.",
    streamUrl: "https://streamer.radio.co/sc7b42122c/listen",
    tier: "featured",
    featured: true,
    approved: true,
    homepageRank: 4,
    status: "active",
    billingStatus: "paid",
    socialLinks: {
      facebook: "https://facebook.com/bernard.goldenboy",
    },
    gradient: "from-yellow-500 via-amber-700 to-stone-800",
    initials: "GB",
<<<<<<< ours
<<<<<<< ours
<<<<<<< ours
    coverImage: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1200&q=80",
    coverPosition: "center",
=======
    coverImage: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=1200&q=80",
>>>>>>> theirs
=======
    coverImage: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=1200&q=80",
>>>>>>> theirs
=======
    coverImage: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=1200&q=80",
>>>>>>> theirs
  },
  {
    id: "station-mr-world-famous",
    slug: "mr-world-famous",
    name: "Mr. World Famous",
    hostName: "Mr. World Famous",
    genre: "Southern Soul • R&B • Entertainment",
    tagline: "Global Hits",
    description: "Mr. World Famous, also known as Stanley Specks and Mr. Naudy Naudy, blends Southern Soul, R&B, Old School, Hip Hop, and entertainment with a mission to inspire, entertain, and elevate through music and media.",
    streamUrl: "https://us1.streamingpulse.com/stream/soulbluesnetworkradio",
    tier: "featured",
    featured: true,
    approved: true,
    homepageRank: 5,
    status: "active",
    billingStatus: "paid",
    gradient: "from-amber-500 via-orange-600 to-red-800",
    initials: "MW",
<<<<<<< ours
<<<<<<< ours
<<<<<<< ours
    coverImage: "https://images.unsplash.com/photo-1496293455970-f8581aae0e3b?auto=format&fit=crop&w=1200&q=80",
    coverPosition: "center",
=======
    coverImage: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80",
>>>>>>> theirs
=======
    coverImage: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80",
>>>>>>> theirs
=======
    coverImage: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80",
>>>>>>> theirs
  },
  {
    id: "station-judge-ej-russell",
    slug: "judge-ej-russell-podcast-music",
    name: "Judge EJ Russell Podcast & Music",
    hostName: "Judge EJ Russell",
    genre: "Talk • Music",
    tagline: "Law, Life & Music",
    description: "Where legal insight meets great music and real talk.",
    tier: "featured",
    featured: true,
    approved: true,
    homepageRank: 6,
    status: "active",
    billingStatus: "paid",
    gradient: "from-yellow-600 via-amber-700 to-zinc-900",
    initials: "EJ",
<<<<<<< ours
<<<<<<< ours
<<<<<<< ours
    coverImage: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&q=80",
    coverPosition: "center",
=======
    coverImage: "https://images.unsplash.com/photo-1453873531674-2151bcd01707?auto=format&fit=crop&w=1200&q=80",
>>>>>>> theirs
=======
    coverImage: "https://images.unsplash.com/photo-1453873531674-2151bcd01707?auto=format&fit=crop&w=1200&q=80",
>>>>>>> theirs
=======
    coverImage: "https://images.unsplash.com/photo-1453873531674-2151bcd01707?auto=format&fit=crop&w=1200&q=80",
>>>>>>> theirs
  },
  {
    id: "station-praise-101-radio",
    slug: "praise-101-radio",
    name: "Praise 101 Radio",
    hostName: "Praise 101 Radio",
    genre: "Gospel & Inspiration",
    tagline: "Gospel & Inspiration",
    description: "Uplifting gospel, praise music, and inspirational messages 24/7.",
    tier: "featured",
    featured: true,
    approved: true,
    homepageRank: 7,
    status: "active",
    billingStatus: "paid",
    gradient: "from-amber-400 via-yellow-500 to-amber-700",
    initials: "P101",
<<<<<<< ours
<<<<<<< ours
<<<<<<< ours
    coverImage: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1200&q=80",
    coverPosition: "center",
=======
    coverImage: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=1200&q=80",
>>>>>>> theirs
=======
    coverImage: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=1200&q=80",
>>>>>>> theirs
=======
    coverImage: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=1200&q=80",
>>>>>>> theirs
  },
  {
    id: "station-katrinia-williams-show",
    slug: "katrinia-williams-show",
    name: "Katrinia Williams Show",
    hostName: "Katrinia Williams",
    genre: "Lifestyle • Talk",
    tagline: "Real Talk",
    description: "Lifestyle, empowerment, and unfiltered conversations with Katrinia.",
    tier: "featured",
    featured: true,
    approved: true,
    homepageRank: 8,
    status: "active",
    billingStatus: "paid",
    gradient: "from-orange-500 via-amber-600 to-yellow-700",
    initials: "KW",
<<<<<<< ours
<<<<<<< ours
<<<<<<< ours
    coverImage: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80",
    coverPosition: "center",
=======
    coverImage: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=1200&q=80",
>>>>>>> theirs
=======
    coverImage: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=1200&q=80",
>>>>>>> theirs
=======
    coverImage: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=1200&q=80",
>>>>>>> theirs
  },
  {
    id: "station-jazz-radio",
    slug: "jazz-radio",
    name: "Jazz Radio",
    hostName: "Jazz Radio",
    genre: "Smooth & Classic Jazz",
    tagline: "Smooth & Classic",
    description: "Smooth, classic, and contemporary jazz curated for true listeners.",
    tier: "featured",
    featured: true,
    approved: true,
    homepageRank: 9,
    status: "active",
    billingStatus: "paid",
    gradient: "from-yellow-700 via-amber-800 to-stone-900",
    initials: "JZ",
    coverImage: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?auto=format&fit=crop&w=1200&q=80",
<<<<<<< ours
<<<<<<< ours
<<<<<<< ours
    coverPosition: "center",
=======
>>>>>>> theirs
=======
>>>>>>> theirs
=======
>>>>>>> theirs
  },
  {
    id: "station-5-strong-radio",
    slug: "5-strong-radio",
    name: "5 Strong Radio",
    hostName: "5 Strong Radio",
    genre: "Music • Stories",
    tagline: "Strength In Sound",
    description: "Five voices, one frequency. Music, stories, and movement.",
    tier: "featured",
    featured: true,
    approved: true,
    homepageRank: 10,
    status: "active",
    billingStatus: "paid",
    gradient: "from-amber-600 via-yellow-700 to-amber-900",
    initials: "5S",
<<<<<<< ours
<<<<<<< ours
<<<<<<< ours
    coverImage: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1200&q=80",
    coverPosition: "center",
=======
    coverImage: "https://images.unsplash.com/photo-1534367610401-9f5ed68180aa?auto=format&fit=crop&w=1200&q=80",
>>>>>>> theirs
=======
    coverImage: "https://images.unsplash.com/photo-1534367610401-9f5ed68180aa?auto=format&fit=crop&w=1200&q=80",
>>>>>>> theirs
=======
    coverImage: "https://images.unsplash.com/photo-1534367610401-9f5ed68180aa?auto=format&fit=crop&w=1200&q=80",
>>>>>>> theirs
  },
];

export const approvedStations = stations.filter(
  (station) => station.approved && station.status === "active"
);

export const publicStations = approvedStations.filter(
  (station) => station.billingStatus === "paid"
);

export const featuredStations = publicStations
  .filter((station) => station.featured)
  .sort((a, b) => (a.homepageRank ?? Number.MAX_SAFE_INTEGER) - (b.homepageRank ?? Number.MAX_SAFE_INTEGER));

export const homepageFeaturedStations = featuredStations.slice(0, FEATURED_HOMEPAGE_LIMIT);

export const findStationBySlug = (slug: string) =>
  stations.find((station) => station.slug === slug);

export const isStationPublic = (station: Station) =>
  station.approved && station.status === "active" && station.billingStatus === "paid";
