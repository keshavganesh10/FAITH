import type { FaithId } from './faiths';

export interface ScripturePassage {
  id: string;
  reference: string;
  title: string;
  text: string;
}

export interface ScriptureBook {
  id: string;
  title: string;
  subtitle?: string;
  passages: ScripturePassage[];
}

export const SCRIPTURES: Record<FaithId, ScriptureBook[]> = {
  christianity: [
    { id: 'psalms', title: 'Psalms', subtitle: 'Songs of David', passages: [
      { id: 'p23', reference: 'Psalm 23:1-4', title: 'The Lord is my Shepherd',
        text: 'The Lord is my shepherd; I shall not want. He maketh me to lie down in green pastures: he leadeth me beside the still waters. He restoreth my soul.' },
      { id: 'p46', reference: 'Psalm 46:10', title: 'Be Still',
        text: 'Be still, and know that I am God: I will be exalted among the heathen, I will be exalted in the earth.' },
    ]},
    { id: 'matthew', title: 'Matthew', subtitle: 'The Gospel', passages: [
      { id: 'm5', reference: 'Matthew 5:3-9', title: 'The Beatitudes',
        text: 'Blessed are the poor in spirit: for theirs is the kingdom of heaven. Blessed are they that mourn: for they shall be comforted. Blessed are the meek: for they shall inherit the earth.' },
    ]},
  ],
  islam: [
    { id: 'fatiha', title: 'Al-Fatiha', subtitle: 'The Opening', passages: [
      { id: 'f1', reference: 'Surah 1:1-7', title: 'The Opening',
        text: 'In the name of Allah, the Most Gracious, the Most Merciful. All praise is for Allah—Lord of all worlds, the Most Compassionate, Most Merciful, Master of the Day of Judgment.' },
    ]},
    { id: 'baqarah', title: 'Al-Baqarah', subtitle: 'The Cow', passages: [
      { id: 'b255', reference: 'Surah 2:255', title: 'Ayat al-Kursi',
        text: 'Allah! There is no deity except Him, the Ever-Living, the Sustainer of existence. Neither drowsiness overtakes Him nor sleep. To Him belongs whatever is in the heavens and the earth.' },
    ]},
  ],
  hinduism: [
    { id: 'gita2', title: 'Bhagavad Gita — Chapter 2', subtitle: 'Sankhya Yoga', passages: [
      { id: 'g247', reference: 'Gita 2:47', title: 'Karma Yoga',
        text: 'You have a right to perform your prescribed duties, but you are not entitled to the fruits of your actions. Never consider yourself the cause of the results, nor be attached to inaction.' },
      { id: 'g220', reference: 'Gita 2:20', title: 'The Eternal Soul',
        text: 'The soul is never born nor dies; it has not come into being, does not come into being, and will not come into being. It is unborn, eternal, ever-existing and primeval.' },
    ]},
    { id: 'upanishad', title: 'Isha Upanishad', passages: [
      { id: 'iso1', reference: 'Isha 1', title: 'The All-Pervading',
        text: 'All this — whatever moves in this moving world — is enveloped by the Lord. Renounce it and enjoy. Do not covet anyone\'s wealth.' },
    ]},
  ],
  sikhism: [
    { id: 'japji', title: 'Japji Sahib', subtitle: 'The Morning Prayer', passages: [
      { id: 'j1', reference: 'Mool Mantar', title: 'The Root Mantra',
        text: 'Ik Onkar — There is one God. True is His Name. Creator. Without fear. Without enmity. Timeless form. Beyond birth. Self-existent. By the Guru\'s grace.' },
    ]},
  ],
  judaism: [
    { id: 'genesis', title: 'Bereishit (Genesis)', passages: [
      { id: 'gen1', reference: 'Genesis 1:1-3', title: 'In the Beginning',
        text: 'In the beginning God created the heavens and the earth. The earth was without form, and void; and darkness was on the face of the deep. And God said, "Let there be light"; and there was light.' },
    ]},
  ],
  buddhism: [
    { id: 'dhamma', title: 'The Dhammapada', passages: [
      { id: 'd1', reference: 'Dhammapada 1:1', title: 'The Twin Verses',
        text: 'Mind precedes all mental states. Mind is their chief; they are all mind-wrought. If with a pure mind a person speaks or acts, happiness follows them like a never-departing shadow.' },
      { id: 'd183', reference: 'Dhammapada 14:183', title: 'The Teaching',
        text: 'To avoid all evil, to cultivate good, and to cleanse one\'s mind — this is the teaching of the Buddhas.' },
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
