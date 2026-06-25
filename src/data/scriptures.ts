// Hindu scripture library — Bhagavad Gita, Upanishads, Vedas, Puranas,
// Yoga Sutras, Hanuman Chalisa, Vishnu Sahasranama, Sundarakanda excerpts.
// All translations are abridged/paraphrased from public-domain sources
// (Eknath Easwaran, Swami Sivananda, Ralph T.H. Griffith, Max Müller).

export interface Passage {
  id: string;
  title: string;
  reference: string;
  duration?: number;
  audio?: boolean;
  sanskrit?: string;
  transliteration?: string;
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
  sanskrit: 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन। मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥',
  transliteration: 'karmaṇy-evādhikāras te mā phaleṣu kadācana | mā karma-phala-hetur bhūr mā te saṅgo ’stv akarmaṇi',
  text: 'You have the right to perform your prescribed duty, but you are not entitled to the fruits of your actions. Never consider yourself the cause of the results, and never be attached to inaction.',
  commentary: 'Krishna teaches Arjuna the principle of nishkama karma — selfless action offered without grasping at outcome. The freedom is not in escaping work but in releasing the result.',
  duration: 4, audio: true,
};

// --- Bhagavad Gita: many more verses, organised by chapter ---
const gita: Passage[] = [
  { id: 'gita-1', title: 'Chapter 1 — Arjuna\'s Dilemma', reference: 'Gita 1.1–47', duration: 12, audio: true,
    sanskrit: 'धर्मक्षेत्रे कुरुक्षेत्रे समवेता युयुत्सवः।',
    text: 'Dhritarashtra said: O Sanjaya, gathered on the holy field of Kurukshetra, eager to fight, what did my sons and the sons of Pandu do? Arjuna, seeing his teachers, uncles, brothers, sons and friends arrayed for battle, was overcome with grief, and said: "My limbs fail me, my mouth is parched, my body trembles. I will not fight, Krishna."' },
  { id: 'gita-2', title: 'Chapter 2 — The Yoga of Knowledge', reference: 'Gita 2.1–72', duration: 22, audio: true,
    sanskrit: 'क्लैब्यं मा स्म गमः पार्थ नैतत्त्वय्युपपद्यते।',
    text: 'The Blessed Lord said: Whence has this faint-heartedness come upon you in this hour of trial? It is unworthy of the noble, Arjuna. Cast off this petty weakness of heart and arise. The wise grieve neither for the living nor for the dead. There never was a time when I was not, nor you, nor these princes; nor shall any of us cease to be hereafter.' },
  { id: 'gita-2-20', title: '“The Self is never born and never dies”', reference: 'Gita 2.20', duration: 2, audio: true,
    sanskrit: 'न जायते म्रियते वा कदाचिन्नायं भूत्वा भविता वा न भूयः।',
    text: 'The Self is never born, nor does it die at any time. It has not come into being, nor will it cease to be. Unborn, eternal, permanent and primeval, the Self is not slain when the body is slain.' },
  { id: 'gita-2-47', title: 'Action Without Attachment', reference: 'Gita 2.47', duration: 4, audio: true,
    sanskrit: 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।',
    text: 'You have a right to perform your prescribed duty, but you are not entitled to the fruits of action. Never consider yourself the cause of the results, and never be attached to inaction.',
    commentary: 'The single most quoted verse of the Gita. The injunction is not against caring, but against grasping.' },
  { id: 'gita-2-62', title: 'The Ladder Down From Desire', reference: 'Gita 2.62–63', duration: 3,
    text: 'Brooding on objects of the senses, attachment is born; from attachment, desire; from desire, anger; from anger, delusion; from delusion, loss of memory; from loss of memory, the destruction of discrimination; and with that, the man is lost.' },
  { id: 'gita-3', title: 'Chapter 3 — Karma Yoga', reference: 'Gita 3.1–43', duration: 18, audio: true,
    text: 'Arjuna said: If you consider knowledge superior to action, why then do you urge me to this terrible action? The Lord replied: No one can remain even for a moment without performing action. He whose senses are restrained by the mind, and who without attachment engages the organs of action in karma yoga, he is superior.' },
  { id: 'gita-3-21', title: '“Whatever the great do, the world follows.”', reference: 'Gita 3.21', duration: 2,
    sanskrit: 'यद्यदाचरति श्रेष्ठस्तत्तदेवेतरो जनः।',
    text: 'Whatever a great man does, the same is done by others. Whatever standard he sets, the world follows.' },
  { id: 'gita-4', title: 'Chapter 4 — The Yoga of Wisdom', reference: 'Gita 4.1–42', duration: 16,
    sanskrit: 'यदा यदा हि धर्मस्य ग्लानिर्भवति भारत।',
    text: 'Whenever there is a decline of righteousness and a rise of unrighteousness, then I send forth Myself. For the protection of the good, for the destruction of the wicked, and for the establishment of dharma, I come into being age after age.' },
  { id: 'gita-5', title: 'Chapter 5 — Renunciation of Action', reference: 'Gita 5.1–29', duration: 12,
    text: 'The yogi who is happy within, who rejoices within, and who is illumined within, attains the absolute freedom of Brahman, and he becomes Brahman.' },
  { id: 'gita-6', title: 'Chapter 6 — Meditation', reference: 'Gita 6.1–47', duration: 18, audio: true,
    text: 'Let the yogi try to fix his mind on the Self, sitting alone in a clean place, neither too high nor too low, holding the body, head and neck erect, motionless and steady, fixing the gaze on the tip of the nose.' },
  { id: 'gita-6-30', title: '“He who sees Me everywhere…”', reference: 'Gita 6.30', duration: 2,
    text: 'He who sees Me everywhere and sees everything in Me — for him I am never lost, nor is he ever lost to Me.' },
  { id: 'gita-7', title: 'Chapter 7 — Knowledge and Wisdom', reference: 'Gita 7.1–30', duration: 14,
    text: 'Earth, water, fire, air, ether, mind, intellect and egoism — these are My eightfold lower nature. But know My higher nature, by which this universe is sustained.' },
  { id: 'gita-9-22', title: 'I Carry What They Lack', reference: 'Gita 9.22', duration: 3, audio: true,
    sanskrit: 'अनन्याश्चिन्तयन्तो मां ये जनाः पर्युपासते।',
    text: 'To those who worship Me with single-minded devotion, ever steadfast, I personally carry to them what they lack and preserve what they have.' },
  { id: 'gita-9-26', title: 'A Leaf, a Flower, a Fruit, Water', reference: 'Gita 9.26', duration: 2, audio: true,
    sanskrit: 'पत्रं पुष्पं फलं तोयं यो मे भक्त्या प्रयच्छति।',
    text: 'Whoever offers Me with devotion a leaf, a flower, a fruit, or even water — that I accept, offered as it is with a loving heart.' },
  { id: 'gita-11', title: 'Chapter 11 — The Cosmic Vision', reference: 'Gita 11.1–55', duration: 22, audio: true,
    text: 'Arjuna saw the entire universe — divided in many ways but standing as One — in the body of the God of gods. Suns and moons were His eyes; His mouth, blazing fire. If a thousand suns were to rise at once in the sky, their splendour might resemble the splendour of that great Being.' },
  { id: 'gita-12', title: 'Chapter 12 — The Yoga of Devotion', reference: 'Gita 12.1–20', duration: 10, audio: true,
    text: 'He who has no ill-will toward any being, who is friendly and compassionate, free from possessiveness and egoism, balanced in pleasure and pain, forgiving — that devotee is dear to Me.' },
  { id: 'gita-15', title: 'Chapter 15 — The Eternal Tree', reference: 'Gita 15.1–20', duration: 12,
    text: 'They speak of an eternal Ashvattha tree, with its roots above and branches below, whose leaves are the Vedas. He who knows this tree is the knower of the Vedas.' },
  { id: 'gita-18', title: 'Chapter 18 — The Yoga of Liberation', reference: 'Gita 18.1–78', duration: 28, audio: true,
    text: 'Arjuna said: I wish to know the truth of renunciation and the truth of relinquishment. Krishna replied: Renunciation of action is praised by some; others say action itself is to be relinquished, but its fruits given up. Listen now to My final word.' },
  { id: 'gita-18-66', title: 'The Charama Sloka', reference: 'Gita 18.66', duration: 2, audio: true,
    sanskrit: 'सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज।',
    text: 'Abandoning all dharmas, take refuge in Me alone. I shall liberate you from all sins. Do not grieve.',
    commentary: 'For Vaishnavas, the very heart of the Gita: surrender is itself the highest dharma.' },
];

