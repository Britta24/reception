/**
 * ─────────────────────────────────────────────────────────────
 *  EDIT EVERYTHING HERE. No other file contains event details.
 * ─────────────────────────────────────────────────────────────
 *
 *  TIMEZONE
 *  The reception time is always interpreted in the event's LOCAL
 *  timezone, no matter where the visitor is.
 *    - utcOffset : the event location's offset from UTC, e.g. "+05:30"
 *                  for India, "-05:00" for New York (standard time).
 *    - timeZone  : the matching IANA name, used only to DISPLAY the
 *                  date and time (e.g. "Asia/Kolkata").
 *  Keep both in agreement.
 */
const weddingConfig = {
  // Couple (replace the placeholders)
  brideName: "Veni",
  groomName: "Arun",
  brideParents: "Jeya Raman & Padthma",
  groomParents: "Mr. Sankarakumar & Ananthi",
  welcomeBy: "Pravin", // "Hearty Welcome" name. Set to "" to hide

  // Reception date & time (24-hour "HH:MM", date as "YYYY-MM-DD")
  receptionDate: "2026-11-16",
  receptionStartTime: "19:00",
  receptionEndTime: "", // "" shows "7:00 PM onwards"

  // Timezone of the venue
  utcOffset: "+05:30",
  timeZone: "Asia/Kolkata",

  // Venue
  venueName: "Smart Palace",
  venueAddress: "Opp. Govt. Polytechnic, Thoothukudi, Tamil Nadu, India",
  // Pin for Smart Palace (coordinates taken from the Bing Maps link). You can
  // replace this with a Google Maps share link. If left empty, the button opens a
  // Google Maps search built from the venue name and address above.
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=8.791828,78.118568",

  // Optional: set to "" to hide the dress code card
  dressCode: "",

  // RSVP form sends the guest's reply to this WhatsApp number.
  // Digits only with country code, e.g. "919876543210".
  // If left empty, the form button copies the reply instead of opening WhatsApp.
  whatsappNumber: "919344325545",
  // Optional, e.g. "9 November". Leave "" to skip the deadline sentence.
  rsvpDeadline: "",

  // "Need help finding us?" section. Add a phone number to show a contact
  // (e.g. "+91 98765 43210"). Entries with an empty phone are hidden from guests.
  helpContacts: [
    { label: "Groom's family", name: "Pravin", phone: "+91 63798 00325" },
  ],

  // Background music (file placed in /public). Leave "" to disable music.
  musicPath: "/music.mp3",

  // Text
  invitationMessage:
    "Together with our families, we invite you to celebrate the beginning of our beautiful journey together.",
  thankYouLine: "Your Presence Will Make Our Celebration Even More Special.",
};

export default weddingConfig;