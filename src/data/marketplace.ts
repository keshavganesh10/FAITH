import type { FaithId } from './faiths';

export type ProductCategory = 'festival-kits' | 'ornaments' | 'prayer-items' | 'books';

export interface Product {
  id: string;
  faith: FaithId | 'all';
  category: ProductCategory;
  name: string;
  vendor: string;
  vendorCity: string;
  price: number;       // GBP
  emoji: string;
  description: string;
  seasonal?: string;   // festival tag
}

export const CATEGORY_LABELS: Record<ProductCategory, string> = {
  'festival-kits': 'Festival Kits',
  'ornaments': 'Ornaments',
  'prayer-items': 'Prayer Items',
  'books': 'Books',
};

export const PRODUCTS: Product[] = [
  { id: 'p1', faith: 'hinduism', category: 'festival-kits', name: 'Diwali Puja Kit',
    vendor: 'Anjali Crafts', vendorCity: 'Leicester', price: 34.0, emoji: '🪔',
    description: 'Brass diyas, incense, kumkum, rice and a pocket Lakshmi prayer card — everything for a home Diwali puja.',
    seasonal: 'Diwali' },
  { id: 'p2', faith: 'hinduism', category: 'ornaments', name: 'Hand-painted Toran',
    vendor: 'Gokul Decor', vendorCity: 'Birmingham', price: 18.5, emoji: '🌺',
    description: 'A door-hanging with marigolds and bells, hand-painted by artisans.' },
  { id: 'p3', faith: 'christianity', category: 'festival-kits', name: 'Advent Candle Set',
    vendor: 'Evergreen Workshop', vendorCity: 'York', price: 22.0, emoji: '🕯️',
    description: 'Four purple and one rose candle with a wooden wreath base.', seasonal: 'Advent' },
  { id: 'p4', faith: 'islam', category: 'prayer-items', name: 'Hand-knotted Prayer Mat',
    vendor: 'Noor Textiles', vendorCity: 'Bradford', price: 45.0, emoji: '🕌',
    description: 'A soft velvet prayer mat with traditional geometric patterning.' },
  { id: 'p5', faith: 'islam', category: 'festival-kits', name: 'Ramadan Iftar Box',
    vendor: 'Barakah Foods', vendorCity: 'London', price: 28.0, emoji: '🌙',
    description: 'Dates, dried fruit, rose syrup and a daily reflection booklet.', seasonal: 'Ramadan' },
  { id: 'p6', faith: 'sikhism', category: 'prayer-items', name: 'Cotton Rumāla Sahib',
    vendor: 'Khalsa Crafts', vendorCity: 'Wolverhampton', price: 32.0, emoji: '📿',
    description: 'A respectful covering, finely embroidered.' },
  { id: 'p7', faith: 'buddhism', category: 'ornaments', name: 'Brass Singing Bowl',
    vendor: 'Lotus & Stone', vendorCity: 'Bristol', price: 39.0, emoji: '🔔',
    description: 'A 5-inch hand-hammered bowl with mallet, for meditation practice.' },
  { id: 'p8', faith: 'judaism', category: 'festival-kits', name: 'Hanukkah Menorah Set',
    vendor: 'Shalom House', vendorCity: 'Manchester', price: 48.0, emoji: '🕎',
    description: 'A brass nine-branch menorah with a box of coloured candles.', seasonal: 'Hanukkah' },
  { id: 'p9', faith: 'all', category: 'books', name: 'World Scriptures: A Reader',
    vendor: 'Open Page Press', vendorCity: 'Edinburgh', price: 16.0, emoji: '📖',
    description: 'Curated short passages from every major tradition, with brief commentary.' },
  { id: 'p10', faith: 'christianity', category: 'ornaments', name: 'Olivewood Cross',
    vendor: 'Bethlehem Artisans', vendorCity: 'London', price: 14.0, emoji: '✝️',
    description: 'Hand-carved from olive wood by a fair-trade cooperative.' },
];
