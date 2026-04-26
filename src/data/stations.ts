export interface Station {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  streamUrl?: string;
  gradient: string;
  initials: string;
  coverImage: string;
  coverPosition?: string;
}

export const stations: Station[] = [
  {
    slug: "good-to-go-radio",
    name: "Good To Go Radio",
    tagline: "The Flagship",
    description: "Host Gregory Buckles leads the flagship of the network with talk, music, activism, gospel, blues, and real community voices. Where community meets rhythm — and change becomes sound.",
    streamUrl: "https://c38.radioboss.fm/stream/310",
    gradient: "from-amber-500 via-yellow-500 to-amber-700",
    initials: "GTG",
    coverImage: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=1200&q=80",
    coverPosition: "center",
  },
  {
    slug: "good-trouble-podcast",
    name: "Good Trouble Podcast",
    tagline: "Bold Conversations",
    description: "Gregory Buckles with Timeka Garrett explore activism, justice, leadership, and the journeys of entrepreneurs who stepped out on faith. Inspired by Congressman John Lewis and grounded in authenticity.",
    streamUrl: "https://us1.streamingpulse.com:2199/start/gregory",
    gradient: "from-yellow-600 via-amber-600 to-orange-700",
    initials: "GT",
    coverImage: "https://images.unsplash.com/photo-1589903308904-1010c2294adc?auto=format&fit=crop&w=1200&q=80",
    coverPosition: "center",
  },
  {
    slug: "wesleyan-forever-radio",
    name: "Wesleyan Forever Radio",
    tagline: "Faith & Heritage",
    description: "Kenneth Rouche brings faithful, musical, and powerfully spiritual gospel choir radio 24/7. A dedicated home for worship, choir favorites, and uplifting praise from wesleyanforever.com.",
    streamUrl: "https://s2.radio.co/seed639db7/listen",
    gradient: "from-amber-400 via-yellow-600 to-yellow-800",
    initials: "WF",
    coverImage: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?auto=format&fit=crop&w=1200&q=80",
    coverPosition: "center",
  },
  {
    slug: "the-golden-boy-blues-radio",
    name: "The Golden Boy Blues Radio",
    tagline: "Pure Blues",
    description: "Hosted by Leonard \"The Golden Boy\" McMorris, this station delivers signature blues style and fire from the heart of the blues scene 24/7. Follow at facebook.com/bernard.goldenboy.",
    streamUrl: "https://streamer.radio.co/sc7b42122c/listen",
    gradient: "from-yellow-500 via-amber-700 to-stone-800",
    initials: "GB",
    coverImage: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1200&q=80",
    coverPosition: "center",
  },
  {
    slug: "mr-world-famous",
    name: "Mr. World Famous",
    tagline: "Global Hits",
    description: "Mr. World Famous, also known as Stanley Specks and Mr. Naudy Naudy, blends Southern Soul, R&B, Old School, Hip Hop, and entertainment with a mission to inspire, entertain, and elevate through music and media.",
    streamUrl: "https://us1.streamingpulse.com/stream/soulbluesnetworkradio",
    gradient: "from-amber-500 via-orange-600 to-red-800",
    initials: "MW",
    coverImage: "https://images.unsplash.com/photo-1496293455970-f8581aae0e3b?auto=format&fit=crop&w=1200&q=80",
    coverPosition: "center",
  },
  {
    slug: "judge-ej-russell-podcast-music",
    name: "Judge EJ Russell Podcast & Music",
    tagline: "Law, Life & Music",
    description: "Where legal insight meets great music and real talk.",
    gradient: "from-yellow-600 via-amber-700 to-zinc-900",
    initials: "EJ",
    coverImage: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&q=80",
    coverPosition: "center",
  },
  {
    slug: "praise-101-radio",
    name: "Praise 101 Radio",
    tagline: "Gospel & Inspiration",
    description: "Uplifting gospel, praise music, and inspirational messages 24/7.",
    gradient: "from-amber-400 via-yellow-500 to-amber-700",
    initials: "P101",
    coverImage: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1200&q=80",
    coverPosition: "center",
  },
  {
    slug: "katrinia-williams-show",
    name: "Katrinia Williams Show",
    tagline: "Real Talk",
    description: "Lifestyle, empowerment, and unfiltered conversations with Katrinia.",
    gradient: "from-orange-500 via-amber-600 to-yellow-700",
    initials: "KW",
    coverImage: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80",
    coverPosition: "center",
  },
  {
    slug: "jazz-radio",
    name: "Jazz Radio",
    tagline: "Smooth & Classic",
    description: "Smooth, classic, and contemporary jazz curated for true listeners.",
    gradient: "from-yellow-700 via-amber-800 to-stone-900",
    initials: "JZ",
    coverImage: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?auto=format&fit=crop&w=1200&q=80",
    coverPosition: "center",
  },
  {
    slug: "5-strong-radio",
    name: "5 Strong Radio",
    tagline: "Strength In Sound",
    description: "Five voices, one frequency. Music, stories, and movement.",
    gradient: "from-amber-600 via-yellow-700 to-amber-900",
    initials: "5S",
    coverImage: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1200&q=80",
    coverPosition: "center",
  },
];
