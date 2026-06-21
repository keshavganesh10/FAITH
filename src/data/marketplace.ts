// UK-based Hindu puja & festival marketplace.

export type Category = 'Puja Thalis' | 'Murtis' | 'Incense & Oils' | 'Festival Items' | 'Books' | 'Apparel';

export interface Vendor {
  id: string;
  name: string;
  city: string;
  rating: number;
  reviews: number;
  blurb: string;
  lat: number;
  lng: number;
}

export interface Product {
  id: string;
  name: string;
  category: Category;
  vendorId: string;
  price: number;            // GBP
  emoji: string;
  image?: string;
  seasonal?: 'Diwali' | 'Navratri' | 'Holi' | 'Janmashtami';
  description: string;
  rating: number;
  reviews: number;
}

const img = (q: string, sig: number) =>
  `https://images.unsplash.com/photo-${q}?auto=format&fit=crop&w=600&q=70&sig=${sig}`;

export const VENDORS: Vendor[] = [
  { id: 'v-pooja-london', name: 'Pooja Bazaar London', city: 'Wembley, London', rating: 4.8, reviews: 412,
    blurb: 'Family-run since 1991. Largest selection of brass murtis in West London.', lat: 51.5582, lng: -0.2964 },
  { id: 'v-shree-bham', name: 'Shree Mandir Supplies', city: 'Birmingham', rating: 4.7, reviews: 287,
    blurb: 'Wholesale puja items at retail-friendly prices. NHSF partner.', lat: 52.4862, lng: -1.8904 },
  { id: 'v-divine-leics', name: 'Divine Touch Leicester', city: 'Leicester', rating: 4.9, reviews: 631,
    blurb: 'Curated Belgaum brass and South Indian bronze.', lat: 52.6369, lng: -1.1398 },
  { id: 'v-aroma-mcr', name: 'Aroma House Manchester', city: 'Manchester', rating: 4.6, reviews: 198,
    blurb: 'Hand-rolled incense, cold-pressed oils, organic dhoop.', lat: 53.4808, lng: -2.2426 },
  { id: 'v-vedic-books', name: 'Vedic Books UK', city: 'Online · ships UK-wide', rating: 4.9, reviews: 1124,
    blurb: 'English translations of every major sampradaya.', lat: 51.5074, lng: -0.1278 },
];

export const PRODUCTS: Product[] = [
  { id: 'p-thali-brass', name: 'Hand-etched Brass Puja Thali Set', category: 'Puja Thalis', vendorId: 'v-divine-leics',
    price: 38.00, emoji: '🪔', rating: 4.9, reviews: 142,
    image: img('1604608672516-f1d2f49bc31a', 11),
    description: '7-piece set: thali, kalash, ghee diya, agarbatti stand, kumkum-haldi katoris and bell. Hand-etched in Belgaum.' },
  { id: 'p-murti-ganesh', name: 'Marble Ganesha Murti — 6 inch', category: 'Murtis', vendorId: 'v-pooja-london',
    price: 65.00, emoji: '🐘', rating: 4.8, reviews: 89,
    image: img('1582553081398-7d1bb1f93a9c', 12),
    description: 'White Makrana marble Ganesha, suitable for home mandir. Hand-painted gold detailing.' },
  { id: 'p-murti-krishna', name: 'Brass Bal Krishna with Flute', category: 'Murtis', vendorId: 'v-divine-leics',
    price: 42.00, emoji: '🪈', rating: 4.9, reviews: 67,
    image: img('1606293459339-aa5d34a7b0e1', 13),
    description: 'Solid brass, 5 inches. Comes with a velvet asana mat.' },
  { id: 'p-incense-chandan', name: 'Chandan Hand-rolled Agarbatti (pack of 12)', category: 'Incense & Oils', vendorId: 'v-aroma-mcr',
    price: 9.50, emoji: '🪵', rating: 4.7, reviews: 320,
    image: img('1602874801006-9c75e54ed3f3', 14),
    description: 'Real Mysore sandalwood, no chemicals. 40-minute burn per stick.' },
  { id: 'p-oil-til', name: 'Cold-pressed Til Oil for Diya — 500ml', category: 'Incense & Oils', vendorId: 'v-aroma-mcr',
    price: 12.00, emoji: '🛢️', rating: 4.6, reviews: 88,
    description: 'Traditional sesame oil for daily diya lighting. Smokeless burn.' },
  { id: 'p-diwali-kit', name: 'Diwali Home Kit', category: 'Festival Items', vendorId: 'v-pooja-london',
    price: 45.00, emoji: '🎆', rating: 4.9, reviews: 210, seasonal: 'Diwali',
    image: img('1572979441-d3b3f8e5fae0', 15),
    description: 'Lakshmi-Ganesh idols, 24 clay diyas, rangoli powders (5 colours), wicks and toran.' },
  { id: 'p-holi-colours', name: 'Organic Gulal — 8 colours', category: 'Festival Items', vendorId: 'v-shree-bham',
    price: 18.00, emoji: '🌈', rating: 4.7, reviews: 156, seasonal: 'Holi',
    image: img('1521120098171-d4cd1a6b35e2', 16),
    description: 'Cornflour-based, skin-safe, washes out of clothes. 100g of each colour.' },
  { id: 'p-navratri-chania', name: 'Navratri Chaniya Choli', category: 'Apparel', vendorId: 'v-shree-bham',
    price: 89.00, emoji: '👗', rating: 4.8, reviews: 64, seasonal: 'Navratri',
    description: 'Hand-mirrored Gujarati chaniya choli. Three-piece set, available sizes XS–XL.' },
  { id: 'p-gita-as-it-is', name: 'Bhagavad Gita As It Is (English)', category: 'Books', vendorId: 'v-vedic-books',
    price: 19.99, emoji: '📖', rating: 4.9, reviews: 982,
    description: 'Word-for-word Sanskrit, translation and Srila Prabhupada\'s commentary. 900 pages, hardback.' },
  { id: 'p-upanishads', name: 'The Principal Upanishads — Easwaran', category: 'Books', vendorId: 'v-vedic-books',
    price: 14.50, emoji: '📚', rating: 4.8, reviews: 412,
    description: 'Eknath Easwaran\'s clear, contemplative translation. Penguin Classics edition.' },
  { id: 'p-rudraksha', name: 'Rudraksha Mala — 108 beads', category: 'Apparel', vendorId: 'v-divine-leics',
    price: 28.00, emoji: '📿', rating: 4.7, reviews: 178,
    description: 'Genuine 5-mukhi Nepali rudraksha, knotted on cotton thread for japa.' },
  { id: 'p-janmashtami', name: 'Janmashtami Jhula Set', category: 'Festival Items', vendorId: 'v-pooja-london',
    price: 32.00, emoji: '🌙', rating: 4.8, reviews: 41, seasonal: 'Janmashtami',
    description: 'Decorated cradle for Bal Krishna with cushion, peacock-feather garland and bells.' },
];

export const CATEGORIES: Category[] = ['Puja Thalis', 'Murtis', 'Incense & Oils', 'Festival Items', 'Books', 'Apparel'];

export const findVendor = (id: string) => VENDORS.find(v => v.id === id);
export const findProduct = (id: string) => PRODUCTS.find(p => p.id === id);
