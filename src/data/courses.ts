// Duolingo-style guided courses for studying holy books.
// Each course has units; each unit has lessons; each lesson has exercises.

export type ExerciseKind = 'multiple-choice' | 'fill-blank' | 'match' | 'tap-translate' | 'read';

export interface Exercise {
  id: string;
  kind: ExerciseKind;
  prompt: string;
  context?: string;          // verse / passage to read first
  sanskrit?: string;
  options?: string[];        // for multiple-choice / tap-translate
  answer: string | number;   // index for MC, string for fill-blank
  explain?: string;
}

export interface Lesson {
  id: string;
  title: string;
  xp: number;
  exercises: Exercise[];
}

export interface Unit {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  title: string;
  scripture: string;
  description: string;
  hue: number;
  emoji: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  units: Unit[];
}

// --- Gita course ---
const gitaCourse: Course = {
  id: 'c-gita',
  title: 'Bhagavad Gita — A Guided Journey',
  scripture: 'Bhagavad Gita',
  description: 'From Arjuna\'s despair to Krishna\'s final teaching — 5 units, 18 lessons.',
  hue: 28, emoji: '🕉️', level: 'Beginner',
  units: [
    {
      id: 'u-gita-1', title: 'Setting the Scene', description: 'Who is on the battlefield, and why?',
      lessons: [
        { id: 'l-gita-1-1', title: 'Kurukshetra', xp: 10, exercises: [
          { id: 'e1', kind: 'read', prompt: 'Read the opening of the Gita.',
            context: 'Two great armies face each other on the field of Kurukshetra. The blind king Dhritarashtra asks his charioteer Sanjaya to narrate the events. On one side stand the Pandavas — Arjuna foremost among them; on the other, the Kauravas, led by Duryodhana.',
            answer: 0 },
          { id: 'e2', kind: 'multiple-choice', prompt: 'Who narrates the events of the battlefield to King Dhritarashtra?',
            options: ['Krishna', 'Sanjaya', 'Bhishma', 'Vyasa'], answer: 1,
            explain: 'Sanjaya, gifted with divine sight by Vyasa, narrates the battle.' },
          { id: 'e3', kind: 'multiple-choice', prompt: 'On which holy field does the Gita take place?',
            options: ['Vrindavan', 'Mathura', 'Kurukshetra', 'Ayodhya'], answer: 2 },
        ]},
        { id: 'l-gita-1-2', title: 'Arjuna\'s Dilemma', xp: 10, exercises: [
          { id: 'e1', kind: 'read', prompt: 'Why Arjuna refuses to fight.',
            context: 'Seeing his teachers, uncles, cousins and friends arrayed against him, Arjuna is overcome with grief. He drops his bow Gandiva and says he will not fight — even for the three worlds.',
            answer: 0 },
          { id: 'e2', kind: 'multiple-choice', prompt: 'What is the name of Arjuna\'s bow?',
            options: ['Sharanga', 'Pinaka', 'Gandiva', 'Vijaya'], answer: 2 },
          { id: 'e3', kind: 'fill-blank', prompt: 'Fill the blank: "My limbs fail me, my mouth is ___."',
            answer: 'parched', explain: 'Arjuna\'s body itself rebels against the act of fighting his kin.' },
        ]},
      ],
    },
    {
      id: 'u-gita-2', title: 'The Eternal Self', description: 'Chapter 2 — the soul never dies.',
      lessons: [
        { id: 'l-gita-2-1', title: 'Atman is Eternal', xp: 15, exercises: [
          { id: 'e1', kind: 'read', prompt: 'Read Gita 2.20.', sanskrit: 'न जायते म्रियते वा कदाचित्…',
            context: 'The Self is never born, nor does it die at any time. It is unborn, eternal, permanent and primeval. It is not slain when the body is slain.',
            answer: 0 },
          { id: 'e2', kind: 'multiple-choice', prompt: 'According to Krishna, the Self (Atman) is:',
            options: ['Born with the body', 'Eternal and unborn', 'Created by karma', 'A form of energy'], answer: 1 },
          { id: 'e3', kind: 'tap-translate', prompt: 'What does “Atman” mean?',
            options: ['Body', 'Mind', 'Self / Soul', 'Action'], answer: 2 },
        ]},
        { id: 'l-gita-2-2', title: 'Action Without Attachment', xp: 15, exercises: [
          { id: 'e1', kind: 'read', prompt: 'The most famous verse — Gita 2.47.',
            sanskrit: 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।',
            context: 'You have a right to perform your prescribed duty, but you are not entitled to the fruits of action. Never consider yourself the cause of the results, and never be attached to inaction.',
            answer: 0 },
          { id: 'e2', kind: 'multiple-choice', prompt: 'What do we have a right to, according to Gita 2.47?',
            options: ['The fruits of our action', 'Performing our duty', 'Choosing not to act', 'Being praised'], answer: 1 },
          { id: 'e3', kind: 'fill-blank', prompt: 'This teaching is called nishkama ___ (selfless action).',
            answer: 'karma' },
        ]},
        { id: 'l-gita-2-3', title: 'The Ladder of Desire', xp: 10, exercises: [
          { id: 'e1', kind: 'multiple-choice', prompt: 'In Gita 2.62–63, what follows from attachment?',
            options: ['Peace', 'Desire', 'Wisdom', 'Liberation'], answer: 1,
            explain: 'Attachment → desire → anger → delusion → loss of memory → loss of discrimination.' },
          { id: 'e2', kind: 'multiple-choice', prompt: 'What is the final outcome of this chain?',
            options: ['Liberation', 'Renewal', 'The man is lost', 'Self-realisation'], answer: 2 },
        ]},
      ],
    },
    {
      id: 'u-gita-3', title: 'Karma Yoga', description: 'Chapter 3 — the path of action.',
      lessons: [
        { id: 'l-gita-3-1', title: 'Why We Must Act', xp: 15, exercises: [
          { id: 'e1', kind: 'read', prompt: 'On the necessity of action.',
            context: 'No one can remain even for a moment without performing action. Even maintaining the body requires action. Engaging the senses without attachment is superior to mere renunciation.',
            answer: 0 },
          { id: 'e2', kind: 'multiple-choice', prompt: 'Krishna says it is impossible to:',
            options: ['Stop breathing', 'Refrain from all action', 'Reach liberation', 'Worship without ritual'], answer: 1 },
        ]},
        { id: 'l-gita-3-2', title: 'The Leader Sets the Standard', xp: 10, exercises: [
          { id: 'e1', kind: 'multiple-choice', prompt: '"Whatever a great person does..."',
            options: ['the world ignores', 'the world follows', 'is hidden', 'is forgiven'], answer: 1 },
        ]},
      ],
    },
    {
      id: 'u-gita-4', title: 'Bhakti — The Path of Devotion', description: 'Chapter 9 & 12 — devotion as a path.',
      lessons: [
        { id: 'l-gita-4-1', title: 'A Leaf, a Flower, a Fruit, Water', xp: 15, exercises: [
          { id: 'e1', kind: 'read', prompt: 'Read Gita 9.26.',
            sanskrit: 'पत्रं पुष्पं फलं तोयं यो मे भक्त्या प्रयच्छति।',
            context: 'Whoever offers Me with devotion a leaf, a flower, a fruit, or even water — that I accept, offered as it is with a loving heart.',
            answer: 0 },
          { id: 'e2', kind: 'multiple-choice', prompt: 'What does Krishna value in an offering?',
            options: ['Its cost', 'Its size', 'The devotion behind it', 'Its rarity'], answer: 2 },
        ]},
        { id: 'l-gita-4-2', title: 'The Devotee Dear to Me', xp: 15, exercises: [
          { id: 'e1', kind: 'multiple-choice', prompt: 'In Chapter 12, the devotee dear to Krishna is:',
            options: ['Wealthy and learned', 'Free from ill-will, compassionate, forgiving', 'A great warrior', 'A renunciant in the forest'], answer: 1 },
        ]},
      ],
    },
    {
      id: 'u-gita-5', title: 'The Final Teaching', description: 'Chapter 18 — surrender and liberation.',
      lessons: [
        { id: 'l-gita-5-1', title: 'The Charama Sloka', xp: 20, exercises: [
          { id: 'e1', kind: 'read', prompt: 'Gita 18.66 — the final secret.',
            sanskrit: 'सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज।',
            context: 'Abandoning all dharmas, take refuge in Me alone. I shall liberate you from all sins. Do not grieve.',
            answer: 0 },
          { id: 'e2', kind: 'multiple-choice', prompt: 'What does Krishna tell Arjuna to do?',
            options: ['Fight without thought', 'Take refuge in Him alone', 'Renounce the world', 'Sacrifice to the gods'], answer: 1 },
          { id: 'e3', kind: 'fill-blank', prompt: 'Krishna promises: "I shall liberate you from all ___."',
            answer: 'sins' },
        ]},
      ],
    },
  ],
};

