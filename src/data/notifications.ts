export interface AppNotification {
  id: string;
  title: string;
  body: string;
  time: string;
  kind: 'practice' | 'event' | 'scripture' | 'market';
  unread: boolean;
}

export const NOTIFICATIONS: AppNotification[] = [
  { id: 'n1', kind: 'practice', title: 'Sandhya Aarti in 15 minutes', body: 'Your local mandir streams live at 6:30pm.', time: '15m', unread: true },
  { id: 'n2', kind: 'event', title: 'RSVP confirmed', body: 'You\'re going to NHSF Manchester\'s Garba Night on Saturday.', time: '2h', unread: true },
  { id: 'n3', kind: 'scripture', title: 'Verse of the day', body: 'Gita 2.47 — on action without attachment.', time: '5h', unread: true },
  { id: 'n4', kind: 'market', title: 'Diwali kit restocked', body: 'Pooja Bazaar London just listed the festival kit you saved.', time: '1d', unread: false },
  { id: 'n5', kind: 'event', title: 'Ekadashi tomorrow', body: 'Papankusha Ekadashi vrat begins at sunrise.', time: '1d', unread: false },
];
