import type { FaithId } from './faiths';

export interface ScripturePassage {
  id: string;
  reference: string;
  title: string;
  text: string;
  duration?: number;   // minutes to read
  audio?: boolean;     // has audio narration available
}

export interface ScriptureBook {
  id: string;
  title: string;
  subtitle?: string;
  passages: ScripturePassage[];
}

export interface Collection {
  id: string;
  title: string;
  description: string;
  hue: number;          // gradient hue
  passageIds: string[]; // references passages by id
}

export interface ReadingPlan {
  id: string;
  title: string;
  description: string;
  days: number;
  daily: number;       // minutes per day
}

export const SCRIPTURES: Record<FaithId, ScriptureBook[]> = {
  christianity: [
    { id: 'psalms', title: 'Psalms', subtitle: 'Songs of David', passages: [
      { id: 'p23', reference: 'Psalm 23:1-4', title: 'The Lord is my Shepherd', duration: 3, audio: true,
        text: 'The Lord is my shepherd; I shall not want. He maketh me to lie down in green pastures: he leadeth me beside the still waters. He restoreth my soul.' },
      { id: 'p46', reference: 'Psalm 46:10', title: 'Be Still', duration: 2, audio: true,
        text: 'Be still, and know that I am God: I will be exalted among the heathen, I will be exalted in the earth.' },
      { id: 'p91', reference: 'Psalm 91:1-4', title: 'A Refuge', duration: 3,
        text: 'He that dwelleth in the secret place of the most High shall abide under the shadow of the Almighty. I will say of the Lord, He is my refuge and my fortress.' },
    ]},
    { id: 'matthew', title: 'Matthew', subtitle: 'The Gospel', passages: [
      { id: 'm5', reference: 'Matthew 5:3-9', title: 'The Beatitudes', duration: 4, audio: true,
        text: 'Blessed are the poor in spirit: for theirs is the kingdom of heaven. Blessed are they that mourn: for they shall be comforted. Blessed are the meek: for they shall inherit the earth.' },
      { id: 'm6', reference: 'Matthew 6:9-13', title: "The Lord's Prayer", duration: 2, audio: true,
        text: 'Our Father which art in heaven, Hallowed be thy name. Thy kingdom come. Thy will be done in earth, as it is in heaven.' },
    ]},
    { id: 'corinthians', title: '1 Corinthians', subtitle: "Paul's Letters", passages: [
      { id: 'c13', reference: '1 Corinthians 13:4-7', title: 'On Love', duration: 3, audio: true,
        text: 'Love is patient, love is kind. It does not envy, it does not boast, it is not proud. It does not dishonor others, it is not self-seeking, it is not easily angered.' },
    ]},
  ],
  islam: [
    { id: 'fatiha', title: 'Al-Fatiha', subtitle: 'The Opening', passages: [
      { id: 'f1', reference: 'Surah 1:1-7', title: 'The Opening', duration: 2, audio: true,
        text: 'In the name of Allah, the Most Gracious, the Most Merciful. All praise is for Allah—Lord of all worlds, the Most Compassionate, Most Merciful, Master of the Day of Judgment.' },
    ]},
    { id: 'baqarah', title: 'Al-Baqarah', subtitle: 'The Cow', passages: [
      { id: 'b255', reference: 'Surah 2:255', title: 'Ayat al-Kursi', duration: 3, audio: true,
        text: 'Allah! There is no deity except Him, the Ever-Living, the Sustainer of existence. Neither drowsiness overtakes Him nor sleep. To Him belongs whatever is in the heavens and the earth.' },
      { id: 'b286', reference: 'Surah 2:286', title: 'No Soul is Burdened', duration: 2,
        text: 'Allah does not burden a soul beyond that it can bear. It will have what good it has earned, and against it will be what evil it has earned.' },
    ]},
    { id: 'mulk', title: 'Al-Mulk', subtitle: 'The Sovereignty', passages: [
      { id: 'mlk1', reference: 'Surah 67:1-2', title: 'Blessed is He', duration: 3, audio: true,
        text: 'Blessed is He in whose hand is dominion, and He is over all things competent — He who created death and life to test you as to which of you is best in deed.' },
    ]},
  ],
  hinduism: [
    { id: 'gita2', title: 'Bhagavad Gita — Chapter 2', subtitle: 'Sankhya Yoga', passages: [
      { id: 'g247', reference: 'Gita 2:47', title: 'Karma Yoga', duration: 3, audio: true,
        text: 'You have a right to perform your prescribed duties, but you are not entitled to the fruits of your actions. Never consider yourself the cause of the results, nor be attached to inaction.' },
      { id: 'g220', reference: 'Gita 2:20', title: 'The Eternal Soul', duration: 2, audio: true,
        text: 'The soul is never born nor dies; it has not come into being, does not come into being, and will not come into being. It is unborn, eternal, ever-existing and primeval.' },
    ]},
    { id: 'gita12', title: 'Bhagavad Gita — Chapter 12', subtitle: 'Bhakti Yoga', passages: [
      { id: 'g1213', reference: 'Gita 12:13-14', title: 'Qualities of a Devotee', duration: 3,
        text: 'One who is not envious but is a kind friend to all living entities, who does not think himself a proprietor and is free from false ego, equal in both happiness and distress, tolerant — such a devotee is very dear to Me.' },
    ]},
    { id: 'upanishad', title: 'Isha Upanishad', passages: [
      { id: 'iso1', reference: 'Isha 1', title: 'The All-Pervading', duration: 2, audio: true,
        text: 'All this — whatever moves in this moving world — is enveloped by the Lord. Renounce it and enjoy. Do not covet anyone\'s wealth.' },
    ]},
  ],
  sikhism: [
    { id: 'japji', title: 'Japji Sahib', subtitle: 'The Morning Prayer', passages: [
      { id: 'j1', reference: 'Mool Mantar', title: 'The Root Mantra', duration: 2, audio: true,
        text: 'Ik Onkar — There is one God. True is His Name. Creator. Without fear. Without enmity. Timeless form. Beyond birth. Self-existent. By the Guru\'s grace.' },
      { id: 'j2', reference: 'Japji 1', title: 'First Pauri', duration: 3,
        text: 'By thinking, He cannot be reduced to thought, even by thinking hundreds of thousands of times. By remaining silent, inner silence is not obtained, even by remaining lovingly absorbed deep within.' },
    ]},
    { id: 'rehras', title: 'Rehras Sahib', subtitle: 'Evening Prayer', passages: [
      { id: 'r1', reference: 'Rehras 1', title: 'So Dar', duration: 4, audio: true,
        text: 'What is that gate, what is that home, in which You sit and take care of all? The sound-current of the Naad vibrates there for You, and countless musicians play all sorts of instruments there for You.' },
    ]},
  ],
  judaism: [
    { id: 'genesis', title: 'Bereishit (Genesis)', passages: [
      { id: 'gen1', reference: 'Genesis 1:1-3', title: 'In the Beginning', duration: 2, audio: true,
        text: 'In the beginning God created the heavens and the earth. The earth was without form, and void; and darkness was on the face of the deep. And God said, "Let there be light"; and there was light.' },
    ]},
    { id: 'shema', title: 'Shema Yisrael', subtitle: 'The Central Prayer', passages: [
      { id: 'sh1', reference: 'Deuteronomy 6:4-5', title: 'Hear, O Israel', duration: 2, audio: true,
        text: 'Hear, O Israel: The Lord our God, the Lord is one. You shall love the Lord your God with all your heart and with all your soul and with all your might.' },
    ]},
    { id: 'psalms-j', title: 'Tehillim (Psalms)', passages: [
      { id: 'tj23', reference: 'Psalm 23', title: 'Mizmor LeDavid', duration: 3,
        text: 'The Lord is my shepherd; I shall not want. He makes me lie down in green pastures. He leads me beside still waters. He restores my soul.' },
    ]},
  ],
  buddhism: [
    { id: 'dhamma', title: 'The Dhammapada', passages: [
      { id: 'd1', reference: 'Dhammapada 1:1', title: 'The Twin Verses', duration: 2, audio: true,
        text: 'Mind precedes all mental states. Mind is their chief; they are all mind-wrought. If with a pure mind a person speaks or acts, happiness follows them like a never-departing shadow.' },
      { id: 'd183', reference: 'Dhammapada 14:183', title: 'The Teaching', duration: 1, audio: true,
        text: 'To avoid all evil, to cultivate good, and to cleanse one\'s mind — this is the teaching of the Buddhas.' },
    ]},
    { id: 'metta', title: 'Metta Sutta', subtitle: 'Loving-kindness', passages: [
      { id: 'mt1', reference: 'Sutta Nipata 1.8', title: 'Boundless Friendliness', duration: 4, audio: true,
        text: 'May all beings be happy and secure; may their hearts be wholesome. Whatever living beings there be — feeble or strong, long, stout or medium, short, small or large — may all beings be happy.' },
    ]},
    { id: 'heart', title: 'Heart Sutra', subtitle: 'Prajñāpāramitā', passages: [
      { id: 'h1', reference: 'Heart Sutra', title: 'Form is Emptiness', duration: 3,
        text: 'Form is emptiness, emptiness is form. Form is not other than emptiness, emptiness is not other than form. The same is true of feelings, perceptions, mental formations and consciousness.' },
    ]},
  ],
};

