// UK Hindu reference data — cities, universities, mandirs, interests.

export const UK_CITIES = [
  'London', 'Leicester', 'Birmingham', 'Manchester', 'Leeds', 'Nottingham',
  'Coventry', 'Glasgow', 'Edinburgh', 'Cardiff', 'Bristol', 'Oxford', 'Cambridge', 'Sheffield',
];

export const UK_UNIVERSITIES = [
  'University of Manchester', 'University College London (UCL)', 'King\'s College London',
  'Imperial College London', 'LSE', 'University of Leicester', 'University of Birmingham',
  'University of Nottingham', 'University of Warwick', 'University of Leeds',
  'University of Edinburgh', 'University of Glasgow', 'Cardiff University',
  'University of Bristol', 'University of Oxford', 'University of Cambridge', 'None / Not a student',
];

export interface Mandir {
  id: string;
  name: string;
  city: string;
  tradition?: string;
  lat: number;
  lng: number;
}

export const MANDIRS: Mandir[] = [
  { id: 'm-neasden', name: 'BAPS Shri Swaminarayan Mandir', city: 'London (Neasden)', tradition: 'Swaminarayan', lat: 51.5547, lng: -0.2647 },
  { id: 'm-shrisana', name: 'Shri Sanatan Hindu Mandir', city: 'London (Wembley)', tradition: 'Sanatan', lat: 51.5582, lng: -0.2964 },
  { id: 'm-radhakr', name: 'Bhaktivedanta Manor', city: 'Watford', tradition: 'ISKCON', lat: 51.6736, lng: -0.4128 },
  { id: 'm-leicester', name: 'Shree Sanatan Mandir', city: 'Leicester', tradition: 'Sanatan', lat: 52.6443, lng: -1.1242 },
  { id: 'm-bham', name: 'Shri Venkateswara (Balaji) Temple', city: 'Birmingham (Tividale)', tradition: 'Vaishnava', lat: 52.5008, lng: -2.0530 },
  { id: 'm-mcr', name: 'Shree Geeta Bhawan Hindu Temple', city: 'Manchester', tradition: 'Sanatan', lat: 53.4422, lng: -2.2280 },
  { id: 'm-leeds', name: 'Shree Hindu Mandir', city: 'Leeds', tradition: 'Sanatan', lat: 53.8085, lng: -1.5602 },
  { id: 'm-nottm', name: 'Shree Geeta Bhawan', city: 'Nottingham', tradition: 'Sanatan', lat: 52.9586, lng: -1.1668 },
  { id: 'm-cardiff', name: 'Shree Swaminarayan Mandir', city: 'Cardiff', tradition: 'Swaminarayan', lat: 51.4816, lng: -3.1791 },
  { id: 'm-glasgow', name: 'Hindu Mandir Glasgow', city: 'Glasgow', tradition: 'Sanatan', lat: 55.8642, lng: -4.2518 },
];

export const INTERESTS = [
  'Bhagavad Gita study', 'Ekadashi tracking', 'University Garba events',
  'Bhajans & slokas', 'Meditation & mantras', 'NHSF socials', 'Mandir Aarti times',
  'Festival celebrations', 'Sanskrit learning', 'Seva & volunteering',
];

export const HINDU_GREETINGS = [
  'Namaste 🙏', 'Jai Shri Krishna', 'Hari Om', 'Radhe Radhe', 'Om Namah Shivaya',
];