const upanishadCourse: Course = {
  id: 'c-upanishad',
  title: 'Voices of the Upanishads',
  scripture: 'Principal Upanishads',
  description: 'Sit at the feet of the rishis. 3 units on Self, Brahman, and the four Mahavakyas.',
  hue: 270, emoji: '🪷', level: 'Intermediate',
  units: [
    { id: 'u-up-1', title: 'Tat Tvam Asi', description: 'You are That.', lessons: [
      { id: 'l-up-1-1', title: 'The Father Teaches Shvetaketu', xp: 15, exercises: [
        { id: 'e1', kind: 'read', prompt: 'From the Chandogya Upanishad.',
          context: 'The father bids his son dissolve salt in water. "Taste this water." It is salty everywhere, though the salt is unseen. "Even so, dear one, the subtle Self pervades all that is. That which is the subtle essence — in it all this has its self. That is the True. That is the Self. And that, Shvetaketu, thou art."',
          answer: 0 },
        { id: 'e2', kind: 'multiple-choice', prompt: 'What does "Tat Tvam Asi" mean?',
          options: ['God is great', 'You are That', 'All is one', 'Truth alone wins'], answer: 1 },
        { id: 'e3', kind: 'multiple-choice', prompt: 'Tat Tvam Asi is one of the four:',
          options: ['Vedas', 'Mahavakyas', 'Yamas', 'Ashramas'], answer: 1 },
      ]},
    ]},
    { id: 'u-up-2', title: 'The Two Birds', description: 'Mundaka Upanishad.', lessons: [
      { id: 'l-up-2-1', title: 'Witness and Doer', xp: 15, exercises: [
        { id: 'e1', kind: 'read', prompt: 'Two birds on one tree.',
          sanskrit: 'द्वा सुपर्णा सयुजा सखाया…',
          context: 'Two birds, friends, perch on the same tree. One eats the sweet fruit; the other looks on without eating. When the first sees the second — splendid, the Lord — its sorrow passes away.',
          answer: 0 },
        { id: 'e2', kind: 'multiple-choice', prompt: 'The two birds symbolise:',
          options: ['Day and night', 'Body and senses', 'The individual self and the witnessing Self', 'Birth and death'], answer: 2 },
      ]},
    ]},
    { id: 'u-up-3', title: 'From Darkness to Light', description: 'The Pavamana Mantra.', lessons: [
      { id: 'l-up-3-1', title: 'Asato Ma', xp: 10, exercises: [
        { id: 'e1', kind: 'read', prompt: 'Brihadaranyaka 1.3.28.',
          sanskrit: 'असतो मा सद्गमय। तमसो मा ज्योतिर्गमय। मृत्योर्मा अमृतं गमय।',
          context: 'From the unreal lead me to the real; from darkness lead me to light; from death lead me to immortality.',
          answer: 0 },
        { id: 'e2', kind: 'tap-translate', prompt: 'What does "Jyotir" mean?',
          options: ['Death', 'Light', 'Truth', 'Sleep'], answer: 1 },
      ]},
    ]},
  ],
};