// --- Upanishads — extended ---
const upanishads: Passage[] = [
  { id: 'isha', title: 'Isha Upanishad', reference: '18 mantras', duration: 10, audio: true,
    sanskrit: 'ईशा वास्यमिदं सर्वं यत्किञ्च जगत्यां जगत्।',
    text: 'All this — whatever moves in this moving world — is enveloped by the Lord. Enjoy what He gives you; covet no one\'s wealth. Performing works in this world, one should wish to live a hundred years; only thus, and not otherwise, can one keep work from clinging to the soul.' },
  { id: 'katha', title: 'Katha Upanishad — Nachiketa & Yama', reference: 'Katha 1–2', duration: 16, audio: true,
    sanskrit: 'उत्तिष्ठत जाग्रत प्राप्य वरान्निबोधत।',
    text: 'Arise! Awake! Approach the great teachers and learn. Like the sharp edge of a razor, the path is difficult to traverse, say the sages. The Self, smaller than the small, greater than the great, is hidden in the heart of every creature.' },
  { id: 'katha-2', title: 'The Chariot of the Self', reference: 'Katha 1.3.3', duration: 4,
    text: 'Know the Self as the lord of the chariot, the body as the chariot itself, the intellect as the charioteer, and the mind as the reins. The senses are the horses; the roads they travel, the objects of desire.' },
  { id: 'mandukya', title: 'Mandukya Upanishad', reference: '12 verses on Om', duration: 8, audio: true,
    sanskrit: 'ओमित्येतदक्षरमिदं सर्वम्।',
    text: 'Om — this syllable is all this. Its further explanation is: what was, what is, what shall be — all is Om. And whatever else is beyond the three times — that too is Om. All this is Brahman. This Self is Brahman.' },
  { id: 'mundaka', title: 'Mundaka — The Two Birds', reference: 'Mundaka 3.1.1', duration: 4, audio: true,
    sanskrit: 'द्वा सुपर्णा सयुजा सखाया समानं वृक्षं परिषस्वजाते।',
    text: 'Two birds, bound to one another in friendship, perch on the same tree. One eats the sweet fruit; the other looks on without eating. When the first sees the second — splendid, the Lord — its sorrow passes away.' },
  { id: 'mundaka-3-2-3', title: '“The Self is not won by study”', reference: 'Mundaka 3.2.3', duration: 2,
    text: 'This Self cannot be attained by study of the scriptures, nor by intellect, nor by much hearing. He whom the Self chooses, by him alone is It attained — to him the Self reveals its own form.' },
  { id: 'kena', title: 'Kena Upanishad', reference: 'Kena 1.3–5', duration: 6,
    text: 'There the eye does not go, nor speech, nor the mind. We do not know, we do not understand how one can teach this. It is other than the known, and It is beyond the unknown.' },
  { id: 'taittiriya', title: 'Taittiriya — The Five Sheaths', reference: 'Taittiriya 2.1–5', duration: 8,
    text: 'From food are creatures born; by food do they live; into food they pass at death. Different from this, and within it, is the self made of vital breath. Different from this, and within it, the self made of mind; then intellect; then bliss.' },
  { id: 'chandogya', title: 'Chandogya — Tat Tvam Asi', reference: 'Chandogya 6.8.7', duration: 4, audio: true,
    sanskrit: 'तत्त्वमसि श्वेतकेतो।',
    text: '“That which is the subtle essence — in it all that exists has its self. It is the True. It is the Self. And that, Shvetaketu, thou art.” One of the four Mahavakyas — the “great sayings” — of the Vedanta.' },
  { id: 'brihadaranyaka', title: 'Brihadaranyaka — Asato Ma', reference: 'Brihad. 1.3.28', duration: 3, audio: true,
    sanskrit: 'असतो मा सद्गमय। तमसो मा ज्योतिर्गमय। मृत्योर्मा अमृतं गमय।',
    text: 'From the unreal lead me to the real; from darkness lead me to light; from death lead me to immortality. Om. Peace, peace, peace.' },
  { id: 'aitareya', title: 'Aitareya — Prajnanam Brahma', reference: 'Aitareya 3.1.3', duration: 2,
    sanskrit: 'प्रज्ञानं ब्रह्म।',
    text: 'Consciousness is Brahman. The Self is consciousness. This Self is Brahman. — One of the four Mahavakyas.' },
];

