// UK Hindu community events — Mandir, NHSF, university socials.

export type EventType = 'Mandir Aarti' | 'NHSF' | 'Festival' | 'Study circle' | 'Seva' | 'Social';

export interface CommunityEvent {
  id: string;
  title: string;
  type: EventType;
  host: string;
  venue: string;
  city: string;
  date: string;          // ISO
  distanceKm: number;
  free: boolean;
  price?: number;
  attendees: number;
  description: string;
  lat: number;
  lng: number;
  image?: string;        // Unsplash url
  emoji: string;
}

const img = (q: string, sig: number) =>
  `https://images.unsplash.com/photo-${q}?auto=format&fit=crop&w=800&q=70&sig=${sig}`;

const inDays = (n: number, h = 19, m = 0) => {
  const d = new Date(); d.setDate(d.getDate() + n); d.setHours(h, m, 0, 0); return d.toISOString();
};

export const EVENTS: CommunityEvent[] = [
  {
    id: 'e-nhsf-mcr-garba', title: 'Navratri Garba Night', type: 'NHSF',
    host: 'NHSF Manchester', venue: 'Whitworth Hall, University of Manchester',
    city: 'Manchester', date: inDays(2, 19, 30), distanceKm: 1.2, free: false, price: 8, attendees: 184,
    description: 'Live dhol, garba and dandiya raas — open to all students. Traditional dress encouraged. Aarti at 8pm.',
    lat: 53.4670, lng: -2.2330, emoji: '💃',
    image: img('1574023288056-bb1f1bea0d4f', 1),
  },
  {
    id: 'e-neasden-aarti', title: 'Sandhya Aarti', type: 'Mandir Aarti',
    host: 'BAPS Shri Swaminarayan Mandir', venue: 'Neasden Temple, London',
    city: 'London', date: inDays(0, 18, 30), distanceKm: 4.7, free: true, attendees: 320,
    description: 'Daily evening aarti followed by prasad. All welcome, including first-time visitors.',
    lat: 51.5547, lng: -0.2647, emoji: '🪔',
    image: img('1582553081398-7d1bb1f93a9c', 2),
  },
  {
    id: 'e-gita-circle', title: 'Bhagavad Gita Study Circle — Chapter 12', type: 'Study circle',
    host: 'NHSF UCL', venue: 'UCL Bloomsbury Campus, Room G14',
    city: 'London', date: inDays(3, 18, 0), distanceKm: 2.1, free: true, attendees: 32,
    description: 'Weekly student-led discussion on the Bhakti Yoga chapter. Bring your own translation or use ours.',
    lat: 51.5246, lng: -0.1340, emoji: '📖',
    image: img('1532012197267-da84d127e765', 3),
  },
  {
    id: 'e-diwali-ball', title: 'NHSF National Diwali Ball', type: 'Festival',
    host: 'NHSF National', venue: 'The Brewery, London',
    city: 'London', date: inDays(14, 19, 0), distanceKm: 5.8, free: false, price: 65, attendees: 420,
    description: 'The flagship NHSF Diwali black-tie event. Three-course Indian fine dining, performances, after-party.',
    lat: 51.5215, lng: -0.0961, emoji: '🪅',
    image: img('1604608672516-f1d2f49bc31a', 4),
  },
  {
    id: 'e-leics-langar', title: 'Annakut Seva — Food Distribution', type: 'Seva',
    host: 'Shree Sanatan Mandir Leicester', venue: 'Sanatan Mandir, Weymouth Street',
    city: 'Leicester', date: inDays(5, 11, 0), distanceKm: 0.8, free: true, attendees: 60,
    description: 'Help prepare and distribute prasad to the local community. No experience needed — just willing hands.',
    lat: 52.6443, lng: -1.1242, emoji: '🍛',
    image: img('1505253716362-afaea1d3d1af', 5),
  },
  {
    id: 'e-bham-cricket', title: 'NHSF Inter-Uni Cricket Tournament', type: 'NHSF',
    host: 'NHSF Birmingham', venue: 'Edgbaston Indoor Cricket Centre',
    city: 'Birmingham', date: inDays(7, 10, 0), distanceKm: 3.4, free: false, price: 5, attendees: 96,
    description: '12 Hindu societies, one trophy. Sign up as a team or join one on the day.',
    lat: 52.4555, lng: -1.9047, emoji: '🏏',
    image: img('1531415074968-036ba1b575da', 6),
  },
  {
    id: 'e-bhajan-night', title: 'Bhajan & Kirtan Night', type: 'Social',
    host: 'Bhaktivedanta Manor', venue: 'Bhaktivedanta Manor, Watford',
    city: 'Watford', date: inDays(4, 19, 30), distanceKm: 18.0, free: true, attendees: 145,
    description: 'Acoustic kirtan led by visiting devotees. Vegetarian feast served afterward.',
    lat: 51.6736, lng: -0.4128, emoji: '🎵',
    image: img('1543349689-9a4d426bee8e', 7),
  },
  {
    id: 'e-warwick-holi', title: 'Holi on the Piazza', type: 'Festival',
    host: 'NHSF Warwick', venue: 'University of Warwick Piazza',
    city: 'Coventry', date: inDays(21, 12, 0), distanceKm: 22.5, free: true, attendees: 510,
    description: 'Free colours, free bhang lassi, free food. Wear white — leave colourful.',
    lat: 52.3793, lng: -1.5615, emoji: '🌈',
    image: img('1521120098171-d4cd1a6b35e2', 8),
  },
];

export const EVENT_TYPES: EventType[] = ['Mandir Aarti', 'NHSF', 'Festival', 'Study circle', 'Seva', 'Social'];
