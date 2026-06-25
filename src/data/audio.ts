// Ad-free Sloka/Bhajan/Mantra/Aarti library.
// Audio URLs are real, CORS-enabled MP3 streams hosted on archive.org.

export type AudioCategory = 'Morning Slokas' | 'Bhajans' | 'Meditation Mantras' | 'Aarti';

export interface Track {
  id: string;
  title: string;
  artist: string;
  category: AudioCategory;
  durationSec: number;
  cover: string;
  hue: number;
  description?: string;
  audioUrl?: string;   // real, playable MP3 (CORS-enabled). When absent, plays a mock timer.
}

const cover = (kw: string, seed: number) =>
  `https://loremflickr.com/600/600/${kw}?lock=${seed}`;

// All URLs below were verified accessible from archive.org's audio collection
// with CORS `Access-Control-Allow-Origin: *`.
const ARCHIVE = 'https://archive.org/download';

export const TRACKS: Track[] = [
  {
    id: 't-shiv-chalisa', title: 'Shiv Chalisa (Maha Super Fast)', artist: 'Hariharan',
    category: 'Bhajans', durationSec: 195, hue: 215,
    cover: cover('shiva,lingam,trident', 408),
    description: 'A vigorous Hindi devotional set to live mridanga and harmonium.',
    audioUrl: `${ARCHIVE}/hanuman-chalisa-hariharan-gulshan-kumar_202605/Chalisa_Shiv%20Chalisa%20Maha%20Super%20Fast.mp3`,
  },
  {
    id: 't-ganesh-chalisa', title: 'Ganesh Chalisa', artist: 'Hariharan',
    category: 'Bhajans', durationSec: 190, hue: 18,
    cover: cover('ganesha,statue,marigold', 409),
    description: 'The 40-verse hymn to the remover of obstacles. Begin every undertaking here.',
    audioUrl: `${ARCHIVE}/hanuman-chalisa-hariharan-gulshan-kumar_202605/Chalisa_Ganesh%20Chalisa%20Maha%20Super%20Fast.mp3`,
  },
  {
    id: 't-hanuman-ashtak', title: 'Sankat Mochan Hanuman Ashtak', artist: 'Hariharan',
    category: 'Bhajans', durationSec: 374, hue: 12,
    cover: cover('hanuman,sindoor,statue', 403),
    description: 'Tulsidas\'s eight verses recited when troubles loom — Hanuman, the breaker of distress.',
    audioUrl: `${ARCHIVE}/hanuman-chalisa-hariharan-gulshan-kumar_202605/Chalisa_Sankat%20Mochan%20Hanuman%20Ashtak.mp3`,
  },
  {
    id: 't-shiv-epic', title: 'Epic Shiv Chalisa', artist: 'Hariharan',
    category: 'Morning Slokas', durationSec: 414, hue: 270,
    cover: cover('shiva,mountain,kailash', 406),
    description: 'The classical, slow-tempo rendition. 40 verses to Mahadev.',
    audioUrl: `${ARCHIVE}/hanuman-chalisa-hariharan-gulshan-kumar_202605/Chalisa_Epic%20Shiv%20Chalisa.mp3`,
  },
  {
    id: 't-shiv-tandava', title: 'Shiv Tandav Stotram', artist: 'Traditional Pandits',
    category: 'Morning Slokas', durationSec: 471, hue: 215,
    cover: cover('shiva,nataraja,dance', 408),
    description: 'Ravana\'s thundering hymn to Lord Shiva — sixteen verses of cosmic dance.',
    audioUrl: `${ARCHIVE}/ShivTandavStotram/02ShivTandavStotram.mp3`,
  },
  {
    id: 't-mahamrityunjaya', title: 'Maha Mrityunjaya Mantra', artist: 'Vedic Recitation',
    category: 'Meditation Mantras', durationSec: 1347, hue: 270,
    cover: cover('shiva,lingam,abhishekam', 406),
    description: 'For healing and protection. Continuous recitation for deep meditation.',
    audioUrl: `${ARCHIVE}/ShivMahaMrityunjayaMantra2/Shiv%20MahaMrityunjaya%20Mantra%20-2.mp3`,
  },
  {
    id: 't-mahamrityunjaya-short', title: 'Maha Mrityunjaya — 108 times (short)', artist: 'Vedic Recitation',
    category: 'Meditation Mantras', durationSec: 139, hue: 200,
    cover: cover('sunrise,meditation,om', 405),
    description: 'A shorter 108-count rendition — perfect for morning sadhana.',
    audioUrl: `${ARCHIVE}/ShivMahaMrityunjayaMantra2/Shiv%20Mahamrityunjaya%20Mantra-1.mp3`,
  },
  {
    id: 't-om-namah', title: 'Om Namah Shivaya — Continuous', artist: 'Anandmurti Gurumaa',
    category: 'Meditation Mantras', durationSec: 1336, hue: 195,
    cover: cover('om,meditation,yoga', 410),
    description: '22 minutes of continuous Om Namah Shivaya — for japa and dhyana.',
    audioUrl: `${ARCHIVE}/OmNamahShivaya/OmNamahShivaya.mp3`,
  },
  {
    id: 't-lakshmi-aarti', title: 'Om Jai Lakshmi Mata', artist: 'Anuradha Paudwal',
    category: 'Aarti', durationSec: 347, hue: 50,
    cover: cover('lakshmi,gold,lotus', 411),
    description: 'The Diwali evening aarti to Goddess Lakshmi.',
    audioUrl: `${ARCHIVE}/om-jay-lakshmi-mata-aarti-laxmi-maa.mp3/om-jay-lakshmi-mata-aarti-laxmi-maa.mp3.mp3`,
  },
  {
    id: 't-vishnu', title: 'Vishnu Sahasranamam', artist: 'M.S. Subbulakshmi (Classic)',
    category: 'Morning Slokas', durationSec: 1926, hue: 28,
    cover: cover('vishnu,hindu,temple', 401),
    description: 'The 1000 names of Vishnu. The definitive recording.',
    audioUrl: `${ARCHIVE}/ythub.-cc-vishnu-sahasranamam-full-version-original-320k_202109/%5BYTHUB.CC%5D%20Vishnu%20Sahasranamam%20Full%20Version%20Original-320k.mp3`,
  },
  // Mock-only tracks (no audio URL — player still simulates progress)
  { id: 't-suprabhatam', title: 'Venkateswara Suprabhatam', artist: 'M.S. Subbulakshmi', category: 'Morning Slokas',
    durationSec: 28 * 60 + 40, hue: 38, cover: cover('tirupati,temple,sunrise', 402),
    description: 'The traditional dawn awakening of Lord Venkateswara at Tirumala.' },
  { id: 't-omjaya', title: 'Om Jai Jagdish Hare', artist: 'Anuradha Paudwal', category: 'Aarti',
    durationSec: 6 * 60 + 32, hue: 45, cover: cover('aarti,diya,thali', 404),
    description: 'The universal evening aarti, sung in homes across the diaspora.' },
  { id: 't-radhekrishna', title: 'Radhe Radhe Govinda', artist: 'Krishna Das', category: 'Bhajans',
    durationSec: 14 * 60 + 8, hue: 320, cover: cover('krishna,flute,peacock', 407),
    description: 'Call-and-response kirtan, harmonium and tabla.' },
  { id: 't-aarti-ganesh', title: 'Sukhakarta Dukhaharta', artist: 'Lata Mangeshkar', category: 'Aarti',
    durationSec: 4 * 60 + 12, hue: 18, cover: cover('ganesha,marigold,puja', 412),
    description: 'The beloved Marathi aarti to Lord Ganesha.' },
  { id: 't-durga-saptashati', title: 'Durga Saptashati — Chapter 1', artist: 'Anuradha Paudwal', category: 'Morning Slokas',
    durationSec: 21 * 60 + 5, hue: 0, cover: cover('durga,goddess,navratri', 413),
    description: 'Navratri recitation of the 700 verses praising Devi.' },
];

export const AUDIO_CATEGORIES: AudioCategory[] = ['Morning Slokas', 'Bhajans', 'Meditation Mantras', 'Aarti'];

export const formatTime = (s: number) => {
  const m = Math.floor(s / 60); const ss = Math.floor(s % 60);
  return `${m}:${ss.toString().padStart(2, '0')}`;
};
