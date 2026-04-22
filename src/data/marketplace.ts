import type { FaithId } from './faiths';

export type ProductCategory = 'festival-kits' | 'ornaments' | 'prayer-items' | 'books';

export interface Product {
  id: string;
  faith: FaithId | 'all';
  category: ProductCategory;
  name: string;
  vendor: string;        // matches Vendor.name
  vendorCity: string;
  price: number;         // GBP
  emoji: string;
  image: string;         // photo
  description: string;
  seasonal?: string;
}

export interface Vendor {
  id: string;
  name: string;
  city: string;
  bio: string;
  avatar: string;
  lat: number;
  lng: number;
  rating: number;        // 0-5
  craft: string;         // e.g. "Brass · Devotional"
}

export const CATEGORY_LABELS: Record<ProductCategory, string> = {
  'festival-kits': 'Festival Kits',
  'ornaments': 'Ornaments',
  'prayer-items': 'Prayer Items',
  'books': 'Books',
};

export const VENDORS: Vendor[] = [
  { id: 'v1', name: 'Anjali Crafts', city: 'Leicester',
    bio: 'Mother–daughter studio making brass diyas and puja kits since 1998.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
    lat: 52.6369, lng: -1.1398, rating: 4.9, craft: 'Brass · Puja' },
  { id: 'v2', name: 'Gokul Decor', city: 'Birmingham',
    bio: 'Hand-painted door hangings and home decor by a small artisan team.',
    avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&h=200&fit=crop',
    lat: 52.4862, lng: -1.8904, rating: 4.7, craft: 'Textiles · Decor' },
  { id: 'v3', name: 'Evergreen Workshop', city: 'York',
    bio: 'Family-run candlemakers crafting Advent and liturgical sets.',
    avatar: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=200&h=200&fit=crop',
    lat: 53.9590, lng: -1.0815, rating: 4.8, craft: 'Candles · Liturgy' },
  { id: 'v4', name: 'Noor Textiles', city: 'Bradford',
    bio: 'Velvet prayer mats hand-knotted by women co-op weavers.',
    avatar: 'https://images.unsplash.com/photo-1542816417-0983c9c9ad53?w=200&h=200&fit=crop',
    lat: 53.7960, lng: -1.7594, rating: 4.9, craft: 'Textiles · Prayer mats' },
  { id: 'v5', name: 'Barakah Foods', city: 'London',
    bio: 'Ramadan and iftar food gifts, fair-trade dates and rose syrups.',
    avatar: 'https://images.unsplash.com/photo-1593007677747-e8e8b3a78d2e?w=200&h=200&fit=crop',
    lat: 51.5074, lng: -0.1278, rating: 4.6, craft: 'Food · Gifting' },
  { id: 'v6', name: 'Khalsa Crafts', city: 'Wolverhampton',
    bio: 'Embroidered rumālas and seva supplies by a sevadar family.',
    avatar: 'https://images.unsplash.com/photo-1548142813-c348350df52b?w=200&h=200&fit=crop',
    lat: 52.5862, lng: -2.1288, rating: 4.8, craft: 'Embroidery · Seva' },
  { id: 'v7', name: 'Lotus & Stone', city: 'Bristol',
    bio: 'Hand-hammered singing bowls and meditation tools.',
    avatar: 'https://images.unsplash.com/photo-1545389336-cf090694435e?w=200&h=200&fit=crop',
    lat: 51.4545, lng: -2.5879, rating: 4.9, craft: 'Brass · Meditation' },
  { id: 'v8', name: 'Shalom House', city: 'Manchester',
    bio: 'Hanukkah, Pesach and Shabbat household pieces.',
    avatar: 'https://images.unsplash.com/photo-1591128846807-1f9f87b73f80?w=200&h=200&fit=crop',
    lat: 53.4808, lng: -2.2426, rating: 4.7, craft: 'Brass · Judaica' },
  { id: 'v9', name: 'Open Page Press', city: 'Edinburgh',
    bio: 'Independent publisher of interfaith and contemplative books.',
    avatar: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=200&h=200&fit=crop',
    lat: 55.9533, lng: -3.1883, rating: 4.8, craft: 'Books · Press' },
  { id: 'v10', name: 'Bethlehem Artisans', city: 'London',
    bio: 'Olivewood pieces from a fair-trade Palestinian co-op.',
    avatar: 'https://images.unsplash.com/photo-1438032005730-c779502df39b?w=200&h=200&fit=crop',
    lat: 51.5074, lng: -0.1278, rating: 4.9, craft: 'Olivewood · Fair-trade' },
];