// --- Vedas — extended ---
const vedas: Passage[] = [
  { id: 'gayatri', title: 'Gayatri Mantra', reference: 'Rig Veda 3.62.10', duration: 3, audio: true,
    sanskrit: 'ॐ भूर्भुवः स्वः। तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि। धियो यो नः प्रचोदयात्॥',
    transliteration: 'Om bhūr bhuvaḥ svaḥ | tat savitur vareṇyaṃ bhargo devasya dhīmahi | dhiyo yo naḥ pracodayāt',
    text: 'We meditate on the glorious splendour of the divine Sun. May He illuminate our intellect.',
    commentary: 'The supreme mantra of the Vedas. Traditionally recited at the three junctions of the day — dawn, noon, and dusk.' },
  { id: 'nasadiya', title: 'Nasadiya Sukta — Hymn of Creation', reference: 'Rig Veda 10.129', duration: 7, audio: true,
    sanskrit: 'नासदासीन्नो सदासीत्तदानीं नासीद्रजो नो व्योमा परो यत्।',
    text: 'Then there was neither non-existence nor existence; there was no realm of air, no sky beyond. What stirred? Where? In whose shelter? Was there water, bottomless and deep? Who truly knows? Who shall here declare it — whence it was born, whence this creation? The gods came after this world\'s creation. Who knows, then, whence it has arisen?' },
  { id: 'purusha', title: 'Purusha Sukta', reference: 'Rig Veda 10.90', duration: 9, audio: true,
    text: 'The Cosmic Person has a thousand heads, a thousand eyes, a thousand feet. He pervades the earth on every side, extending ten finger-breadths beyond. All this — what has been and what shall be — is the Purusha.' },
  { id: 'shanti', title: 'Saha Navavatu — Shanti Mantra', reference: 'Taittiriya Up. 2.2.2', duration: 2, audio: true,
    sanskrit: 'ॐ सह नाववतु। सह नौ भुनक्तु। सह वीर्यं करवावहै। तेजस्विनावधीतमस्तु मा विद्विषावहै॥',
    text: 'May He protect us both, may He nourish us both, may we work together with great energy; may our study be vigorous and effective; may we not hate one another. Om peace, peace, peace.' },
  { id: 'sarvesham', title: 'Sarveshaam Svastir Bhavatu', reference: 'Brihadaranyaka Up.', duration: 2, audio: true,
    sanskrit: 'सर्वेषां स्वस्तिर्भवतु। सर्वेषां शान्तिर्भवतु। सर्वेषां पूर्णं भवतु। सर्वेषां मङ्गलं भवतु।',
    text: 'May all be well; may all be at peace; may all be whole; may all be auspicious.' },
  { id: 'mrityunjaya', title: 'Maha Mrityunjaya Mantra', reference: 'Rig Veda 7.59.12', duration: 3, audio: true,
    sanskrit: 'ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम्। उर्वारुकमिव बन्धनान्मृत्योर्मुक्षीय माऽमृतात्॥',
    text: 'We worship the three-eyed One, fragrant, who nourishes all. As the cucumber is released from its stalk, may He release us from death — but not from immortality.' },
  { id: 'sri-sukta', title: 'Sri Sukta — Hymn to Lakshmi', reference: 'Rig Veda Khila', duration: 6,
    text: 'I invoke the resplendent Lakshmi, golden, fawn-coloured, garlanded with gold and silver, radiant as the moon. May she — the bestower of riches, lotus-eyed and benign — come unto me.' },
  { id: 'rudra', title: 'Sri Rudram (extract)', reference: 'Krishna Yajur Veda', duration: 11, audio: true,
    text: 'Salutations to Rudra in your fierce form, salutations to your arrow; salutations to your bow. Salutations to the lord of thieves, lord of beasts, lord of the forests; salutations to the green, the dark, the auspicious.' },
];

