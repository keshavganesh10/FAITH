// UK-based Hindu puja & festival marketplace.

export type Category = 'Puja Thalis' | 'Murtis' | 'Incense & Oils' | 'Festival Items' | 'Books' | 'Apparel' | 'Sweets & Prasad' | 'Jewellery';

export interface Vendor {
  id: string;
  name: string;
  city: string;
  rating: number;
  reviews: number;
  blurb: string;
  lat: number;
  lng: number;
  logo?: string;
}

export interface Product {
  id: string;
  name: string;
  category: Category;
  vendorId: string;
  price: number;
  emoji: string;
  image?: string;
  seasonal?: 'Diwali' | 'Navratri' | 'Holi' | 'Janmashtami' | 'Raksha Bandhan';
  description: string;
  rating: number;
  reviews: number;
}

const img = (kw: string, seed: number, w = 600, h = 600) =>
  `https://loremflickr.com/${w}/${h}/${kw}?lock=${seed}`;
const logo = (kw: string, seed: number) =>
  `https://loremflickr.com/200/200/${kw}?lock=${seed}`;

export const VENDORS: Vendor[] = [
  { id: 'v-pooja-london', name: 'Pooja Bazaar London', city: 'Wembley, London', rating: 4.8, reviews: 412,
    blurb: 'Family-run since 1991. Largest selection of brass murtis in West London.', lat: 51.5582, lng: -0.2964,
    logo: logo('shop,indian', 201) },
  { id: 'v-shree-bham', name: 'Shree Mandir Supplies', city: 'Birmingham', rating: 4.7, reviews: 287,
    blurb: 'Wholesale puja items at retail-friendly prices. NHSF partner.', lat: 52.4862, lng: -1.8904,
    logo: logo('temple,brass', 202) },
  { id: 'v-divine-leics', name: 'Divine Touch Leicester', city: 'Leicester', rating: 4.9, reviews: 631,
    blurb: 'Curated Belgaum brass and South Indian bronze.', lat: 52.6369, lng: -1.1398,
    logo: logo('brass,statue', 203) },
  { id: 'v-aroma-mcr', name: 'Aroma House Manchester', city: 'Manchester', rating: 4.6, reviews: 198,
    blurb: 'Hand-rolled incense, cold-pressed oils, organic dhoop.', lat: 53.4808, lng: -2.2426,
    logo: logo('incense,sandalwood', 204) },
  { id: 'v-vedic-books', name: 'Vedic Books UK', city: 'Online · ships UK-wide', rating: 4.9, reviews: 1124,
    blurb: 'English translations of every major sampradaya.', lat: 51.5074, lng: -0.1278,
    logo: logo('book,sanskrit', 205) },
  { id: 'v-mithai-soho', name: 'Mithai Junction Southall', city: 'Southall, London', rating: 4.8, reviews: 892,
    blurb: 'Fresh mithai daily. Diwali hampers ship UK-wide.', lat: 51.5074, lng: -0.3789,
    logo: logo('sweets,mithai', 206) },
  { id: 'v-saree-bham', name: 'Resham Sarees', city: 'Soho Road, Birmingham', rating: 4.7, reviews: 524,
    blurb: 'Chaniya cholis, sarees and kurtas for every occasion.', lat: 52.4970, lng: -1.9120,
    logo: logo('saree,fabric', 207) },
];

