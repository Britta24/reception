import config from "../data/weddingConfig";

/** Builds an unambiguous timestamp in the EVENT's timezone. */
const toDate = (time) =>
  new Date(`${config.receptionDate}T${time}:00${config.utcOffset}`);

export const getStart = () => toDate(config.receptionStartTime);
export const getEnd = () =>
  config.receptionEndTime ? toDate(config.receptionEndTime) : null;

const fmt = (options, date) => {
  try {
    return new Intl.DateTimeFormat("en-IN", {
      timeZone: config.timeZone,
      ...options,
    }).format(date);
  } catch {
    return new Intl.DateTimeFormat("en-IN", options).format(date);
  }
};

export const formatDate = (date = getStart()) =>
  fmt({ weekday: "long", day: "numeric", month: "long", year: "numeric" }, date);

export const formatShortDate = (date = getStart()) =>
  fmt({ day: "numeric", month: "long", year: "numeric" }, date);

const formatTime = (date) =>
  fmt({ hour: "numeric", minute: "2-digit", hour12: true }, date)
    .replace(/am/i, "AM")
    .replace(/pm/i, "PM");

export const formatTimeRange = () => {
  const start = getStart();
  const end = getEnd();
  return end
    ? `${formatTime(start)} – ${formatTime(end)}`
    : `${formatTime(start)} onwards`;
};

export const fullVenueAddress = () =>
  `${config.venueName}, ${config.venueAddress}`;

export const getDirectionsUrl = () =>
  config.mapsUrl ||
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    fullVenueAddress()
  )}`;

export const getWhatsappUrl = (text = "") => {
  const digits = (config.whatsappNumber || "").replace(/\D/g, "");
  if (!digits) return "";
  return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`;
};

/* ---------- Calendar (.ics) ---------- */
const icsDate = (d) =>
  d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
const icsEscape = (s) =>
  String(s)
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\n/g, "\\n");

export const buildIcs = () => {
  const start = getStart();
  const end = getEnd() || new Date(start.getTime() + 3 * 60 * 60 * 1000);
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Reception Invitation//EN",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `UID:reception-${icsDate(start)}@invitation`,
    `DTSTAMP:${icsDate(new Date())}`,
    `DTSTART:${icsDate(start)}`,
    `DTEND:${icsDate(end)}`,
    `SUMMARY:${icsEscape(
      `Wedding Reception – ${config.groomName} & ${config.brideName}`
    )}`,
    `DESCRIPTION:${icsEscape(config.invitationMessage)}`,
    `LOCATION:${icsEscape(fullVenueAddress())}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];
  return lines.join("\r\n");
};

/* ---------- Clipboard with fallback ---------- */
export const copyText = async (text) => {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    /* fall through to legacy method */
  }
  try {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(ta);
    return ok;
  } catch {
    return false;
  }
};