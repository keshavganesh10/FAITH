// Ad-free Sloka/Bhajan/Mantra/Aarti library.

export type AudioCategory = 'Morning Slokas' | 'Bhajans' | 'Meditation Mantras' | 'Aarti';

export interface Track {
  id: string;
  title: string;
  artist: string;
  category: AudioCategory;
  durationSec: number;
  cover: string;        // gradient hue or url
  hue: number;
  description?: string;
}

export const TRACKS: Track[] = [
  { id: 't-vishnu', title: 'Vishnu Sahasranamam', artist: 'M.S. Subbulakshmi', category: 'Morning Slokas',
    durationSec: 30 * 60 + 12, hue: 28, cover: 'gradient',
    description: 'The 1000 names of Vishnu, recited by the Nightingale of South India.' },
  { id: 't-suprabhatam', title: 'Venkateswara Suprabhatam', artist: 'M.S. Subbulakshmi', category: 'Morning Slokas',
    durationSec: 28 * 60 + 40, hue: 38, cover: 'gradient',
    description: 'The traditional dawn awakening of Lord Venkateswara at Tirumala.' },
  { id: 't-hanuman', title: 'Hanuman Chalisa', artist: 'Hariharan', category: 'Bhajans',
    durationSec: 10 * 60 + 14, hue: 12, cover: 'gradient',
    description: 'Tulsidas\'s 40 verses in praise of Hanuman.' },
  { id: 't-omjaya', title: 'Om Jai Jagdish Hare', artist: 'Anuradha Paudwal', category: 'Aarti',
    durationSec: 6 * 60 + 32, hue: 45, cover: 'gradient',
    description: 'The universal evening aarti, sung in homes across the diaspora.' },
  { id: 't-gayatri-mala', title: 'Gayatri Mantra — 108 times', artist: 'Pandit Jasraj', category: 'Meditation Mantras',
    durationSec: 22 * 60, hue: 200, cover: 'gradient',
    description: 'For sunrise sadhana. Single track, slow build, no interruptions.' },
  { id: 't-mahamrityunjaya', title: 'Maha Mrityunjaya Mantra', artist: 'Various Pandits', category: 'Meditation Mantras',
    durationSec: 18 * 60 + 30, hue: 270, cover: 'gradient',
    description: 'For healing and protection. 108 repetitions, vedic recitation.' },
  { id: 't-radhekrishna', title: 'Radhe Radhe Govinda', artist: 'Krishna Das', category: 'Bhajans',
    durationSec: 14 * 60 + 8, hue: 320, cover: 'gradient',
    description: 'Call-and-response kirtan, harmonium and tabla.' },
  { id: 't-shiva-tandava', title: 'Shiva Tandava Stotram', artist: 'Uma Mohan', category: 'Morning Slokas',
    durationSec: 9 * 60 + 47, hue: 215, cover: 'gradient',
    description: 'Ravana\'s thundering hymn to Lord Shiva.' },
  { id: 't-aarti-ganesh', title: 'Sukhakarta Dukhaharta', artist: 'Lata Mangeshkar', category: 'Aarti',
    durationSec: 4 * 60 + 12, hue: 18, cover: 'gradient',
    description: 'The beloved Marathi aarti to Lord Ganesha.' },
  { id: 't-om-meditation', title: 'Om — 30 minute meditation', artist: 'Art of Living', category: 'Meditation Mantras',
    durationSec: 30 * 60, hue: 195, cover: 'gradient',
    description: 'Continuous Om chant for deep meditation.' },
];

export const AUDIO_CATEGORIES: AudioCategory[] = ['Morning Slokas', 'Bhajans', 'Meditation Mantras', 'Aarti'];

export const formatTime = (s: number) => {
  const m = Math.floor(s / 60); const ss = Math.floor(s % 60);
  return `${m}:${ss.toString().padStart(2, '0')}`;
};
