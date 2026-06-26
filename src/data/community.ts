// UK Hindu community events — Mandir, NHSF, university socials.
// Instagram-style social feed: events have likes, comments, multi-image carousels.

export type EventType = 'Mandir Aarti' | 'NHSF' | 'Festival' | 'Study circle' | 'Seva' | 'Social';

export interface Comment {
  id: string;
  author: string;
  avatar: string;
  text: string;
  ago: string;
}

export interface CommunityEvent {
  id: string;
  title: string;
  type: EventType;
  host: string;
  hostHandle?: string;       // @handle for Instagram feel
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
  images: string[];          // carousel
  emoji: string;
  likes: number;
  comments: Comment[];
}

const flickr = (kw: string, seed: number, w = 1080, h = 1080) =>
  `https://loremflickr.com/${w}/${h}/${encodeURIComponent(kw)}?lock=${seed}`;
const avatar = (kw: string, seed: number) =>
  `https://loremflickr.com/200/200/${encodeURIComponent(kw)}?lock=${seed}`;

const inDays = (n: number, h = 19, m = 0) => {
  const d = new Date(); d.setDate(d.getDate() + n); d.setHours(h, m, 0, 0); return d.toISOString();
};

const c = (id: string, author: string, ag: string, txt: string, seed: number): Comment => ({
  id, author, ago: ag, text: txt, avatar: avatar('portrait,indian', seed),
});