// --- Puranas & Itihasa — extended ---
const puranas: Passage[] = [
  { id: 'ramayana-bal', title: 'Ramayana — Bala Kanda', reference: 'Childhood of Rama', duration: 20,
    text: 'In the kingdom of Kosala, on the banks of the Sarayu, stood the city of Ayodhya, ruled by the righteous king Dasharatha. Childless, he performed the great Putrakameshti yajna; from its sacred fire arose a being bearing a vessel of celestial payasam. So were born four sons — Rama, Bharata, Lakshmana, Shatrughna.' },
  { id: 'ramayana-ayodhya', title: 'Ramayana — The Exile', reference: 'Ayodhya Kanda', duration: 18,
    text: 'On the eve of his coronation, Rama was sent to the forest for fourteen years, that his stepmother Kaikeyi might place her son Bharata on the throne. Without a tremor he laid aside his royal robes, and Sita and Lakshmana followed him into the wilderness.' },
  { id: 'sundarakanda', title: 'Sundarakanda — Hanuman\'s Leap', reference: 'Ramayana 5.1', duration: 14, audio: true,
    text: 'Hanuman, recalling the strength he had forgotten, expanded to a mountain\'s size. He pressed his foot on Mount Mahendra, and leapt across the hundred-yojana ocean to Lanka, that he might find Sita and bring word to Rama.' },
  { id: 'mahabharata-udyoga', title: 'Mahabharata — Krishna\'s Peace Mission', reference: 'Udyoga Parva', duration: 24,
    text: 'Krishna travelled to Hastinapura as envoy of the Pandavas, asking only five villages — and was refused. When Duryodhana sought to bind him, Krishna revealed his Vishvarupa, the universal form, and the council shielded its eyes.' },
  { id: 'bhagavata-10', title: 'Bhagavata Purana — Krishna in Vrindavan', reference: 'Canto 10', duration: 18, audio: true,
    text: 'In the forests of Vrindavan, the cowherd boys ran with the calves; Krishna played the flute, and the world stood still. Gopis left their homes by night to dance the Rasa-lila on the banks of the Yamuna; for one whose heart is taken by Krishna, no other tie remains.' },
  { id: 'bhagavata-prahlada', title: 'Prahlada and Narasimha', reference: 'Bhagavata 7.8', duration: 12,
    text: 'Hiranyakashipu, who could not be slain by man or beast, by day or night, indoors or out, struck the pillar in fury — and out of it sprang Narasimha, neither man nor lion, at twilight, on the threshold, and laid the demon across His lap.' },
  { id: 'ganesha-purana', title: 'Why Ganesha Has an Elephant\'s Head', reference: 'Shiva Purana', duration: 8,
    text: 'Parvati fashioned a boy from the turmeric of her body, and set him to guard her door. When Shiva returned, the boy refused him entry; in anger Shiva severed his head. Seeing Parvati\'s grief, Shiva placed upon him the head of the first being he met — an elephant — and called him Ganesha, lord of beginnings.' },
];

