import type { FaithId } from './faiths';

export interface Account {
  handle: string;          // includes leading @
  name: string;            // display name
  avatar: string;          // image url
  bio: string;
  faith: FaithId | 'all';
  city: string;
  followers: number;
  verified?: boolean;
  // for map
  lat: number;
  lng: number;
}

// Real, royalty-free imagery (Unsplash). Hand-picked for tone.
export const ACCOUNTS: Record<string, Account> = {
  '@krishnamandir': {
    handle: '@krishnamandir', name: 'Shree Krishna Mandir',
    avatar: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=200&h=200&fit=crop',
    bio: 'A home for prayer, music and seva. Open daily 6am–9pm. 🪔',
    faith: 'hinduism', city: 'Leicester', followers: 4820, verified: true,
    lat: 52.6369, lng: -1.1398,
  },
  '@standrews': {
    handle: '@standrews', name: "St. Andrew's Church",
    avatar: 'https://images.unsplash.com/photo-1438032005730-c779502df39b?w=200&h=200&fit=crop',
    bio: 'A welcoming Anglican parish. Sunday service 10am. ✝',
    faith: 'christianity', city: 'York', followers: 2310, verified: true,
    lat: 53.9590, lng: -1.0815,
  },
  '@centralmasjid': {
    handle: '@centralmasjid', name: 'Central Mosque',
    avatar: 'https://images.unsplash.com/photo-1542816417-0983c9c9ad53?w=200&h=200&fit=crop',
    bio: 'Five daily prayers · Tafsir circles · Community iftars 🌙',
    faith: 'islam', city: 'Bradford', followers: 6740, verified: true,
    lat: 53.7960, lng: -1.7594,
  },
  '@gurdwarasahib': {
    handle: '@gurdwarasahib', name: 'Gurdwara Sahib',
    avatar: 'https://images.unsplash.com/photo-1609938733512-bb70bc77c8c5?w=200&h=200&fit=crop',
    bio: 'Ek Onkar. Langar served 11am–8pm, every day, all welcome. 🍲',
    faith: 'sikhism', city: 'Wolverhampton', followers: 3920,
    lat: 52.5862, lng: -2.1288,
  },
  '@lotussangha': {
    handle: '@lotussangha', name: 'Lotus Sangha',
    avatar: 'https://images.unsplash.com/photo-1545389336-cf090694435e?w=200&h=200&fit=crop',
    bio: 'A friendly meditation community. Sit. Smile. Breathe. ☸',
    faith: 'buddhism', city: 'Bristol', followers: 1840,
    lat: 51.4545, lng: -2.5879,
  },
  '@bethshalom': {
    handle: '@bethshalom', name: 'Beth Shalom Synagogue',
    avatar: 'https://images.unsplash.com/photo-1591128846807-1f9f87b73f80?w=200&h=200&fit=crop',
    bio: 'Friday Shabbat 7pm · Saturday morning study 10am. ✡',
    faith: 'judaism', city: 'Manchester', followers: 1520, verified: true,
    lat: 53.4808, lng: -2.2426,
  },
  '@civic': {
    handle: '@civic', name: 'Interfaith Civic',
    avatar: 'https://images.unsplash.com/photo-1529390079861-591de354faf5?w=200&h=200&fit=crop',
    bio: 'Bringing every tradition to one table. 🌾',
    faith: 'all', city: 'Birmingham', followers: 8210, verified: true,
    lat: 52.4862, lng: -1.8904,
  },
  '@vedanta': {
    handle: '@vedanta', name: 'Vedanta Society',
    avatar: 'https://images.unsplash.com/photo-1604608672516-f1b9b1d2c1f4?w=200&h=200&fit=crop',
    bio: 'Weekly Gita reading · monthly satsang. ॐ',
    faith: 'hinduism', city: 'London', followers: 980,
    lat: 51.5074, lng: -0.1278,
  },
  // Personal accounts
  '@anika.r': {
    handle: '@anika.r', name: 'Anika Raghavan',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
    bio: 'Mum of two · diya enthusiast 🪔', faith: 'hinduism', city: 'Leicester', followers: 312,
    lat: 52.6369, lng: -1.1398,
  },
  '@yusuf.a': {
    handle: '@yusuf.a', name: 'Yusuf Ahmed',
    avatar: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=200&h=200&fit=crop',
    bio: 'Trying to learn Arabic, slowly.', faith: 'islam', city: 'Bradford', followers: 188,
    lat: 53.7960, lng: -1.7594,
  },
  '@harpreet.k': {
    handle: '@harpreet.k', name: 'Harpreet Kaur',
    avatar: 'https://images.unsplash.com/photo-1548142813-c348350df52b?w=200&h=200&fit=crop',
    bio: 'Sevadar at the local gurdwara.', faith: 'sikhism', city: 'Wolverhampton', followers: 421,
    lat: 52.5862, lng: -2.1288,
  },
  '@tara.l': {
    handle: '@tara.l', name: 'Tara Liang',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop',
    bio: 'Sit. Walk. Tea.', faith: 'buddhism', city: 'Bristol', followers: 254,
    lat: 51.4545, lng: -2.5879,
  },
  '@mary.j': {
    handle: '@mary.j', name: 'Mary Johnson',
    avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&h=200&fit=crop',
    bio: 'Choir, coffee, kindness.', faith: 'christianity', city: 'York', followers: 142,
    lat: 53.9590, lng: -1.0815,
  },
  '@dev.p': {
    handle: '@dev.p', name: 'Dev Patel',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop',
    bio: 'Tabla player.', faith: 'hinduism', city: 'Leicester', followers: 89,
    lat: 52.6369, lng: -1.1398,
  },
  '@layla.m': {
    handle: '@layla.m', name: 'Layla Mirza',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop',
    bio: 'Student of tafsir.', faith: 'islam', city: 'Bradford', followers: 203,
    lat: 53.7960, lng: -1.7594,
  },
  '@ravi.s': {
    handle: '@ravi.s', name: 'Ravi Sharma',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop',
    bio: 'Builder of bridges 🌉', faith: 'all', city: 'Birmingham', followers: 510,
    lat: 52.4862, lng: -1.8904,
  },
  '@sarah.b': {
    handle: '@sarah.b', name: 'Sarah Bennett',
    avatar: 'https://images.unsplash.com/photo-1502323777036-f29e3972d82f?w=200&h=200&fit=crop',
    bio: 'Volunteer at Civic.', faith: 'all', city: 'Birmingham', followers: 167,
    lat: 52.4862, lng: -1.8904,
  },
};

export const getAccount = (handle: string): Account | undefined => ACCOUNTS[handle];
