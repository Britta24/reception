# Wedding Reception E-Invitation

React + Vite, Framer Motion, Lucide icons. No backend, no photos.

## Run

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in /dist
npm run preview
```

## Edit your details

Everything lives in **`src/data/weddingConfig.js`**: names, date, time, venue,
maps link, dress code, RSVP number, music path and messages.

### Timezone

The time you enter is the **venue's local time**. Set `utcOffset` (for example
`"+05:30"` for India) and the matching `timeZone` (`"Asia/Kolkata"`). The
countdown, calendar file and displayed time all use these, so visitors in other
countries see the correct event time.

### Google Maps

Paste your share link into `mapsUrl`. If it is empty, "Get Directions" opens a
Google Maps search for the venue name and address from the config.

### RSVP

Set `whatsappNumber` (digits with country code, e.g. `919876543210`). Leave it
empty to hide the RSVP button.

### Music

Put an MP3 at `public/music.mp3` (or change `musicPath`). It only starts after
the visitor taps "Open Invitation", and the mute button appears on the page.
If the file is missing, the music button hides itself.

## Deploy on Vercel

Push to GitHub, import the repo in Vercel, keep the defaults
(Framework: Vite, Build: `npm run build`, Output: `dist`).