// --- New: Yoga Sutras of Patanjali ---
const yogasutras: Passage[] = [
  { id: 'ys-1-1', title: '“Now, the teaching of yoga.”', reference: 'Yoga Sutras 1.1', duration: 1, audio: true,
    sanskrit: 'अथ योगानुशासनम्।',
    text: 'Now, the discipline of yoga is taught.' },
  { id: 'ys-1-2', title: 'The Definition of Yoga', reference: 'Yoga Sutras 1.2', duration: 2, audio: true,
    sanskrit: 'योगश्चित्तवृत्तिनिरोधः।',
    text: 'Yoga is the stilling of the modifications of the mind.',
    commentary: 'Patanjali\'s most famous sutra. When the rippling stops, the depth becomes visible.' },
  { id: 'ys-1-12', title: 'Practice and Non-attachment', reference: 'Yoga Sutras 1.12', duration: 2,
    sanskrit: 'अभ्यासवैराग्याभ्यां तन्निरोधः।',
    text: 'Their stilling is by practice (abhyasa) and non-attachment (vairagya).' },
  { id: 'ys-2-29', title: 'The Eight Limbs', reference: 'Yoga Sutras 2.29', duration: 3, audio: true,
    sanskrit: 'यम नियम आसन प्राणायाम प्रत्याहार धारणा ध्यान समाधयोऽष्टावङ्गानि।',
    text: 'The eight limbs of yoga are: yama (restraints), niyama (observances), asana (posture), pranayama (breath), pratyahara (withdrawal), dharana (concentration), dhyana (meditation), samadhi (absorption).' },
  { id: 'ys-2-46', title: 'On Asana', reference: 'Yoga Sutras 2.46', duration: 1,
    sanskrit: 'स्थिरसुखमासनम्।',
    text: 'Posture should be steady and comfortable.' },
];

