import type { FaithId } from './faiths';

export type EventType = 'worship' | 'study' | 'festival' | 'volunteering';
export type PostKind = 'event' | 'reflection' | 'photo';

export interface Comment {
  user: string;
  handle: string;
  text: string;
  likes?: number;
}

export interface StorySlide {
  image: string;
  caption?: string;
}

export interface Story {
  id: string;
  handle: string;          // links to ACCOUNTS
  name: string;
  symbol: string;
  hue: number;
  live?: boolean;
  slides: StorySlide[];
}

export interface CommunityEvent {
  id: string;
  faith: FaithId | 'all';
  type: EventType;
  kind: PostKind;
  title: string;
  host: string;            // account display name
  handle: string;          // @handle (matches ACCOUNTS)
  verified?: boolean;
  venue: string;
  date: string;            // ISO
  distanceKm: number;
  description: string;
  // Visual
  image: string;           // hero photo
  hue: number;             // fallback gradient hue
  symbol: string;          // glyph
  postedAgo: string;       // "2h", "1d"
  // Map
  lat: number;
  lng: number;
  // Engagement
  comments: Comment[];
}

const inDays = (n: number) => {
  const d = new Date(); d.setDate(d.getDate() + n); d.setHours(18, 30, 0, 0);
  return d.toISOString();
};

// Real Unsplash imagery — handpicked, faith-themed
const IMG = {
  diwali:    'https://images.unsplash.com/photo-1605302301730-9d1f1d3e3a93?w=800&h=800&fit=crop',
  diwali2:   'https://images.unsplash.com/photo-1574236170880-faaf5fbe73d6?w=800&h=800&fit=crop',
  diwali3:   'https://images.unsplash.com/photo-1604608672516-f1b9b1d2c1f4?w=800&h=800&fit=crop',
  church:    'https://images.unsplash.com/photo-1438032005730-c779502df39b?w=800&h=800&fit=crop',
  candles:   'https://images.unsplash.com/photo-1507692049790-de58290a4334?w=800&h=800&fit=crop',
  mosque:    'https://images.unsplash.com/photo-1542816417-0983c9c9ad53?w=800&h=800&fit=crop',
  quran:     'https://images.unsplash.com/photo-1591824438708-ce405f36ba3d?w=800&h=800&fit=crop',
  langar:    'https://images.unsplash.com/photo-1604908554049-fc46f15bd95e?w=800&h=800&fit=crop',
  gurdwara:  'https://images.unsplash.com/photo-1609938733512-bb70bc77c8c5?w=800&h=800&fit=crop',
  meditate:  'https://images.unsplash.com/photo-1545389336-cf090694435e?w=800&h=800&fit=crop',
  buddha:    'https://images.unsplash.com/photo-1532375672259-d2b1d7a02f9b?w=800&h=800&fit=crop',
  shabbat:   'https://images.unsplash.com/photo-1591128846807-1f9f87b73f80?w=800&h=800&fit=crop',
  menorah:   'https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=800&h=800&fit=crop',
  harvest:   'https://images.unsplash.com/photo-1529390079861-591de354faf5?w=800&h=800&fit=crop',
  table:     'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=800&fit=crop',
  gita:      'https://images.unsplash.com/photo-1604608672516-f1b9b1d2c1f4?w=800&h=800&fit=crop',
  scripture: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=800&fit=crop',
  choir:     'https://images.unsplash.com/photo-1519677100203-a0e668c92439?w=800&h=800&fit=crop',
  iftar:     'https://images.unsplash.com/photo-1593007677747-e8e8b3a78d2e?w=800&h=800&fit=crop',
};