export const VERSE_OF_DAY: Record<FaithId, ScripturePassage> = {
  christianity: SCRIPTURES.christianity[0].passages[0],
  islam: SCRIPTURES.islam[1].passages[0],
  hinduism: SCRIPTURES.hinduism[0].passages[0],
  sikhism: SCRIPTURES.sikhism[0].passages[0],
  judaism: SCRIPTURES.judaism[0].passages[0],
  buddhism: SCRIPTURES.buddhism[0].passages[0],
};

// Themed cross-cutting collections
export const COLLECTIONS: Record<FaithId, Collection[]> = {
  christianity: [
    { id: 'cc-comfort', title: 'In times of comfort', description: 'Quiet passages for difficult days.', hue: 210, passageIds: ['p23', 'p91'] },
    { id: 'cc-love', title: 'On love', description: 'What love asks of us.', hue: 340, passageIds: ['c13', 'm5'] },
  ],
  islam: [
    { id: 'ci-mercy', title: 'On mercy', description: 'Verses on Allah\'s rahma.', hue: 160, passageIds: ['f1', 'b255'] },
  ],
  hinduism: [
    { id: 'ch-action', title: 'Action without attachment', description: 'Karma yoga in three short verses.', hue: 28, passageIds: ['g247', 'g1213'] },
    { id: 'ch-self', title: 'On the eternal Self', description: 'Atman across the Gita and Upanishads.', hue: 280, passageIds: ['g220', 'iso1'] },
  ],
  sikhism: [
    { id: 'cs-day', title: 'Morning to evening', description: 'Begin and end the day in remembrance.', hue: 38, passageIds: ['j1', 'r1'] },
  ],
  judaism: [
    { id: 'cj-core', title: 'The central prayers', description: 'Shema and Mizmor LeDavid.', hue: 200, passageIds: ['sh1', 'tj23'] },
  ],
  buddhism: [
    { id: 'cb-kind', title: 'Cultivating kindness', description: 'Metta as a daily practice.', hue: 340, passageIds: ['mt1', 'd1'] },
    { id: 'cb-empty', title: 'Glimpses of emptiness', description: 'A short walk into shunyata.', hue: 280, passageIds: ['h1', 'd183'] },
  ],
};

