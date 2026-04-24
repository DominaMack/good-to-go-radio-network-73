export interface Station {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  gradient: string;
  initials: string;
}

export const stations: Station[] = [
  {
    slug: "good-to-go-radio",
    name: "Good To Go Radio",
    tagline: "The Flagship",
    description: "The heartbeat of the network — the best in music, talk, and culture, broadcasting around the clock.",
    gradient: "from-amber-500 via-yellow-500 to-amber-700",
    initials: "GTG",
  },
  {
    slug: "good-trouble-podcast",
    name: "Good Trouble Podcast",
    tagline: "Bold Conversations",
    description: "Honest conversations on the issues that move communities forward.",
    gradient: "from-yellow-600 via-amber-600 to-orange-700",
    initials: "GT",
  },
  {
    slug: "wesleyan-forever-radio",
    name: "Wesleyan Forever Radio",
    tagline: "Faith & Heritage",
    description: "Inspirational programming celebrating tradition, faith, and community.",
    gradient: "from-amber-400 via-yellow-600 to-yellow-800",
    initials: "WF",
  },
  {
    slug: "the-golden-boy-blues-radio",
    name: "The Golden Boy Blues Radio",
    tagline: "Pure Blues",
    description: "All blues, all day. Classic legends and rising names of the genre.",
    gradient: "from-yellow-500 via-amber-700 to-stone-800",
    initials: "GB",
  },
  {
    slug: "mr-world-famous",
    name: "Mr. World Famous",
    tagline: "Global Hits",
    description: "Worldwide hits, exclusive interviews, and the sounds of the streets.",
    gradient: "from-amber-500 via-orange-600 to-red-800",
    initials: "MW",
  },
  {
    slug: "judge-ej-russell-podcast-music",
    name: "Judge EJ Russell Podcast & Music",
    tagline: "Law, Life & Music",
    description: "Where legal insight meets great music and real talk.",
    gradient: "from-yellow-600 via-amber-700 to-zinc-900",
    initials: "EJ",
  },
  {
    slug: "praise-101-radio",
    name: "Praise 101 Radio",
    tagline: "Gospel & Inspiration",
    description: "Uplifting gospel, praise music, and inspirational messages 24/7.",
    gradient: "from-amber-400 via-yellow-500 to-amber-700",
    initials: "P101",
  },
  {
    slug: "katrinia-williams-show",
    name: "Katrinia Williams Show",
    tagline: "Real Talk",
    description: "Lifestyle, empowerment, and unfiltered conversations with Katrinia.",
    gradient: "from-orange-500 via-amber-600 to-yellow-700",
    initials: "KW",
  },
  {
    slug: "jazz-radio",
    name: "Jazz Radio",
    tagline: "Smooth & Classic",
    description: "Smooth, classic, and contemporary jazz curated for true listeners.",
    gradient: "from-yellow-700 via-amber-800 to-stone-900",
    initials: "JZ",
  },
  {
    slug: "5-strong-radio",
    name: "5 Strong Radio",
    tagline: "Strength In Sound",
    description: "Five voices, one frequency. Music, stories, and movement.",
    gradient: "from-amber-600 via-yellow-700 to-amber-900",
    initials: "5S",
  },
];