export const STORIES: Story[] = [
  { id: 's0', handle: '@you', name: 'Your story', symbol: '+', hue: 210, slides: [] },
  {
    id: 's1', handle: '@krishnamandir', name: 'Mandir', symbol: 'ॐ', hue: 28, live: true,
    slides: [
      { image: IMG.diwali,  caption: 'Setting up for tonight\'s aarti 🪔' },
      { image: IMG.diwali2, caption: 'Diyas ready · come early' },
      { image: IMG.diwali3, caption: 'See you at 6:30' },
    ],
  },
  {
    id: 's2', handle: '@standrews', name: 'St Andrew', symbol: '✝', hue: 210,
    slides: [
      { image: IMG.church,  caption: 'Morning light through the nave' },
      { image: IMG.choir,   caption: 'Choir rehearsal · Sunday\'s programme' },
    ],
  },
  {
    id: 's3', handle: '@centralmasjid', name: 'Masjid', symbol: '☾', hue: 160,
    slides: [
      { image: IMG.mosque, caption: 'Maghrib in 20 minutes' },
      { image: IMG.iftar,  caption: 'Iftar prep — all welcome' },
    ],
  },
  {
    id: 's4', handle: '@gurdwarasahib', name: 'Gurdwara', symbol: '☬', hue: 38,
    slides: [
      { image: IMG.langar,    caption: 'Langar is on 🍲' },
      { image: IMG.gurdwara,  caption: 'Quiet darshan this morning' },
    ],
  },
  {
    id: 's5', handle: '@lotussangha', name: 'Sangha', symbol: '☸', hue: 280, live: true,
    slides: [
      { image: IMG.meditate, caption: 'Live: 30-minute sit, join in 🪷' },
      { image: IMG.buddha,   caption: 'Tea and tonglen after' },
    ],
  },
  {
    id: 's6', handle: '@bethshalom', name: 'Beth Shalom', symbol: '✡', hue: 200,
    slides: [
      { image: IMG.shabbat, caption: 'Candles ready for Shabbat' },
      { image: IMG.menorah, caption: 'Erev tov ✨' },
    ],
  },
  {
    id: 's7', handle: '@civic', name: 'Civic', symbol: '✿', hue: 340,
    slides: [
      { image: IMG.harvest, caption: 'Setting one long table for everyone' },
      { image: IMG.table,   caption: 'See you Saturday at noon' },
    ],
  },
];