export const EVENTS: CommunityEvent[] = [
  {
    id: 'e-nhsf-mcr-garba', title: 'Navratri Garba Night', type: 'NHSF',
    host: 'NHSF Manchester', hostHandle: '@nhsf_manchester', hostAvatar: avatar('logo,indian', 101),
    venue: 'Whitworth Hall, University of Manchester',
    city: 'Manchester', date: inDays(2, 19, 30), distanceKm: 1.2, free: false, price: 8, attendees: 184,
    description: 'Live dhol, garba and dandiya raas — open to all students. Traditional dress encouraged. Aarti at 8pm.',
    lat: 53.4670, lng: -2.2330, emoji: '💃', likes: 412,
    images: [flickr('garba', 11), flickr('dandiya', 211), flickr('chaniyacholi', 311)],
    comments: [
      c('c1', 'priya_patel', '2h', 'Just bought my ticket! Anyone driving from Fallowfield?', 1001),
      c('c2', 'nhsf_warwick', '4h', 'Wish we could come down 🙏 have a great one', 1002),
      c('c3', 'rahul.s', '6h', 'Will there be food stalls?', 1003),
    ],
  },
  {
    id: 'e-neasden-aarti', title: 'Sandhya Aarti', type: 'Mandir Aarti',
    host: 'BAPS Shri Swaminarayan Mandir', hostHandle: '@bapsneasden', hostAvatar: avatar('temple,hindu', 102),
    venue: 'Neasden Temple, London',
    city: 'London', date: inDays(0, 18, 30), distanceKm: 4.7, free: true, attendees: 320,
    description: 'Daily evening aarti followed by prasad. All welcome, including first-time visitors. 🪔',
    lat: 51.5547, lng: -0.2647, emoji: '🪔', likes: 1284,
    images: [flickr('aarti', 12), flickr('mandir', 212), flickr('diya', 312)],
    comments: [
      c('c1', 'meera_uk', '1h', 'My weekly anchor 🙏', 1004),
      c('c2', 'aarav.g', '3h', 'First time visitor today, was beautiful', 1005),
    ],
  },
  {
    id: 'e-gita-circle', title: 'Bhagavad Gita Study Circle — Chapter 12', type: 'Study circle',
    host: 'NHSF UCL', hostHandle: '@nhsf_ucl', hostAvatar: avatar('book,gita', 103),
    venue: 'UCL Bloomsbury Campus, Room G14',
    city: 'London', date: inDays(3, 18, 0), distanceKm: 2.1, free: true, attendees: 32,
    description: 'Weekly student-led discussion on the Bhakti Yoga chapter. Bring your own translation or use ours.',
    lat: 51.5246, lng: -0.1340, emoji: '📖', likes: 87,
    images: [flickr('bhagavadgita', 13), flickr('sanskrit', 213)],
    comments: [c('c1', 'shreya_v', '2d', 'Loved last week\'s session — Krishna\'s 36 qualities of a devotee 🤍', 1006)],
  },
  {
    id: 'e-diwali-ball', title: 'NHSF National Diwali Ball', type: 'Festival',
    host: 'NHSF National', hostHandle: '@nhsfuk', hostAvatar: avatar('diwali,lights', 104),
    venue: 'The Brewery, London',
    city: 'London', date: inDays(14, 19, 0), distanceKm: 5.8, free: false, price: 65, attendees: 420,
    description: 'The flagship NHSF Diwali black-tie event. Three-course Indian fine dining, performances, after-party. 🪅',
    lat: 51.5215, lng: -0.0961, emoji: '🪅', likes: 2103,
    images: [flickr('diwali', 14), flickr('lehenga', 214), flickr('rangoli', 314), flickr('fireworks', 414)],
    comments: [
      c('c1', 'tanvi_k', '5h', 'Tickets going FAST 🔥', 1007),
      c('c2', 'arjun.p', '6h', 'Hosting a table from Bristol — DM if joining!', 1008),
      c('c3', 'nhsf_kcl', '8h', 'KCL squad ready 🪔', 1009),
    ],
  },
  {
    id: 'e-leics-langar', title: 'Annakut Seva — Food Distribution', type: 'Seva',
    host: 'Shree Sanatan Mandir Leicester', hostHandle: '@sanatan_leics', hostAvatar: avatar('temple,india', 105),
    venue: 'Sanatan Mandir, Weymouth Street',
    city: 'Leicester', date: inDays(5, 11, 0), distanceKm: 0.8, free: true, attendees: 60,
    description: 'Help prepare and distribute prasad to the local community. No experience needed — just willing hands.',
    lat: 52.6443, lng: -1.1242, emoji: '🍛', likes: 156,
    images: [flickr('thali', 15), flickr('seva', 215), flickr('langar', 315)],
    comments: [c('c1', 'kavya_l', '1d', 'Brought my whole flat last time, such a beautiful day 💛', 1010)],
  },
  {
    id: 'e-bham-cricket', title: 'NHSF Inter-Uni Cricket Tournament', type: 'NHSF',
    host: 'NHSF Birmingham', hostHandle: '@nhsf_bham', hostAvatar: avatar('cricket,sport', 106),
    venue: 'Edgbaston Indoor Cricket Centre',
    city: 'Birmingham', date: inDays(7, 10, 0), distanceKm: 3.4, free: false, price: 5, attendees: 96,
    description: '12 Hindu societies, one trophy. Sign up as a team or join one on the day. 🏏',
    lat: 52.4555, lng: -1.9047, emoji: '🏏', likes: 234,
    images: [flickr('cricket', 16), flickr('edgbaston', 216)],
    comments: [c('c1', 'dev_b', '12h', 'Defending champs 🏆 NHSF Leicester see you there', 1011)],
  },
  {
    id: 'e-bhajan-night', title: 'Bhajan & Kirtan Night', type: 'Social',
    host: 'Bhaktivedanta Manor', hostHandle: '@iskcon_manor', hostAvatar: avatar('krishna,iskcon', 107),
    venue: 'Bhaktivedanta Manor, Watford',
    city: 'Watford', date: inDays(4, 19, 30), distanceKm: 18.0, free: true, attendees: 145,
    description: 'Acoustic kirtan led by visiting devotees. Vegetarian feast served afterward. 🎵',
    lat: 51.6736, lng: -0.4128, emoji: '🎵', likes: 489,
    images: [flickr('harmonium', 17), flickr('kirtan', 217), flickr('krishna', 317)],
    comments: [c('c1', 'radhe_r', '3h', 'Goosebumps every single time 🙏', 1012)],
  },
  {
    id: 'e-warwick-holi', title: 'Holi on the Piazza', type: 'Festival',
    host: 'NHSF Warwick', hostHandle: '@nhsf_warwick', hostAvatar: avatar('holi,colors', 108),
    venue: 'University of Warwick Piazza',
    city: 'Coventry', date: inDays(21, 12, 0), distanceKm: 22.5, free: true, attendees: 510,
    description: 'Free colours, free bhang lassi, free food. Wear white — leave colourful. 🌈',
    lat: 52.3793, lng: -1.5615, emoji: '🌈', likes: 1872,
    images: [flickr('holi', 18), flickr('colors', 218), flickr('rainbow', 318), flickr('festival', 418)],
    comments: [
      c('c1', 'maya_w', '1d', 'Last year was UNREAL — bringing 20 friends this time', 1013),
      c('c2', 'shivam.t', '2d', 'Are non-students welcome?', 1014),
    ],
  },
  {
    id: 'e-leeds-yoga', title: 'Sunrise Yoga & Surya Namaskar', type: 'Social',
    host: 'NHSF Leeds', hostHandle: '@nhsf_leeds', hostAvatar: avatar('yoga,sun', 109),
    venue: 'Hyde Park, Leeds',
    city: 'Leeds', date: inDays(1, 7, 0), distanceKm: 2.8, free: true, attendees: 48,
    description: '108 Surya Namaskars at sunrise. Mats provided. Followed by chai and breakfast. 🧘',
    lat: 53.8167, lng: -1.5667, emoji: '🧘', likes: 192,
    images: [flickr('yoga', 19), flickr('sunrise', 219)],
    comments: [c('c1', 'ananya_l', '4h', 'Setting 3 alarms 😅', 1015)],
  },
  {
    id: 'e-edin-shivratri', title: 'Maha Shivratri Night Vigil', type: 'Festival',
    host: 'Edinburgh Hindu Mandir', hostHandle: '@edin_hindu', hostAvatar: avatar('shiva,lingam', 110),
    venue: 'Edinburgh Hindu Mandir, St Andrew Place',
    city: 'Edinburgh', date: inDays(11, 18, 0), distanceKm: 305, free: true, attendees: 210,
    description: 'All-night bhajans, four-phase abhishekam to Shivlinga, prasad through the night. 🕉️',
    lat: 55.9533, lng: -3.1883, emoji: '🕉️', likes: 521,
    images: [flickr('shivlinga', 20), flickr('shiva', 220), flickr('nataraja', 320)],
    comments: [c('c1', 'tanish_e', '3d', 'Om Namah Shivaya 🙏', 1016)],
  },
  // --- additional events ---
  {
    id: 'e-bristol-pooja', title: 'Karwa Chauth Pooja & Mehendi', type: 'Festival',
    host: 'Bristol Hindu Temple', hostHandle: '@bristol_mandir', hostAvatar: avatar('mehendi,hands', 111),
    venue: 'Bristol Hindu Temple, Fishponds',
    city: 'Bristol', date: inDays(8, 17, 30), distanceKm: 6.3, free: true, attendees: 78,
    description: 'Mehendi artists, traditional sargi prep tips, group katha and moon-sighting. Open to all.',
    lat: 51.4831, lng: -2.5238, emoji: '🌙', likes: 312,
    images: [flickr('mehendi', 21), flickr('henna', 221), flickr('moon', 321)],
    comments: [c('c1', 'priya.j', '5h', 'My first Karwa Chauth in the UK — so happy this exists 🥹', 1017)],
  },
  {
    id: 'e-cambridge-debate', title: 'Inter-Uni Vedanta Debate', type: 'Study circle',
    host: 'NHSF Cambridge', hostHandle: '@nhsf_cam', hostAvatar: avatar('debate,book', 112),
    venue: 'Pembroke College, Old Library',
    city: 'Cambridge', date: inDays(9, 18, 0), distanceKm: 80, free: true, attendees: 54,
    description: 'Advaita vs. Dvaita vs. Vishishtadvaita — three captains, one motion. Tea served.',
    lat: 52.2017, lng: 0.1190, emoji: '⚖️', likes: 98,
    images: [flickr('library', 22), flickr('debate', 222)],
    comments: [c('c1', 'aryan.c', '1d', 'My money\'s on Vishishtadvaita 🐍🪷', 1018)],
  },
  {
    id: 'e-kcl-diwali-mela', title: 'KCL Diwali Mela', type: 'Festival',
    host: 'NHSF KCL', hostHandle: '@nhsf_kcl', hostAvatar: avatar('diwali,mela', 113),
    venue: 'KCL Strand Quad',
    city: 'London', date: inDays(13, 16, 0), distanceKm: 3.1, free: true, attendees: 680,
    description: 'Food stalls, dhol procession, rangoli competition and headline Bollywood DJ set at 8pm.',
    lat: 51.5118, lng: -0.1162, emoji: '🪔', likes: 1456,
    images: [flickr('mela', 23), flickr('rangoli', 223), flickr('bollywood', 323), flickr('dhol', 423)],
    comments: [
      c('c1', 'sara_k', '6h', 'Rangoli comp prize is £100 voucher 👀', 1019),
      c('c2', 'jay.m', '8h', 'Bringing the whole flat', 1020),
    ],
  },
  {
    id: 'e-not-jagran', title: 'Jagran — All Night Devi Bhajans', type: 'Festival',
    host: 'Shree Geeta Bhawan Nottingham', hostHandle: '@geeta_nottm', hostAvatar: avatar('devi,bhajan', 114),
    venue: 'Geeta Bhawan, Carlton Road',
    city: 'Nottingham', date: inDays(6, 21, 0), distanceKm: 1.5, free: true, attendees: 220,
    description: 'Live bhajan mandali through the night. Chai, prasad and seating throughout.',
    lat: 52.9586, lng: -1.1668, emoji: '🪕', likes: 367,
    images: [flickr('bhajan', 24), flickr('devi', 224), flickr('temple', 324)],
    comments: [c('c1', 'rishi_n', '2d', 'Jai Mata Di 🌺', 1021)],
  },
  {
    id: 'e-glasgow-trek', title: 'Sangat Hike — Loch Lomond', type: 'Social',
    host: 'Hindu Mandir Glasgow', hostHandle: '@glasgow_hindu', hostAvatar: avatar('hiking,mountains', 115),
    venue: 'Conic Hill, Loch Lomond',
    city: 'Glasgow', date: inDays(10, 9, 0), distanceKm: 38, free: false, price: 12, attendees: 42,
    description: 'Easy 4-hour ridge walk + langar at the top. Coach from the Mandir at 8am.',
    lat: 56.0700, lng: -4.5800, emoji: '⛰️', likes: 178,
    images: [flickr('loch', 25), flickr('hiking', 225), flickr('scotland', 325)],
    comments: [c('c1', 'neha_g', '4h', 'Boots out 🥾', 1022)],
  },
  {
    id: 'e-cardiff-cookoff', title: 'NHSF Cardiff Cook-off: Best Bhel', type: 'Social',
    host: 'NHSF Cardiff', hostHandle: '@nhsf_cardiff', hostAvatar: avatar('chaat,bhel', 116),
    venue: 'SU Kitchens, Cardiff Uni',
    city: 'Cardiff', date: inDays(12, 18, 0), distanceKm: 2.0, free: false, price: 3, attendees: 64,
    description: '6 teams, 30 minutes, one bowl of bhel puri. Tasting and live judging by Aunty panel.',
    lat: 51.4870, lng: -3.1810, emoji: '🥘', likes: 224,
    images: [flickr('bhelpuri', 26), flickr('streetfood', 226), flickr('chaat', 326)],
    comments: [c('c1', 'tejas_c', '1d', 'My nani is in the judging panel, this is rigged 😂', 1023)],
  },
  {
    id: 'e-oxford-ramayana', title: 'Ramayana Recital — Sundarakanda', type: 'Mandir Aarti',
    host: 'Oxford Hindu Centre', hostHandle: '@oxford_hindu', hostAvatar: avatar('rama,hanuman', 117),
    venue: 'Oxford Hindu Centre, Cowley Road',
    city: 'Oxford', date: inDays(15, 18, 30), distanceKm: 55, free: true, attendees: 88,
    description: 'Complete parayanam of the Sundarakanda — Hanuman\'s leap, the meeting with Sita, the burning of Lanka.',
    lat: 51.7437, lng: -1.2167, emoji: '🐒', likes: 142,
    images: [flickr('hanuman', 27), flickr('ramayana', 227)],
    comments: [c('c1', 'sita.o', '1d', 'Jai Shri Ram 🏹', 1024)],
  },
];

export const EVENT_TYPES: EventType[] = ['Mandir Aarti', 'NHSF', 'Festival', 'Study circle', 'Seva', 'Social'];

export const findEvent = (id: string) => EVENTS.find(e => e.id === id);