// --- New: Hanuman Chalisa selections ---
const chalisa: Passage[] = [
  { id: 'hc-opening', title: 'Doha — Opening', reference: 'Hanuman Chalisa', duration: 2, audio: true,
    sanskrit: 'श्रीगुरु चरन सरोज रज निज मनु मुकुरु सुधारि।',
    text: 'Cleansing the mirror of my mind with the dust of my Guru\'s lotus feet, I describe the unblemished glory of Rama, the bestower of the four fruits of life.' },
  { id: 'hc-1', title: 'Verse 1 — Jai Hanuman', reference: 'Hanuman Chalisa 1', duration: 1, audio: true,
    sanskrit: 'जय हनुमान ज्ञान गुन सागर। जय कपीस तिहुँ लोक उजागर॥',
    text: 'Victory to Hanuman, ocean of wisdom and virtue; victory to the lord of the monkeys, illuminator of the three worlds.' },
  { id: 'hc-7', title: 'Verse 7 — The Devoted Messenger', reference: 'Hanuman Chalisa 7', duration: 1,
    text: 'You found Sita and burned Lanka; without your aid, Rama would not have crossed the sea.' },
  { id: 'hc-closing', title: 'Closing Doha', reference: 'Hanuman Chalisa', duration: 1, audio: true,
    sanskrit: 'पवनतनय संकट हरन मंगल मूरति रूप।',
    text: 'O son of the wind, remover of distress, embodiment of auspiciousness — dwell with Rama, Lakshmana and Sita in my heart.' },
];