export const PRODUCTS: Product[] = [
  { id: 'p1', faith: 'hinduism', category: 'festival-kits', name: 'Diwali Puja Kit',
    vendor: 'Anjali Crafts', vendorCity: 'Leicester', price: 34.0, emoji: '🪔',
    image: 'https://images.unsplash.com/photo-1605302301730-9d1f1d3e3a93?w=600&h=600&fit=crop',
    description: 'Brass diyas, incense, kumkum, rice and a pocket Lakshmi prayer card — everything for a home Diwali puja.',
    seasonal: 'Diwali' },
  { id: 'p2', faith: 'hinduism', category: 'ornaments', name: 'Hand-painted Toran',
    vendor: 'Gokul Decor', vendorCity: 'Birmingham', price: 18.5, emoji: '🌺',
    image: 'https://images.unsplash.com/photo-1574236170880-faaf5fbe73d6?w=600&h=600&fit=crop',
    description: 'A door-hanging with marigolds and bells, hand-painted by artisans.' },
  { id: 'p3', faith: 'christianity', category: 'festival-kits', name: 'Advent Candle Set',
    vendor: 'Evergreen Workshop', vendorCity: 'York', price: 22.0, emoji: '🕯️',
    image: 'https://images.unsplash.com/photo-1507692049790-de58290a4334?w=600&h=600&fit=crop',
    description: 'Four purple and one rose candle with a wooden wreath base.', seasonal: 'Advent' },
  { id: 'p4', faith: 'islam', category: 'prayer-items', name: 'Hand-knotted Prayer Mat',
    vendor: 'Noor Textiles', vendorCity: 'Bradford', price: 45.0, emoji: '🕌',
    image: 'https://images.unsplash.com/photo-1542816417-0983c9c9ad53?w=600&h=600&fit=crop',
    description: 'A soft velvet prayer mat with traditional geometric patterning.' },
  { id: 'p5', faith: 'islam', category: 'festival-kits', name: 'Ramadan Iftar Box',
    vendor: 'Barakah Foods', vendorCity: 'London', price: 28.0, emoji: '🌙',
    image: 'https://images.unsplash.com/photo-1593007677747-e8e8b3a78d2e?w=600&h=600&fit=crop',
    description: 'Dates, dried fruit, rose syrup and a daily reflection booklet.', seasonal: 'Ramadan' },
  { id: 'p6', faith: 'sikhism', category: 'prayer-items', name: 'Cotton Rumāla Sahib',
    vendor: 'Khalsa Crafts', vendorCity: 'Wolverhampton', price: 32.0, emoji: '📿',
    image: 'https://images.unsplash.com/photo-1609938733512-bb70bc77c8c5?w=600&h=600&fit=crop',
    description: 'A respectful covering, finely embroidered.' },
  { id: 'p7', faith: 'buddhism', category: 'ornaments', name: 'Brass Singing Bowl',
    vendor: 'Lotus & Stone', vendorCity: 'Bristol', price: 39.0, emoji: '🔔',
    image: 'https://images.unsplash.com/photo-1545389336-cf090694435e?w=600&h=600&fit=crop',
    description: 'A 5-inch hand-hammered bowl with mallet, for meditation practice.' },
  { id: 'p8', faith: 'judaism', category: 'festival-kits', name: 'Hanukkah Menorah Set',
    vendor: 'Shalom House', vendorCity: 'Manchester', price: 48.0, emoji: '🕎',
    image: 'https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=600&h=600&fit=crop',
    description: 'A brass nine-branch menorah with a box of coloured candles.', seasonal: 'Hanukkah' },
  { id: 'p9', faith: 'all', category: 'books', name: 'World Scriptures: A Reader',
    vendor: 'Open Page Press', vendorCity: 'Edinburgh', price: 16.0, emoji: '📖',
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&h=600&fit=crop',
    description: 'Curated short passages from every major tradition, with brief commentary.' },
  { id: 'p10', faith: 'christianity', category: 'ornaments', name: 'Olivewood Cross',
    vendor: 'Bethlehem Artisans', vendorCity: 'London', price: 14.0, emoji: '✝️',
    image: 'https://images.unsplash.com/photo-1438032005730-c779502df39b?w=600&h=600&fit=crop',
    description: 'Hand-carved from olive wood by a fair-trade cooperative.' },
  { id: 'p11', faith: 'hinduism', category: 'prayer-items', name: 'Sandalwood Mala',
    vendor: 'Gokul Decor', vendorCity: 'Birmingham', price: 24.0, emoji: '📿',
    image: 'https://images.unsplash.com/photo-1604908554049-fc46f15bd95e?w=600&h=600&fit=crop',
    description: '108 sandalwood beads, hand-strung with a tassel — for daily japa.' },
  { id: 'p12', faith: 'islam', category: 'books', name: "Children's Stories of the Prophets",
    vendor: 'Open Page Press', vendorCity: 'Edinburgh', price: 19.0, emoji: '📚',
    image: 'https://images.unsplash.com/photo-1591824438708-ce405f36ba3d?w=600&h=600&fit=crop',
    description: 'Beautifully illustrated stories for ages 6+.' },
  { id: 'p13', faith: 'buddhism', category: 'books', name: 'The Dhammapada — Pocket Edition',
    vendor: 'Open Page Press', vendorCity: 'Edinburgh', price: 12.0, emoji: '📖',
    image: 'https://images.unsplash.com/photo-1532375672259-d2b1d7a02f9b?w=600&h=600&fit=crop',
    description: 'A small-format edition with a contemporary translation.' },
  { id: 'p14', faith: 'sikhism', category: 'books', name: 'Japji Sahib — Dual Script',
    vendor: 'Open Page Press', vendorCity: 'Edinburgh', price: 14.0, emoji: '📕',
    image: 'https://images.unsplash.com/photo-1609938733512-bb70bc77c8c5?w=600&h=600&fit=crop',
    description: 'Gurmukhi and English side-by-side with brief commentary.' },
];

export const getVendor = (name: string): Vendor | undefined =>
  VENDORS.find(v => v.name === name);
