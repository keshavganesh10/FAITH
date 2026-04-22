
# FAITH — A Modern Hub for Ancient Traditions

A native-ready mobile app (built with Capacitor) bringing together scripture, practice, local community and a marketplace for festival items — all in one personalised, multi-faith experience. The aesthetic mirrors your proposal cover: serene sky blues, soft cream paper tones, calm typography, an open-book sense of contemplation.

## Visual direction
- **Palette**: deep sky blue, soft cloud white, warm parchment cream, muted gold accent.
- **Type**: a graceful serif for headings (echoing scripture) paired with a clean sans for UI.
- **Mood**: airy, generous spacing, gentle gradients, subtle paper textures, soft shadows. Mobile-first phone-frame layout.

## Screens & flow

**1. Splash & Welcome**
- FAITH wordmark over a sky-and-scripture hero.
- Tagline: *"A modern hub for ancient traditions."* → Get started.

**2. Onboarding (3 steps)**
- Choose your faith (Christianity, Islam, Hinduism, Sikhism, Judaism, Buddhism… with denomination sub-pick).
- Set your location (mocked city picker).
- Pick interests (scripture study, fasting, festivals, community events, learning).
- Result: a personalised home tailored to the selection.

**3. Home (personalised feed)**
- Greeting + today's date in the user's traditional calendar.
- "Verse / passage of the day" card with read-more.
- Today's practice: next prayer/fast time with a soft countdown.
- Upcoming local event preview.
- Featured marketplace item for the current season/festival.
- Bottom tab nav: Home · Scriptures · Community · Market · Profile.

**4. Scriptures**
- Library tailored to the chosen faith (e.g., Bible books, Surahs, Bhagavad Gita chapters, Guru Granth Sahib sections — mocked).
- Clean reader view with adjustable text size, bookmark, share.
- Daily reading plan strip.

**5. Practice (within Home / Profile)**
- Fasting & prayer scheduler: list of upcoming fasts/prayer windows with toggle reminders.
- Simple add-fast flow (date, type, intention).

**6. Community**
- Local events list & map-style card view: gatherings, services, festivals, study circles.
- Each event: host, place of worship, time, distance, RSVP button.
- Filter by type (worship, study, festival, volunteering).

**7. Marketplace**
- Curated seasonal packages and ornaments from local vendors.
- Category chips (festival kits, ornaments, prayer items, books).
- Product detail with vendor info and a mock "Add to basket" → checkout summary.

**8. Profile**
- Faith, location, interests (editable).
- Saved scriptures, RSVP'd events, orders.
- Reminder & notification preferences.

## Native (Capacitor) setup
- Configure Capacitor with the project's app ID & name.
- Hot-reload server URL pointed at the Lovable preview so the user can run on a device immediately.
- Step-by-step "run on device" instructions delivered after build (Export to GitHub → `npm i` → `npx cap add ios/android` → `npx cap sync` → `npx cap run`).

## Data
- All content is mock/demo (sample scriptures, events, vendors, products) stored in typed TS files so the proposal demo runs fully offline with no login.

After you approve, I'll build it out, set up Capacitor, and walk you through running it on a real device.
