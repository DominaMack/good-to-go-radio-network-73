export interface Station {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  host?: string;
  gradient: string;
  initials: string;
  coverImage: string;
}

export const stations: Station[] = [
  {
    slug: "good-to-go-radio",
    name: "Good To Go Radio",
    tagline: "The Flagship",
    description: "The heartbeat of the network — the best in music, talk, and culture, broadcasting around the clock.",
    gradient: "from-amber-500 via-yellow-500 to-amber-700",
    initials: "GTG",
    coverImage: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "good-trouble-podcast",
    name: "Good Trouble Podcast",
    tagline: "Bold Conversations",
    description: "Honest conversations on the issues that move communities forward.",
    gradient: "from-yellow-600 via-amber-600 to-orange-700",
    initials: "GT",
    coverImage: "https://images.unsplash.com/photo-1589903308904-1010c2294adc?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "wesleyan-forever-radio",
    name: "Wesleyan Forever Radio",
    tagline: "Faith & Heritage",
    description: "Inspirational programming celebrating tradition, faith, and community.",
    gradient: "from-amber-400 via-yellow-600 to-yellow-800",
    initials: "WF",
    coverImage: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "the-golden-boy-blues-radio",
    name: "The Golden Boy Blues Radio",
    tagline: "Pure Blues",
    host: "Bernard",
    description: "All blues, all day. Classic legends and rising names of the genre.",
    gradient: "from-yellow-500 via-amber-700 to-stone-800",
    initials: "GB",
    coverImage: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "mr-world-famous",
    name: "Mr. World Famous",
    tagline: "Global Hits",
    description: "Worldwide hits, exclusive interviews, and the sounds of the streets.",
    gradient: "from-amber-500 via-orange-600 to-red-800",
    initials: "MW",
    coverImage: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "judge-ej-russell-podcast-music",
    name: "Judge EJ Russell Podcast & Music",
    tagline: "Law, Life & Music",
    description: "Where legal insight meets great music and real talk.",
    gradient: "from-yellow-600 via-amber-700 to-zinc-900",
    initials: "EJ",
    coverImage: "https://images.unsplash.com/photo-1453873531674-2151bcd01707?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "praise-101-radio",
    name: "Praise 101 Radio",
    tagline: "Gospel & Inspiration",
    description: "Uplifting gospel, praise music, and inspirational messages 24/7.",
    gradient: "from-amber-400 via-yellow-500 to-amber-700",
    initials: "P101",
    coverImage: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "katrinia-williams-show",
    name: "Katrinia Williams Show",
    tagline: "Real Talk",
    description: "Lifestyle, empowerment, and unfiltered conversations with Katrinia.",
    gradient: "from-orange-500 via-amber-600 to-yellow-700",
    initials: "KW",
    coverImage: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "jazz-radio",
    name: "Jazz Radio",
    tagline: "Smooth & Classic",
    description: "Smooth, classic, and contemporary jazz curated for true listeners.",
    gradient: "from-yellow-700 via-amber-800 to-stone-900",
    initials: "JZ",
    coverImage: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "5-strong-radio",
    name: "5 Strong Radio",
    tagline: "Strength In Sound",
    description: "Five voices, one frequency. Music, stories, and movement.",
    gradient: "from-amber-600 via-yellow-700 to-amber-900",
    initials: "5S",
    coverImage: "https://images.unsplash.com/photo-1534367610401-9f5ed68180aa?auto=format&fit=crop&w=1200&q=80",
  },
];
