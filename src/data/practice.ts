// Hindu daily practice windows + upcoming fasts/festivals + Panchang (mocked).

export interface PracticeWindow {
  id: string;
  label: string;
  time: string;   // HH:MM
  kind: 'sandhya' | 'aarti' | 'meditation';
}

export const DAILY_PRACTICE: PracticeWindow[] = [
  { id: 'pratah', label: 'Pratah Sandhya', time: '06:00', kind: 'sandhya' },
  { id: 'morning-aarti', label: 'Morning Aarti', time: '07:30', kind: 'aarti' },
  { id: 'madhyahna', label: 'Madhyahna Sandhya', time: '12:00', kind: 'sandhya' },
  { id: 'meditation', label: 'Evening Meditation', time: '17:30', kind: 'meditation' },
  { id: 'sayam', label: 'Sandhya Aarti', time: '18:30', kind: 'aarti' },
];

export interface UpcomingObservance {
  id: string;
  name: string;
  kind: 'Ekadashi' | 'Festival' | 'Pradosh' | 'Purnima' | 'Amavasya';
  date: string;          // ISO
  description: string;
  emoji: string;
}

const inDays = (n: number, h = 6) => {
  const d = new Date(); d.setDate(d.getDate() + n); d.setHours(h, 0, 0, 0); return d.toISOString();
};

export const OBSERVANCES: UpcomingObservance[] = [
  { id: 'o-ekadashi', name: 'Papankusha Ekadashi', kind: 'Ekadashi', date: inDays(3),
    description: 'A fast day for spiritual purification. Devotees observe nirjala or phalahari vrat.', emoji: '🌙' },
  { id: 'o-navratri', name: 'Sharad Navratri begins', kind: 'Festival', date: inDays(11),
    description: 'Nine nights of devotion to the Divine Mother. Garba, fasting and aarti.', emoji: '🪔' },
  { id: 'o-purnima', name: 'Sharad Purnima', kind: 'Purnima', date: inDays(20),
    description: 'The full moon of the harvest season. Kheer is offered to the moon overnight.', emoji: '🌕' },
  { id: 'o-diwali', name: 'Diwali — Lakshmi Puja', kind: 'Festival', date: inDays(31),
    description: 'The festival of lights, honouring Goddess Lakshmi and the return of Sri Rama.', emoji: '🎆' },
];

// Mocked Panchang for today
export const PANCHANG = {
  tithi: 'Shukla Saptami',
  paksha: 'Shukla',
  nakshatra: 'Anuradha',
  yoga: 'Saubhagya',
  samvat: 'Vikram Samvat 2082',
};

export interface UserFast { id: string; date: string; type: string; intention: string; }
