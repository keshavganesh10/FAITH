// Hindu scripture library — Bhagavad Gita, Upanishads, Vedas (mock translations).

export interface Passage {
  id: string;
  title: string;
  reference: string;
  duration?: number;
  audio?: boolean;
  sanskrit?: string;
  text: string;
  commentary?: string;
}

export interface Book {
  id: string;
  title: string;
  subtitle?: string;
  passages: Passage[];
}

export const VERSE_OF_DAY: Passage = {
  id: 'gita-2-47',
  title: 'On Action Without Attachment',
  reference: 'Bhagavad Gita 2.47',
  sanskrit: 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन',
  text: 'You have the right to perform your prescribed duty, but you are not entitled to the fruits of your actions. Never consider yourself the cause of the results, and never be attached to inaction.',
  commentary: 'Krishna teaches Arjuna the principle of nishkama karma — selfless action offered without grasping at outcome.',
  duration: 4, audio: true,
};

export const SCRIPTURES: Book[] = [
  {
    id: 'gita',
    title: 'Bhagavad Gita',
    subtitle: '700 verses · The Song of the Lord',
    passages: [
      { id: 'gita-1', title: 'Chapter 1 — Arjuna\'s Dilemma', reference: 'Gita 1.1–47', duration: 12, audio: true,
        text: 'Dhritarashtra said: O Sanjaya, gathered on the holy field of Kurukshetra, eager to fight, what did my sons and the sons of Pandu do?…' },
      { id: 'gita-2', title: 'Chapter 2 — The Yoga of Knowledge', reference: 'Gita 2.1–72', duration: 22, audio: true,
        text: 'The Blessed Lord said: Whence has this dejection come upon you in this hour of trial? It is unworthy of the noble, O Arjuna…' },
      { id: 'gita-2-47', title: 'Action Without Attachment', reference: 'Gita 2.47', duration: 4, audio: true,
        sanskrit: 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन',
        text: 'You have a right to perform your prescribed duty, but never to the fruits of action…' },
      { id: 'gita-3', title: 'Chapter 3 — Karma Yoga', reference: 'Gita 3.1–43', duration: 18, audio: true,
        text: 'Arjuna said: If you consider knowledge superior to action, why then do you urge me to this terrible action?…' },
      { id: 'gita-9-22', title: 'I Carry What They Lack', reference: 'Gita 9.22', duration: 3, audio: true,
        text: 'To those who worship Me with single-minded devotion, I personally carry to them what they lack and preserve what they have.' },
      { id: 'gita-18', title: 'Chapter 18 — The Yoga of Liberation', reference: 'Gita 18.1–78', duration: 28,
        text: 'Arjuna said: I wish to know the truth of renunciation, O Hrishikesha, and the truth of relinquishment…' },
    ],
  },
  {
    id: 'upanishads',
    title: 'Principal Upanishads',
    subtitle: 'The end of the Vedas · seekers\' dialogues',
    passages: [
      { id: 'isha', title: 'Isha Upanishad', reference: '18 mantras', duration: 10, audio: true,
        sanskrit: 'ईशा वास्यमिदं सर्वं यत्किञ्च जगत्यां जगत्',
        text: 'All this — whatever moves in this moving world — is enveloped by the Lord. Enjoy what He gives you; covet no one\'s wealth.' },
      { id: 'katha', title: 'Katha Upanishad', reference: 'Nachiketa & Yama', duration: 16,
        text: 'Arise! Awake! Approach the great teachers and learn. Like the sharp edge of a razor, the path is difficult to traverse…' },
      { id: 'mandukya', title: 'Mandukya Upanishad', reference: '12 verses on Om', duration: 8, audio: true,
        text: 'Om — this syllable is all this. Its further explanation is: what was, what is, what shall be — all is Om.' },
      { id: 'mundaka', title: 'Mundaka Upanishad', reference: 'The two birds', duration: 14,
        text: 'Two birds, bound to one another in friendship, perch on the same tree. One eats the sweet fruit; the other looks on without eating.' },
    ],
  },
  {
    id: 'vedas',
    title: 'The Vedas',
    subtitle: 'Selected hymns from Rig, Sama, Yajur, Atharva',
    passages: [
      { id: 'gayatri', title: 'Gayatri Mantra', reference: 'Rig Veda 3.62.10', duration: 3, audio: true,
        sanskrit: 'ॐ भूर्भुवः स्वः। तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि। धियो यो नः प्रचोदयात्॥',
        text: 'We meditate on the glorious splendour of the divine Sun. May He illuminate our intellect.' },
      { id: 'nasadiya', title: 'Nasadiya Sukta — Hymn of Creation', reference: 'Rig Veda 10.129', duration: 7,
        text: 'Then there was neither non-existence nor existence; there was no realm of air, no sky beyond. Who truly knows? Who shall here declare it?' },
      { id: 'purusha', title: 'Purusha Sukta', reference: 'Rig Veda 10.90', duration: 9, audio: true,
        text: 'The Cosmic Person has a thousand heads, a thousand eyes, a thousand feet. He pervades the earth on every side…' },
      { id: 'shanti', title: 'Shanti Mantra', reference: 'Brihadaranyaka 1.3.28', duration: 2, audio: true,
        sanskrit: 'ॐ सह नाववतु। सह नौ भुनक्तु। सह वीर्यं करवावहै।',
        text: 'May He protect us both, may He nourish us both, may we work together with great energy. Om peace, peace, peace.' },
    ],
  },
  {
    id: 'puranas',
    title: 'Puranas & Itihasa',
    subtitle: 'Stories that carry the dharma',
    passages: [
      { id: 'ramayana-bal', title: 'Ramayana — Bala Kanda', reference: 'Childhood of Rama', duration: 20,
        text: 'In the kingdom of Kosala, on the banks of the Sarayu, stood the city of Ayodhya, ruled by the righteous king Dasharatha…' },
      { id: 'mahabharata-udyoga', title: 'Mahabharata — Krishna\'s Peace Mission', reference: 'Udyoga Parva', duration: 24,
        text: 'Krishna travelled to Hastinapura as envoy of the Pandavas, asking only five villages — and was refused…' },
      { id: 'bhagavata-10', title: 'Bhagavata Purana — Krishna in Vrindavan', reference: 'Canto 10', duration: 18, audio: true,
        text: 'In the forests of Vrindavan, the cowherd boys ran with the calves; Krishna played the flute, and the world stood still…' },
    ],
  },
];

