export type FaithId = 'christianity' | 'islam' | 'hinduism' | 'sikhism' | 'judaism' | 'buddhism';

export interface Faith {
  id: FaithId;
  name: string;
  symbol: string;
  scriptureName: string;
  denominations: string[];
  greeting: string;
}

export const FAITHS: Faith[] = [
  { id: 'christianity', name: 'Christianity', symbol: '✝', scriptureName: 'The Holy Bible',
    denominations: ['Catholic', 'Protestant', 'Orthodox', 'Anglican', 'Other'],
    greeting: 'Peace be with you' },
  { id: 'islam', name: 'Islam', symbol: '☾', scriptureName: 'The Holy Qur\'an',
    denominations: ['Sunni', 'Shia', 'Sufi', 'Other'],
    greeting: 'As-salamu alaykum' },
  { id: 'hinduism', name: 'Hinduism', symbol: 'ॐ', scriptureName: 'Bhagavad Gita',
    denominations: ['Vaishnavism', 'Shaivism', 'Shaktism', 'Smartism', 'Other'],
    greeting: 'Namaste' },
  { id: 'sikhism', name: 'Sikhism', symbol: '☬', scriptureName: 'Guru Granth Sahib',
    denominations: ['Khalsa', 'Sahajdhari', 'Other'],
    greeting: 'Sat Sri Akaal' },
  { id: 'judaism', name: 'Judaism', symbol: '✡', scriptureName: 'The Torah',
    denominations: ['Orthodox', 'Conservative', 'Reform', 'Reconstructionist', 'Other'],
    greeting: 'Shalom' },
  { id: 'buddhism', name: 'Buddhism', symbol: '☸', scriptureName: 'The Dhammapada',
    denominations: ['Theravāda', 'Mahāyāna', 'Vajrayāna', 'Zen', 'Other'],
    greeting: 'May you be at peace' },
];

export const INTERESTS = [
  'Scripture study', 'Daily prayer', 'Fasting', 'Festivals',
  'Community events', 'Learning', 'Meditation', 'Volunteering',
];

export const CITIES = [
  'London, UK', 'Manchester, UK', 'Birmingham, UK', 'Edinburgh, UK',
  'New York, USA', 'Toronto, CA', 'Mumbai, IN', 'Dubai, UAE',
  'Sydney, AU', 'Singapore, SG',
];