// Reading plans
export const READING_PLANS: Record<FaithId, ReadingPlan[]> = {
  christianity: [
    { id: 'rp-c1', title: 'Psalms in 14 days', description: 'A two-week journey through David\'s songs.', days: 14, daily: 5 },
    { id: 'rp-c2', title: 'Gospel of Matthew', description: 'The life and teachings of Jesus, in 21 days.', days: 21, daily: 8 },
  ],
  islam: [
    { id: 'rp-i1', title: 'Juz Amma', description: 'The 30th juz of the Qur\'an.', days: 30, daily: 6 },
  ],
  hinduism: [
    { id: 'rp-h1', title: 'Gita in 21 days', description: 'A chapter a day, gentle pace.', days: 21, daily: 10 },
  ],
  sikhism: [
    { id: 'rp-s1', title: 'Daily Nitnem', description: 'The five banis, one a day.', days: 5, daily: 12 },
  ],
  judaism: [
    { id: 'rp-j1', title: 'Weekly parsha', description: 'A short reflection each Shabbat.', days: 7, daily: 8 },
  ],
  buddhism: [
    { id: 'rp-b1', title: 'Dhammapada in 26 days', description: 'A chapter a day.', days: 26, daily: 6 },
  ],
};

// Helper: find a passage by id across all books for a faith
export const findPassage = (faith: FaithId, id: string): ScripturePassage | undefined => {
  for (const book of SCRIPTURES[faith]) {
    const p = book.passages.find(x => x.id === id);
    if (p) return p;
  }
  return undefined;
};
