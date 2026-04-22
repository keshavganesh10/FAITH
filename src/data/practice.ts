import type { FaithId } from './faiths';

export interface PracticeWindow {
  id: string;
  label: string;
  time: string;     // "HH:MM"
  kind: 'prayer' | 'fast' | 'meditation';
}

export const DAILY_PRACTICE: Record<FaithId, PracticeWindow[]> = {
  islam: [
    { id: 'fajr', label: 'Fajr',    time: '05:12', kind: 'prayer' },
    { id: 'dhuhr', label: 'Dhuhr',  time: '13:04', kind: 'prayer' },
    { id: 'asr', label: 'Asr',      time: '16:21', kind: 'prayer' },
    { id: 'maghrib', label: 'Maghrib', time: '18:48', kind: 'prayer' },
    { id: 'isha', label: 'Isha',    time: '20:15', kind: 'prayer' },
  ],
  christianity: [
    { id: 'morning', label: 'Morning Prayer', time: '07:00', kind: 'prayer' },
    { id: 'midday', label: 'Midday Reflection', time: '12:30', kind: 'prayer' },
    { id: 'evening', label: 'Evening Prayer', time: '18:00', kind: 'prayer' },
  ],
  hinduism: [
    { id: 'pratah', label: 'Pratah Sandhya', time: '06:00', kind: 'prayer' },
    { id: 'madhyahna', label: 'Madhyahna', time: '12:00', kind: 'prayer' },
    { id: 'sayam', label: 'Sayam Sandhya', time: '18:30', kind: 'prayer' },
  ],
  sikhism: [
    { id: 'amrit', label: 'Amrit Vela (Japji)', time: '04:30', kind: 'prayer' },
    { id: 'rehras', label: 'Rehras Sahib', time: '18:00', kind: 'prayer' },
    { id: 'kirtan', label: 'Kirtan Sohila', time: '21:30', kind: 'prayer' },
  ],
  judaism: [
    { id: 'shacharit', label: 'Shacharit', time: '07:00', kind: 'prayer' },
    { id: 'mincha', label: 'Mincha', time: '14:00', kind: 'prayer' },
    { id: 'maariv', label: 'Maariv', time: '19:00', kind: 'prayer' },
  ],
  buddhism: [
    { id: 'morning-sit', label: 'Morning Meditation', time: '06:30', kind: 'meditation' },
    { id: 'evening-sit', label: 'Evening Meditation', time: '19:30', kind: 'meditation' },
  ],
};

export interface UserFast {
  id: string;
  date: string;     // ISO date
  type: string;
  intention: string;
}
