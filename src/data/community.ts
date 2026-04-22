import type { FaithId } from './faiths';

export type EventType = 'worship' | 'study' | 'festival' | 'volunteering';
export type PostKind = 'event' | 'reflection' | 'photo';

export interface Comment {
  user: string;
  handle: string;
  text: string;
}

export interface CommunityEvent {
  id: string;
  faith: FaithId | 'all';
  type: EventType;
  kind: PostKind;
  title: string;
  host: string;            // account display name
  handle: string;          // @handle
  verified?: boolean;
  venue: string;
  date: string;            // ISO
  distanceKm: number;
  description: string;
  // Visual
  hue: number;             // gradient hue for poster art
  symbol: string;          // glyph shown on the poster
  postedAgo: string;       // "2h", "1d"
  // Engagement
  comments: Comment[];
}

const inDays = (n: number) => {
  const d = new Date(); d.setDate(d.getDate() + n); d.setHours(18, 30, 0, 0);
  return d.toISOString();
};

export const STORIES: { id: string; name: string; symbol: string; hue: number; live?: boolean }[] = [
  { id: 's0', name: 'Your story', symbol: '+', hue: 210 },
  { id: 's1', name: 'Mandir', symbol: 'ॐ', hue: 28, live: true },
  { id: 's2', name: 'St Andrew', symbol: '✝', hue: 210 },
  { id: 's3', name: 'Masjid', symbol: '☾', hue: 160 },
  { id: 's4', name: 'Gurdwara', symbol: '☬', hue: 38 },
  { id: 's5', name: 'Sangha', symbol: '☸', hue: 280, live: true },
  { id: 's6', name: 'Beth Shalom', symbol: '✡', hue: 200 },
  { id: 's7', name: 'Civic', symbol: '✿', hue: 340 },
];

export const EVENTS: CommunityEvent[] = [
  {
    id: 'e1', faith: 'hinduism', type: 'festival', kind: 'event',
    title: 'Diwali Lights & Aarti',
    host: 'Shree Krishna Mandir', handle: '@krishnamandir', verified: true,
    venue: '14 Temple Lane', date: inDays(3), distanceKm: 1.2,
    description: 'Join us for an evening of light, shared aarti, sweets and music. Bring the whole family — diyas provided. ✨🪔',
    hue: 28, symbol: 'ॐ', postedAgo: '2h',
    comments: [
      { user: 'Anika', handle: '@anika.r', text: 'Counting down the days! 🪔' },
      { user: 'Dev', handle: '@dev.p', text: 'Will there be prasad after aarti?' },
    ],
  },
  {
    id: 'e2', faith: 'christianity', type: 'worship', kind: 'event',
    title: 'Sunday Morning Service',
    host: "St. Andrew's Church", handle: '@standrews', verified: true,
    venue: 'High Street', date: inDays(2), distanceKm: 0.6,
    description: 'A traditional service with hymns, scripture and a sermon on hope. All are welcome — coffee served after.',
    hue: 210, symbol: '✝', postedAgo: '5h',
    comments: [
      { user: 'Mary', handle: '@mary.j', text: 'Looking forward to the choir 🎶' },
    ],
  },
  {
    id: 'e3', faith: 'islam', type: 'study', kind: 'event',
    title: 'Tafsir Circle: Surah Al-Mulk',
    host: 'Central Mosque', handle: '@centralmasjid', verified: true,
    venue: 'Park Road', date: inDays(4), distanceKm: 2.1,
    description: 'A guided weekly study of the Qur\'an. Tea and dates served afterwards. Beginners warmly welcome.',
    hue: 160, symbol: '☾', postedAgo: '1d',
    comments: [
      { user: 'Yusuf', handle: '@yusuf.a', text: 'Jazak Allah khair, see you Thursday' },
      { user: 'Layla', handle: '@layla.m', text: 'Is parking available nearby?' },
    ],
  },
  {
    id: 'e4', faith: 'sikhism', type: 'volunteering', kind: 'event',
    title: 'Langar Kitchen Volunteers',
    host: 'Gurdwara Sahib', handle: '@gurdwarasahib',
    venue: '22 Maple Avenue', date: inDays(1), distanceKm: 3.5,
    description: 'Help prepare and serve langar for the local community. No experience needed — just an open heart.',
    hue: 38, symbol: '☬', postedAgo: '8h',
    comments: [
      { user: 'Harpreet', handle: '@harpreet.k', text: 'Bringing two friends along 🙏' },
    ],
  },
  {
    id: 'e5', faith: 'buddhism', type: 'study', kind: 'reflection',
    title: 'Mindful Meditation Sit',
    host: 'Lotus Sangha', handle: '@lotussangha',
    venue: 'Riverside Hall', date: inDays(5), distanceKm: 4.0,
    description: '"In the silence between thoughts, the mind finds its true home." A 45-minute guided sit followed by tea.',
    hue: 280, symbol: '☸', postedAgo: '3h',
    comments: [
      { user: 'Tara', handle: '@tara.l', text: 'Such a beautiful reminder 🌸' },
    ],
  },
  {
    id: 'e6', faith: 'judaism', type: 'worship', kind: 'event',
    title: 'Friday Shabbat Service',
    host: 'Beth Shalom Synagogue', handle: '@bethshalom', verified: true,
    venue: 'Oak Street', date: inDays(5), distanceKm: 1.8,
    description: 'Welcome the Shabbat with song, prayer and a kiddush gathering afterwards.',
    hue: 200, symbol: '✡', postedAgo: '12h',
    comments: [],
  },
  {
    id: 'e7', faith: 'all', type: 'festival', kind: 'event',
    title: 'Interfaith Harvest Gathering',
    host: 'Civic Centre', handle: '@civic', verified: true,
    venue: 'Town Square', date: inDays(7), distanceKm: 0.9,
    description: 'A shared meal and reflections from leaders of every tradition. One table, many voices. 🌾',
    hue: 340, symbol: '✿', postedAgo: '1d',
    comments: [
      { user: 'Ravi', handle: '@ravi.s', text: 'Such a wonderful initiative ❤️' },
      { user: 'Sarah', handle: '@sarah.b', text: 'Will be there with the family' },
    ],
  },
  {
    id: 'e8', faith: 'hinduism', type: 'study', kind: 'reflection',
    title: 'Gita Reading Circle',
    host: 'Vedanta Society', handle: '@vedanta',
    venue: 'Cedar Hall', date: inDays(6), distanceKm: 2.7,
    description: '"You have the right to work, but never to the fruit of work." — Verse-by-verse reading of Chapter 2.',
    hue: 14, symbol: 'ॐ', postedAgo: '6h',
    comments: [],
  },
];
