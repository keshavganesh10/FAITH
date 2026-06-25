// UK Hindu community events — Mandir, NHSF, university socials.

export type EventType = 'Mandir Aarti' | 'NHSF' | 'Festival' | 'Study circle' | 'Seva' | 'Social';

export interface CommunityEvent {
  id: string;
  title: string;
  type: EventType;
  host: string;
  hostAvatar?: string;
  venue: string;
  city: string;
  date: string;
  distanceKm: number;
  free: boolean;
  price?: number;
  attendees: number;
  description: string;
  lat: number;
  lng: number;
  image?: string;
  emoji: string;
}

// loremflickr serves keyword-relevant Flickr photos with deterministic seeds.
// A single, well-chosen tag returns far more relevant results than a comma-AND list.
const flickr = (kw: string, seed: number, w = 1080, h = 720) =>
  `https://loremflickr.com/${w}/${h}/${encodeURIComponent(kw)}?lock=${seed}`;
const avatar = (kw: string, seed: number) =>
  `https://loremflickr.com/200/200/${encodeURIComponent(kw)}?lock=${seed}`;

const inDays = (n: number, h = 19, m = 0) => {
  const d = new Date(); d.setDate(d.getDate() + n); d.setHours(h, m, 0, 0); return d.toISOString();
};

export const EVENTS: CommunityEvent[] = [
  {
    id: 'e-nhsf-mcr-garba', title: 'Navratri Garba Night', type: 'NHSF',
    host: 'NHSF Manchester', hostAvatar: avatar('logo,indian', 101),
    venue: 'Whitworth Hall, University of Manchester',
    city: 'Manchester', date: inDays(2, 19, 30), distanceKm: 1.2, free: false, price: 8, attendees: 184,
    description: 'Live dhol, garba and dandiya raas — open to all students. Traditional dress encouraged. Aarti at 8pm.',
    lat: 53.4670, lng: -2.2330, emoji: '💃',
    image: flickr('garba', 11),
  },
  {
    id: 'e-neasden-aarti', title: 'Sandhya Aarti', type: 'Mandir Aarti',
    host: 'BAPS Shri Swaminarayan Mandir', hostAvatar: avatar('temple,hindu', 102),
    venue: 'Neasden Temple, London',
    city: 'London', date: inDays(0, 18, 30), distanceKm: 4.7, free: true, attendees: 320,
    description: 'Daily evening aarti followed by prasad. All welcome, including first-time visitors.',
    lat: 51.5547, lng: -0.2647, emoji: '🪔',
    image: flickr('aarti', 12),
  },
  {
    id: 'e-gita-circle', title: 'Bhagavad Gita Study Circle — Chapter 12', type: 'Study circle',
    host: 'NHSF UCL', hostAvatar: avatar('book,gita', 103),
    venue: 'UCL Bloomsbury Campus, Room G14',
    city: 'London', date: inDays(3, 18, 0), distanceKm: 2.1, free: true, attendees: 32,
    description: 'Weekly student-led discussion on the Bhakti Yoga chapter. Bring your own translation or use ours.',
    lat: 51.5246, lng: -0.1340, emoji: '📖',
    image: flickr('bhagavadgita', 13),
  },
  {
    id: 'e-diwali-ball', title: 'NHSF National Diwali Ball', type: 'Festival',
    host: 'NHSF National', hostAvatar: avatar('diwali,lights', 104),
    venue: 'The Brewery, London',
    city: 'London', date: inDays(14, 19, 0), distanceKm: 5.8, free: false, price: 65, attendees: 420,
    description: 'The flagship NHSF Diwali black-tie event. Three-course Indian fine dining, performances, after-party.',
    lat: 51.5215, lng: -0.0961, emoji: '🪅',
    image: flickr('diwali', 14),
  },
  {
    id: 'e-leics-langar', title: 'Annakut Seva — Food Distribution', type: 'Seva',
    host: 'Shree Sanatan Mandir Leicester', hostAvatar: avatar('temple,india', 105),
    venue: 'Sanatan Mandir, Weymouth Street',
    city: 'Leicester', date: inDays(5, 11, 0), distanceKm: 0.8, free: true, attendees: 60,
    description: 'Help prepare and distribute prasad to the local community. No experience needed — just willing hands.',
    lat: 52.6443, lng: -1.1242, emoji: '🍛',
    image: flickr('thali', 15),
  },
  {
    id: 'e-bham-cricket', title: 'NHSF Inter-Uni Cricket Tournament', type: 'NHSF',
    host: 'NHSF Birmingham', hostAvatar: avatar('cricket,sport', 106),
    venue: 'Edgbaston Indoor Cricket Centre',
    city: 'Birmingham', date: inDays(7, 10, 0), distanceKm: 3.4, free: false, price: 5, attendees: 96,
    description: '12 Hindu societies, one trophy. Sign up as a team or join one on the day.',
    lat: 52.4555, lng: -1.9047, emoji: '🏏',
    image: flickr('cricket', 16),
  },
  {
    id: 'e-bhajan-night', title: 'Bhajan & Kirtan Night', type: 'Social',
    host: 'Bhaktivedanta Manor', hostAvatar: avatar('krishna,iskcon', 107),
    venue: 'Bhaktivedanta Manor, Watford',
    city: 'Watford', date: inDays(4, 19, 30), distanceKm: 18.0, free: true, attendees: 145,
    description: 'Acoustic kirtan led by visiting devotees. Vegetarian feast served afterward.',
    lat: 51.6736, lng: -0.4128, emoji: '🎵',
    image: flickr('harmonium', 17),
  },
  {
    id: 'e-warwick-holi', title: 'Holi on the Piazza', type: 'Festival',
    host: 'NHSF Warwick', hostAvatar: avatar('holi,colors', 108),
    venue: 'University of Warwick Piazza',
    city: 'Coventry', date: inDays(21, 12, 0), distanceKm: 22.5, free: true, attendees: 510,
    description: 'Free colours, free bhang lassi, free food. Wear white — leave colourful.',
    lat: 52.3793, lng: -1.5615, emoji: '🌈',
    image: flickr('holi', 18),
  },
  {
    id: 'e-leeds-yoga', title: 'Sunrise Yoga & Surya Namaskar', type: 'Social',
    host: 'NHSF Leeds', hostAvatar: avatar('yoga,sun', 109),
    venue: 'Hyde Park, Leeds',
    city: 'Leeds', date: inDays(1, 7, 0), distanceKm: 2.8, free: true, attendees: 48,
    description: '108 Surya Namaskars at sunrise. Mats provided. Followed by chai and breakfast.',
    lat: 53.8167, lng: -1.5667, emoji: '🧘',
    image: flickr('yoga', 19),
  },
  {
    id: 'e-edin-shivratri', title: 'Maha Shivratri Night Vigil', type: 'Festival',
    host: 'Edinburgh Hindu Mandir', hostAvatar: avatar('shiva,lingam', 110),
    venue: 'Edinburgh Hindu Mandir, St Andrew Place',
    city: 'Edinburgh', date: inDays(11, 18, 0), distanceKm: 305, free: true, attendees: 210,
    description: 'All-night bhajans, four-phase abhishekam to Shivlinga, prasad through the night.',
    lat: 55.9533, lng: -3.1883, emoji: '🕉️',
    image: flickr('shivlinga', 20),
  },
];

export const EVENT_TYPES: EventType[] = ['Mandir Aarti', 'NHSF', 'Festival', 'Study circle', 'Seva', 'Social'];