const yogaCourse: Course = {
  id: 'c-yoga',
  title: 'Patanjali\'s Yoga Sutras',
  scripture: 'Yoga Sutras',
  description: 'The science of the mind in 8 limbs — a beginner-friendly path.',
  hue: 195, emoji: '🧘', level: 'Beginner',
  units: [
    { id: 'u-y-1', title: 'What is Yoga?', description: 'The first definition.', lessons: [
      { id: 'l-y-1-1', title: 'Chitta Vritti Nirodhah', xp: 10, exercises: [
        { id: 'e1', kind: 'read', prompt: 'Yoga Sutra 1.2.',
          sanskrit: 'योगश्चित्तवृत्तिनिरोधः।',
          context: 'Yoga is the stilling of the modifications (vritti) of the mind (chitta). When the rippling stops, the depth becomes visible.',
          answer: 0 },
        { id: 'e2', kind: 'multiple-choice', prompt: 'Patanjali defines yoga as:',
          options: ['Posture and breath', 'The stilling of the mind', 'Devotion to a deity', 'Right action'], answer: 1 },
        { id: 'e3', kind: 'fill-blank', prompt: 'The two means: abhyasa (practice) and ___ (non-attachment).',
          answer: 'vairagya' },
      ]},
    ]},
    { id: 'u-y-2', title: 'The Eight Limbs', description: 'Ashtanga yoga.', lessons: [
      { id: 'l-y-2-1', title: 'Naming the Limbs', xp: 15, exercises: [
        { id: 'e1', kind: 'multiple-choice', prompt: 'How many limbs does Patanjali\'s yoga have?',
          options: ['Four', 'Six', 'Eight', 'Ten'], answer: 2 },
        { id: 'e2', kind: 'multiple-choice', prompt: 'Which is NOT one of the eight limbs?',
          options: ['Yama', 'Asana', 'Bhakti', 'Samadhi'], answer: 2,
          explain: 'Bhakti is a separate path. The eight limbs are yama, niyama, asana, pranayama, pratyahara, dharana, dhyana, samadhi.' },
        { id: 'e3', kind: 'tap-translate', prompt: 'What does "Pranayama" mean?',
          options: ['Posture', 'Breath control', 'Meditation', 'Concentration'], answer: 1 },
      ]},
    ]},
  ],
};

export const COURSES: Course[] = [gitaCourse, upanishadCourse, yogaCourse];

export const findCourse = (id: string) => COURSES.find(c => c.id === id);
export const findLesson = (courseId: string, lessonId: string) => {
  const c = findCourse(courseId); if (!c) return undefined;
  for (const u of c.units) {
    const l = u.lessons.find(x => x.id === lessonId);
    if (l) return { unit: u, lesson: l, course: c };
  }
  return undefined;
};

export const lessonCount = (c: Course) => c.units.reduce((n, u) => n + u.lessons.length, 0);