export const PRODUCTS: Product[] = [
  { id: 'p-thali-brass', name: 'Hand-etched Brass Puja Thali Set', category: 'Puja Thalis', vendorId: 'v-divine-leics',
    price: 38.00, emoji: '🪔', rating: 4.9, reviews: 142, image: img('puja,thali,brass', 301),
    description: '7-piece set: thali, kalash, ghee diya, agarbatti stand, kumkum-haldi katoris and bell. Hand-etched in Belgaum.' },
  { id: 'p-thali-silver', name: 'Silver-Plated Pooja Thali — Premium', category: 'Puja Thalis', vendorId: 'v-pooja-london',
    price: 72.00, emoji: '🥈', rating: 4.8, reviews: 64, image: img('silver,thali,puja', 302),
    description: 'Heavy silver-plated thali with engraved Om motif. Includes matching diya and incense stand.' },
  { id: 'p-thali-copper', name: 'Copper Pancha Patra Set', category: 'Puja Thalis', vendorId: 'v-shree-bham',
    price: 24.50, emoji: '🟤', rating: 4.6, reviews: 88, image: img('copper,pot,puja', 303),
    description: 'Traditional copper achamana set — pancha patra, uddharani and arghya patra. South Indian style.' },
  { id: 'p-murti-ganesh', name: 'Marble Ganesha Murti — 6 inch', category: 'Murtis', vendorId: 'v-pooja-london',
    price: 65.00, emoji: '🐘', rating: 4.8, reviews: 89, image: img('ganesha,marble,statue', 304),
    description: 'White Makrana marble Ganesha, suitable for home mandir. Hand-painted gold detailing.' },
  { id: 'p-murti-krishna', name: 'Brass Bal Krishna with Flute', category: 'Murtis', vendorId: 'v-divine-leics',
    price: 42.00, emoji: '🪈', rating: 4.9, reviews: 67, image: img('krishna,brass,statue', 305),
    description: 'Solid brass, 5 inches. Comes with a velvet asana mat.' },
  { id: 'p-murti-lakshmi', name: 'Lakshmi-Saraswati-Ganesha Trio', category: 'Murtis', vendorId: 'v-pooja-london',
    price: 95.00, emoji: '🪷', rating: 4.9, reviews: 134, image: img('lakshmi,hindu,goddess', 306),
    description: 'The classic Diwali puja trio in resin with marble finish. 8 inches each.' },
  { id: 'p-murti-shiva', name: 'Nataraja — Dancing Shiva Bronze', category: 'Murtis', vendorId: 'v-divine-leics',
    price: 145.00, emoji: '🕺', rating: 4.9, reviews: 41, image: img('nataraja,shiva,bronze', 307),
    description: 'South Indian lost-wax cast bronze Nataraja. 10 inches, ready to display.' },
  { id: 'p-murti-hanuman', name: 'Sindoor Hanuman Murti', category: 'Murtis', vendorId: 'v-shree-bham',
    price: 38.00, emoji: '🙏', rating: 4.7, reviews: 56, image: img('hanuman,statue,red', 308),
    description: 'Traditional sindoor-coated Hanuman in flying posture. 7 inches.' },
  { id: 'p-incense-chandan', name: 'Chandan Hand-rolled Agarbatti (pack of 12)', category: 'Incense & Oils', vendorId: 'v-aroma-mcr',
    price: 9.50, emoji: '🪵', rating: 4.7, reviews: 320, image: img('sandalwood,incense', 309),
    description: 'Real Mysore sandalwood, no chemicals. 40-minute burn per stick.' },
  { id: 'p-incense-loban', name: 'Loban Resin Dhoop — 250g', category: 'Incense & Oils', vendorId: 'v-aroma-mcr',
    price: 11.00, emoji: '🌫️', rating: 4.8, reviews: 142, image: img('frankincense,resin,smoke', 310),
    description: 'Pure benzoin resin for aarti and Navagraha puja. Burn on charcoal disk.' },
  { id: 'p-oil-til', name: 'Cold-pressed Til Oil for Diya — 500ml', category: 'Incense & Oils', vendorId: 'v-aroma-mcr',
    price: 12.00, emoji: '🛢️', rating: 4.6, reviews: 88, image: img('oil,bottle,sesame', 311),
    description: 'Traditional sesame oil for daily diya lighting. Smokeless burn.' },
  { id: 'p-ghee-pure', name: 'A2 Cow Ghee for Aarti — 1L', category: 'Incense & Oils', vendorId: 'v-shree-bham',
    price: 24.00, emoji: '🟡', rating: 4.9, reviews: 412, image: img('ghee,jar,golden', 312),
    description: 'Bilona-churned Gir cow ghee from a UK organic dairy. For diya, abhishekam and prasad.' },
  { id: 'p-diwali-kit', name: 'Diwali Home Kit', category: 'Festival Items', vendorId: 'v-pooja-london',
    price: 45.00, emoji: '🎆', rating: 4.9, reviews: 210, seasonal: 'Diwali', image: img('diwali,diya,lights', 313),
    description: 'Lakshmi-Ganesh idols, 24 clay diyas, rangoli powders (5 colours), wicks and toran.' },
  { id: 'p-diyas-clay', name: '50 Hand-painted Clay Diyas', category: 'Festival Items', vendorId: 'v-shree-bham',
    price: 22.00, emoji: '🪔', rating: 4.8, reviews: 380, seasonal: 'Diwali', image: img('diya,clay,lamp', 314),
    description: 'Hand-painted terracotta diyas in mixed designs. Free wicks included.' },
  { id: 'p-rangoli-kit', name: 'Rangoli Stencil & Powder Kit', category: 'Festival Items', vendorId: 'v-pooja-london',
    price: 15.00, emoji: '🌸', rating: 4.7, reviews: 198, seasonal: 'Diwali', image: img('rangoli,colors,pattern', 315),
    description: '8 reusable stencils with 6 colours of rangoli powder. Beginner-friendly.' },
  { id: 'p-holi-colours', name: 'Organic Gulal — 8 colours', category: 'Festival Items', vendorId: 'v-shree-bham',
    price: 18.00, emoji: '🌈', rating: 4.7, reviews: 156, seasonal: 'Holi', image: img('holi,colors,powder', 316),
    description: 'Cornflour-based, skin-safe, washes out of clothes. 100g of each colour.' },
  { id: 'p-rakhi-set', name: 'Brother-Sister Rakhi Set', category: 'Festival Items', vendorId: 'v-pooja-london',
    price: 14.00, emoji: '🎗️', rating: 4.8, reviews: 76, seasonal: 'Raksha Bandhan', image: img('rakhi,thread,gold', 317),
    description: 'Pair of designer rakhis with roli, chawal and mishri. Ships in a gift box.' },
  { id: 'p-navratri-chania', name: 'Navratri Chaniya Choli', category: 'Apparel', vendorId: 'v-saree-bham',
    price: 89.00, emoji: '👗', rating: 4.8, reviews: 64, seasonal: 'Navratri', image: img('chaniya,choli,gujarati', 318),
    description: 'Hand-mirrored Gujarati chaniya choli. Three-piece set, available sizes XS–XL.' },
  { id: 'p-kurta-men', name: 'Mens Silk Kurta Pyjama', category: 'Apparel', vendorId: 'v-saree-bham',
    price: 65.00, emoji: '👔', rating: 4.7, reviews: 142, image: img('kurta,indian,men', 319),
    description: 'Cream raw-silk kurta with churidar. Sizes S–XXL. Festival-ready.' },
  { id: 'p-saree-banarasi', name: 'Banarasi Silk Saree', category: 'Apparel', vendorId: 'v-saree-bham',
    price: 240.00, emoji: '🥻', rating: 4.9, reviews: 88, image: img('banarasi,saree,silk', 320),
    description: 'Pure Banarasi silk with gold zari work. Includes matching blouse piece.' },
  { id: 'p-gita-as-it-is', name: 'Bhagavad Gita As It Is (English)', category: 'Books', vendorId: 'v-vedic-books',
    price: 19.99, emoji: '📖', rating: 4.9, reviews: 982, image: img('bhagavad,gita,book', 321),
    description: 'Word-for-word Sanskrit, translation and Srila Prabhupada\'s commentary. 900 pages, hardback.' },
  { id: 'p-upanishads', name: 'The Principal Upanishads — Easwaran', category: 'Books', vendorId: 'v-vedic-books',
    price: 14.50, emoji: '📚', rating: 4.8, reviews: 412, image: img('upanishads,book,sanskrit', 322),
    description: 'Eknath Easwaran\'s clear, contemplative translation. Penguin Classics edition.' },
  { id: 'p-ramayan', name: 'Valmiki Ramayana — illustrated', category: 'Books', vendorId: 'v-vedic-books',
    price: 28.00, emoji: '🏹', rating: 4.9, reviews: 256, image: img('ramayana,rama,book', 323),
    description: 'Two-volume hardback with illustrations by Indian classical artists.' },
  { id: 'p-rudraksha', name: 'Rudraksha Mala — 108 beads', category: 'Jewellery', vendorId: 'v-divine-leics',
    price: 28.00, emoji: '📿', rating: 4.7, reviews: 178, image: img('rudraksha,mala,beads', 324),
    description: 'Genuine 5-mukhi Nepali rudraksha, knotted on cotton thread for japa.' },
  { id: 'p-tulsi-mala', name: 'Tulsi Wood Japa Mala', category: 'Jewellery', vendorId: 'v-divine-leics',
    price: 16.00, emoji: '🌿', rating: 4.8, reviews: 234, image: img('tulsi,beads,mala', 325),
    description: 'Sacred Tulsi wood, traditionally used by Vaishnav devotees.' },
  { id: 'p-gold-om', name: 'Gold-plated Om Pendant', category: 'Jewellery', vendorId: 'v-divine-leics',
    price: 32.00, emoji: '🕉️', rating: 4.7, reviews: 96, image: img('om,gold,pendant', 326),
    description: '22k gold-plated sterling silver with 18" chain. Hallmarked.' },
  { id: 'p-janmashtami', name: 'Janmashtami Jhula Set', category: 'Festival Items', vendorId: 'v-pooja-london',
    price: 32.00, emoji: '🌙', rating: 4.8, reviews: 41, seasonal: 'Janmashtami', image: img('krishna,swing,jhula', 327),
    description: 'Decorated cradle for Bal Krishna with cushion, peacock-feather garland and bells.' },
  { id: 'p-mithai-box', name: 'Diwali Mithai Hamper (24pc)', category: 'Sweets & Prasad', vendorId: 'v-mithai-soho',
    price: 35.00, emoji: '🍬', rating: 4.9, reviews: 612, seasonal: 'Diwali', image: img('mithai,sweets,indian', 328),
    description: 'Kaju katli, motichoor laddoo, gulab jamun, rasmalai — packed fresh, ships overnight.' },
  { id: 'p-ladoo-tin', name: 'Motichoor Laddoo Tin (500g)', category: 'Sweets & Prasad', vendorId: 'v-mithai-soho',
    price: 14.00, emoji: '🟠', rating: 4.8, reviews: 489, image: img('laddoo,sweet,orange', 329),
    description: 'Hand-rolled motichoor laddoos. Perfect for puja prasad.' },
  { id: 'p-prasad-box', name: 'Mandir Prasad Box', category: 'Sweets & Prasad', vendorId: 'v-mithai-soho',
    price: 9.50, emoji: '🍯', rating: 4.7, reviews: 218, image: img('prasad,offering,india', 330),
    description: 'Small box with peda, dry fruit and elaichi mishri for daily aarti offerings.' },
];

export const CATEGORIES: Category[] = ['Puja Thalis', 'Murtis', 'Incense & Oils', 'Festival Items', 'Books', 'Apparel', 'Sweets & Prasad', 'Jewellery'];

export const findVendor = (id: string) => VENDORS.find(v => v.id === id);
export const findProduct = (id: string) => PRODUCTS.find(p => p.id === id);
