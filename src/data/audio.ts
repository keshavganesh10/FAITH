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

const cover = (kw: string, seed: number) =>
  `https://loremflickr.com/600/600/${kw}?lock=${seed}`;

export const TRACKS: Track[] = [
  { id: 't-vishnu', title: 'Vishnu Sahasranamam', artist: 'M.S. Subbulakshmi', category: 'Morning Slokas',
    durationSec: 30 * 60 + 12, hue: 28, cover: cover('vishnu,hindu,temple', 401),
    description: 'The 1000 names of Vishnu, recited by the Nightingale of South India.' },
  { id: 't-suprabhatam', title: 'Venkateswara Suprabhatam', artist: 'M.S. Subbulakshmi', category: 'Morning Slokas',
    durationSec: 28 * 60 + 40, hue: 38, cover: cover('tirupati,temple,sunrise', 402),
    description: 'The traditional dawn awakening of Lord Venkateswara at Tirumala.' },
  { id: 't-hanuman', title: 'Hanuman Chalisa', artist: 'Hariharan', category: 'Bhajans',
    durationSec: 10 * 60 + 14, hue: 12, cover: cover('hanuman,sindoor,statue', 403),
    description: 'Tulsidas\'s 40 verses in praise of Hanuman.' },
  { id: 't-omjaya', title: 'Om Jai Jagdish Hare', artist: 'Anuradha Paudwal', category: 'Aarti',
    durationSec: 6 * 60 + 32, hue: 45, cover: cover('aarti,diya,thali', 404),
    description: 'The universal evening aarti, sung in homes across the diaspora.' },
  { id: 't-gayatri-mala', title: 'Gayatri Mantra — 108 times', artist: 'Pandit Jasraj', category: 'Meditation Mantras',
    durationSec: 22 * 60, hue: 200, cover: cover('sunrise,meditation,sun', 405),
    description: 'For sunrise sadhana. Single track, slow build, no interruptions.' },
  { id: 't-mahamrityunjaya', title: 'Maha Mrityunjaya Mantra', artist: 'Various Pandits', category: 'Meditation Mantras',
    durationSec: 18 * 60 + 30, hue: 270, cover: cover('shiva,lingam,trident', 406),
    description: 'For healing and protection. 108 repetitions, vedic recitation.' },
  { id: 't-radhekrishna', title: 'Radhe Radhe Govinda', artist: 'Krishna Das', category: 'Bhajans',
    durationSec: 14 * 60 + 8, hue: 320, cover: cover('krishna,flute,peacock', 407),
    description: 'Call-and-response kirtan, harmonium and tabla.' },
  { id: 't-shiva-tandava', title: 'Shiva Tandava Stotram', artist: 'Uma Mohan', category: 'Morning Slokas',
    durationSec: 9 * 60 + 47, hue: 215, cover: cover('shiva,nataraja,dance', 408),
    description: 'Ravana\'s thundering hymn to Lord Shiva.' },
  { id: 't-aarti-ganesh', title: 'Sukhakarta Dukhaharta', artist: 'Lata Mangeshkar', category: 'Aarti',
    durationSec: 4 * 60 + 12, hue: 18, cover: cover('ganesha,statue,marigold', 409),
    description: 'The beloved Marathi aarti to Lord Ganesha.' },
  { id: 't-om-meditation', title: 'Om — 30 minute meditation', artist: 'Art of Living', category: 'Meditation Mantras',
    durationSec: 30 * 60, hue: 195, cover: cover('om,meditation,yoga', 410),
    description: 'Continuous Om chant for deep meditation.' },
  { id: 't-lakshmi-aarti', title: 'Om Jai Lakshmi Mata', artist: 'Anuradha Paudwal', category: 'Aarti',
    durationSec: 7 * 60 + 18, hue: 50, cover: cover('lakshmi,gold,lotus', 411),
    description: 'The Diwali evening aarti to Goddess Lakshmi.' },
  { id: 't-durga-saptashati', title: 'Durga Saptashati — Chapter 1', artist: 'Anuradha Paudwal', category: 'Morning Slokas',
    durationSec: 21 * 60 + 5, hue: 0, cover: cover('durga,goddess,navratri', 412),
    description: 'Navratri recitation of the 700 verses praising Devi.' },
  { id: 't-krishna-bhajan', title: 'Achyutam Keshavam', artist: 'Vikram Hazra', category: 'Bhajans',
    durationSec: 8 * 60 + 22, hue: 280, cover: cover('krishna,radha,vrindavan', 413),
    description: 'Soulful bhajan invoking the many names of Krishna.' },


export const AUDIO_CATEGORIES: AudioCategory[] = ['Morning Slokas', 'Bhajans', 'Meditation Mantras', 'Aarti'];

export const formatTime = (s: number) => {
  const m = Math.floor(s / 60); const ss = Math.floor(s % 60);
  return `${m}:${ss.toString().padStart(2, '0')}`;
};
