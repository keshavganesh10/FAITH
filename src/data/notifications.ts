export interface AppNotification {
  id: string;
  title: string;
  body: string;
  time: string; // relative
  kind: 'practice' | 'event' | 'scripture' | 'market';
  unread: boolean;
}

export const NOTIFICATIONS: AppNotification[] = [
  { id: 'n1', kind: 'practice', title: 'Time to pause', body: 'Your next practice window opens in 15 minutes.', time: '15m', unread: true },
  { id: 'n2', kind: 'event', title: 'RSVP confirmed', body: 'You\'re going to the Interfaith Harvest Gathering this Saturday.', time: '2h', unread: true },
  { id: 'n3', kind: 'scripture', title: 'Passage of the day', body: 'A new reflection has been added to your daily plan.', time: '5h', unread: true },
  { id: 'n4', kind: 'market', title: 'Festival kit restocked', body: 'A vendor near you just listed seasonal ornaments.', time: '1d', unread: false },
  { id: 'n5', kind: 'event', title: 'Reminder', body: 'Sunday Morning Service begins tomorrow at 10:00.', time: '1d', unread: false },
];
