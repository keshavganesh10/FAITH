import type { FaithId } from './faiths';

export type EventType = 'worship' | 'study' | 'festival' | 'volunteering';

export interface CommunityEvent {
  id: string;
  faith: FaithId | 'all';
  type: EventType;
  title: string;
  host: string;
  venue: string;
  date: string;       // ISO
  distanceKm: number;
  description: string;
}

const inDays = (n: number) => {
  const d = new Date(); d.setDate(d.getDate() + n); d.setHours(18, 30, 0, 0);
  return d.toISOString();
};

export const EVENTS: CommunityEvent[] = [
  { id: 'e1', faith: 'hinduism', type: 'festival', title: 'Diwali Lights & Aarti',
    host: 'Shree Krishna Mandir', venue: '14 Temple Lane', date: inDays(3), distanceKm: 1.2,
    description: 'A community celebration of light with shared aarti, sweets and music for all ages.' },
  { id: 'e2', faith: 'christianity', type: 'worship', title: 'Sunday Morning Service',
    host: 'St. Andrew\'s Church', venue: 'High Street', date: inDays(2), distanceKm: 0.6,
    description: 'Traditional service with hymns, scripture and a sermon on hope.' },
  { id: 'e3', faith: 'islam', type: 'study', title: 'Tafsir Circle: Surah Al-Mulk',
    host: 'Central Mosque', venue: 'Park Road', date: inDays(4), distanceKm: 2.1,
    description: 'A guided weekly study of the Qur\'an. Tea served afterwards.' },
  { id: 'e4', faith: 'sikhism', type: 'volunteering', title: 'Langar Kitchen Volunteers',
    host: 'Gurdwara Sahib', venue: '22 Maple Avenue', date: inDays(1), distanceKm: 3.5,
    description: 'Help prepare and serve langar for the local community. Open to everyone.' },
  { id: 'e5', faith: 'buddhism', type: 'study', title: 'Mindful Meditation Sit',
    host: 'Lotus Sangha', venue: 'Riverside Hall', date: inDays(5), distanceKm: 4.0,
    description: 'A 45-minute guided sit followed by a Dhamma talk and tea.' },
  { id: 'e6', faith: 'judaism', type: 'worship', title: 'Friday Shabbat Service',
    host: 'Beth Shalom Synagogue', venue: 'Oak Street', date: inDays(5), distanceKm: 1.8,
    description: 'Welcome the Shabbat with song, prayer and a kiddush gathering.' },
  { id: 'e7', faith: 'all', type: 'festival', title: 'Interfaith Harvest Gathering',
    host: 'Civic Centre', venue: 'Town Square', date: inDays(7), distanceKm: 0.9,
    description: 'A shared meal and reflections from leaders of every tradition.' },
  { id: 'e8', faith: 'hinduism', type: 'study', title: 'Gita Reading Circle',
    host: 'Vedanta Society', venue: 'Cedar Hall', date: inDays(6), distanceKm: 2.7,
    description: 'Verse-by-verse reading and discussion of Chapter 2.' },
];