export const EVENTS: CommunityEvent[] = [
  {
    id: 'e1', faith: 'hinduism', type: 'festival', kind: 'event',
    title: 'Diwali Lights & Aarti',
    host: 'Shree Krishna Mandir', handle: '@krishnamandir', verified: true,
    venue: '14 Temple Lane, Leicester', date: inDays(3), distanceKm: 1.2,
    description: 'Join us for an evening of light, shared aarti, sweets and music. Bring the whole family — diyas provided. ✨🪔',
    image: IMG.diwali, hue: 28, symbol: 'ॐ', postedAgo: '2h',
    lat: 52.6369, lng: -1.1398,
    comments: [
      { user: 'Anika', handle: '@anika.r', text: 'Counting down the days! 🪔', likes: 12 },
      { user: 'Dev', handle: '@dev.p', text: 'Will there be prasad after aarti?', likes: 3 },
      { user: 'Ravi', handle: '@ravi.s', text: 'Bringing the whole family ❤️', likes: 7 },
    ],
  },
  {
    id: 'e2', faith: 'christianity', type: 'worship', kind: 'event',
    title: 'Sunday Morning Service',
    host: "St. Andrew's Church", handle: '@standrews', verified: true,
    venue: 'High Street, York', date: inDays(2), distanceKm: 0.6,
    description: 'A traditional service with hymns, scripture and a sermon on hope. All are welcome — coffee served after.',
    image: IMG.church, hue: 210, symbol: '✝', postedAgo: '5h',
    lat: 53.9590, lng: -1.0815,
    comments: [
      { user: 'Mary', handle: '@mary.j', text: 'Looking forward to the choir 🎶', likes: 9 },
      { user: 'Sarah', handle: '@sarah.b', text: 'Saving a pew at the back!', likes: 2 },
    ],
  },
  {
    id: 'e3', faith: 'islam', type: 'study', kind: 'event',
    title: 'Tafsir Circle: Surah Al-Mulk',
    host: 'Central Mosque', handle: '@centralmasjid', verified: true,
    venue: 'Park Road, Bradford', date: inDays(4), distanceKm: 2.1,
    description: "A guided weekly study of the Qur'an. Tea and dates served afterwards. Beginners warmly welcome.",
    image: IMG.quran, hue: 160, symbol: '☾', postedAgo: '1d',
    lat: 53.7960, lng: -1.7594,
    comments: [
      { user: 'Yusuf', handle: '@yusuf.a', text: 'Jazak Allah khair, see you Thursday', likes: 14 },
      { user: 'Layla', handle: '@layla.m', text: 'Is parking available nearby?', likes: 1 },
    ],
  },
  {
    id: 'e4', faith: 'sikhism', type: 'volunteering', kind: 'event',
    title: 'Langar Kitchen Volunteers',
    host: 'Gurdwara Sahib', handle: '@gurdwarasahib',
    venue: '22 Maple Avenue, Wolverhampton', date: inDays(1), distanceKm: 3.5,
    description: 'Help prepare and serve langar for the local community. No experience needed — just an open heart.',
    image: IMG.langar, hue: 38, symbol: '☬', postedAgo: '8h',
    lat: 52.5862, lng: -2.1288,
    comments: [
      { user: 'Harpreet', handle: '@harpreet.k', text: 'Bringing two friends along 🙏', likes: 11 },
    ],
  },
  {
    id: 'e5', faith: 'buddhism', type: 'study', kind: 'reflection',
    title: 'Mindful Meditation Sit',
    host: 'Lotus Sangha', handle: '@lotussangha',
    venue: 'Riverside Hall, Bristol', date: inDays(5), distanceKm: 4.0,
    description: '"In the silence between thoughts, the mind finds its true home." A 45-minute guided sit followed by tea.',
    image: IMG.meditate, hue: 280, symbol: '☸', postedAgo: '3h',
    lat: 51.4545, lng: -2.5879,
    comments: [
      { user: 'Tara', handle: '@tara.l', text: 'Such a beautiful reminder 🌸', likes: 18 },
    ],
  },
  {
    id: 'e6', faith: 'judaism', type: 'worship', kind: 'event',
    title: 'Friday Shabbat Service',
    host: 'Beth Shalom Synagogue', handle: '@bethshalom', verified: true,
    venue: 'Oak Street, Manchester', date: inDays(5), distanceKm: 1.8,
    description: 'Welcome the Shabbat with song, prayer and a kiddush gathering afterwards.',
    image: IMG.shabbat, hue: 200, symbol: '✡', postedAgo: '12h',
    lat: 53.4808, lng: -2.2426,
    comments: [],
  },
  {
    id: 'e7', faith: 'all', type: 'festival', kind: 'event',
    title: 'Interfaith Harvest Gathering',
    host: 'Interfaith Civic', handle: '@civic', verified: true,
    venue: 'Town Square, Birmingham', date: inDays(7), distanceKm: 0.9,
    description: 'A shared meal and reflections from leaders of every tradition. One table, many voices. 🌾',
    image: IMG.harvest, hue: 340, symbol: '✿', postedAgo: '1d',
    lat: 52.4862, lng: -1.8904,
    comments: [
      { user: 'Ravi', handle: '@ravi.s', text: 'Such a wonderful initiative ❤️', likes: 22 },
      { user: 'Sarah', handle: '@sarah.b', text: 'Will be there with the family', likes: 5 },
    ],
  },
  {
    id: 'e8', faith: 'hinduism', type: 'study', kind: 'reflection',
    title: 'Gita Reading Circle',
    host: 'Vedanta Society', handle: '@vedanta',
    venue: 'Cedar Hall, London', date: inDays(6), distanceKm: 2.7,
    description: '"You have the right to work, but never to the fruit of work." — Verse-by-verse reading of Chapter 2.',
    image: IMG.gita, hue: 14, symbol: 'ॐ', postedAgo: '6h',
    lat: 51.5074, lng: -0.1278,
    comments: [],
  },
];