export interface ReadingPlan {
  id: string;
  title: string;
  days: number;
  daily: number;
  description: string;
}

export const READING_PLANS: ReadingPlan[] = [
  { id: 'gita-30', title: '30 days through the Gita', days: 30, daily: 10, description: 'One chapter every day with a short reflection.' },
  { id: 'upanishads-14', title: 'Voices of the Upanishads', days: 14, daily: 8, description: 'A fortnight of dialogues with the great rishis.' },
  { id: 'festivals', title: 'Stories behind our festivals', days: 9, daily: 6, description: 'Navratri, Diwali, Holi — read why we celebrate.' },
];

export interface Collection {
  id: string;
  title: string;
  description: string;
  passageIds: string[];
  hue: number;
}

export const COLLECTIONS: Collection[] = [
  { id: 'dharma', title: 'On Dharma', description: 'Krishna on duty, conduct, and right action.', passageIds: ['gita-2-47', 'gita-3', 'gita-18'], hue: 210 },
  { id: 'bhakti', title: 'The Path of Bhakti', description: 'Devotion as a doorway to the divine.', passageIds: ['gita-9-22', 'bhagavata-10', 'purusha'], hue: 28 },
  { id: 'self', title: 'Knowing the Self', description: 'Upanishadic verses on the Atman.', passageIds: ['katha', 'mandukya', 'mundaka'], hue: 270 },
];

export const findPassage = (id: string): Passage | undefined => {
  for (const b of SCRIPTURES) {
    const p = b.passages.find(x => x.id === id);
    if (p) return p;
  }
  return undefined;
};