// --- New: Vishnu Sahasranama selections ---
const sahasranama: Passage[] = [
  { id: 'vs-dhyanam', title: 'Dhyanam — Meditation Verse', reference: 'Vishnu Sahasranama', duration: 3, audio: true,
    sanskrit: 'शान्ताकारं भुजगशयनं पद्मनाभं सुरेशम्।',
    text: 'I meditate upon Vishnu, of peaceful form, reclining on the serpent of eternity, the lotus-naveled lord of gods, the supporter of the universe, of the colour of the cloud, of beautiful limbs, beloved of Lakshmi.' },
  { id: 'vs-phala', title: 'The Fruit of Recitation', reference: 'Phala Sruti', duration: 2,
    text: 'Whoever recites these thousand names of Vishnu daily, with devotion, attains lasting fame, prosperity, freedom from sorrow, and finally union with Him.' },
];

export const SCRIPTURES: Book[] = [
  { id: 'gita', title: 'Bhagavad Gita', subtitle: `${gita.length} passages · The Song of the Lord`, passages: gita },
  { id: 'upanishads', title: 'Principal Upanishads', subtitle: `${upanishads.length} dialogues · the end of the Vedas`, passages: upanishads },
  { id: 'vedas', title: 'The Vedas', subtitle: `${vedas.length} hymns · Rig, Sama, Yajur, Atharva`, passages: vedas },
  { id: 'puranas', title: 'Puranas & Itihasa', subtitle: `${puranas.length} stories · dharma in narrative`, passages: puranas },
  { id: 'yogasutras', title: 'Yoga Sutras of Patanjali', subtitle: `${yogasutras.length} aphorisms · the science of the mind`, passages: yogasutras },
  { id: 'chalisa', title: 'Hanuman Chalisa', subtitle: '40 verses by Tulsidas', passages: chalisa },
  { id: 'sahasranama', title: 'Vishnu Sahasranama', subtitle: 'The thousand names — selections', passages: sahasranama },
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
  { id: 'patanjali-21', title: 'Yoga Sutras in 21 days', days: 21, daily: 5, description: 'A sutra a day from Patanjali\'s manual of the mind.' },
  { id: 'chalisa-7', title: 'Hanuman Chalisa — a week', days: 7, daily: 4, description: 'Live with one Tulsi verse a day; recite at dusk.' },
  { id: 'ramayana-21', title: 'Ramayana in 21 days', days: 21, daily: 15, description: 'From Ayodhya to Lanka — Valmiki\'s epic, distilled.' },
];

export interface Collection {
  id: string;
  title: string;
  description: string;
  passageIds: string[];
  hue: number;
}

export const COLLECTIONS: Collection[] = [
  { id: 'dharma', title: 'On Dharma', description: 'Krishna on duty, conduct, and right action.', passageIds: ['gita-2-47', 'gita-3', 'gita-3-21', 'gita-18'], hue: 210 },
  { id: 'bhakti', title: 'The Path of Bhakti', description: 'Devotion as a doorway to the divine.', passageIds: ['gita-9-22', 'gita-9-26', 'bhagavata-10', 'purusha', 'hc-1'], hue: 28 },
  { id: 'self', title: 'Knowing the Self', description: 'Upanishadic verses on the Atman.', passageIds: ['katha', 'katha-2', 'mandukya', 'mundaka', 'chandogya', 'brihadaranyaka'], hue: 270 },
  { id: 'peace', title: 'Mantras of Peace', description: 'Shanti mantras to open and close every gathering.', passageIds: ['shanti', 'sarvesham', 'mrityunjaya', 'gayatri'], hue: 150 },
  { id: 'hanuman', title: 'In Praise of Hanuman', description: 'For courage, devotion, and the breaking of obstacles.', passageIds: ['hc-opening', 'hc-1', 'hc-7', 'hc-closing', 'sundarakanda'], hue: 12 },
  { id: 'yoga', title: 'The Inner Discipline', description: 'Patanjali and the Gita on stilling the mind.', passageIds: ['ys-1-2', 'ys-2-29', 'gita-6', 'gita-6-30'], hue: 195 },
];

export const findPassage = (id: string): Passage | undefined => {
  for (const b of SCRIPTURES) {
    const p = b.passages.find(x => x.id === id);
    if (p) return p;
  }
  return undefined;
};
