import { motion } from "framer-motion";
import { CalendarPlus, Share2 } from "lucide-react";
import Button from "./Button";
import config from "../data/weddingConfig";
import { buildIcs, copyText, formatShortDate } from "../utils/eventUtils";

export default function ActionButtons({ notify }) {
  const addToCalendar = () => {
    try {
      const blob = new Blob([buildIcs()], { type: "text/calendar;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "wedding-reception.ics";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      notify("Calendar event downloaded");
    } catch {
      notify("Couldn't create the calendar file on this browser.");
    }
  };

  const share = async () => {
    const url = window.location.href;
    const data = {
      title: `Wedding Reception – ${config.groomName} & ${config.brideName}`,
      text: `You're invited to our wedding reception on ${formatShortDate()}.`,
      url,
    };
    try {
      if (navigator.share) {
        await navigator.share(data);
        return;
      }
    } catch (err) {
      if (err?.name === "AbortError") return; // visitor closed the share sheet
    }
    const ok = await copyText(url);
    notify(ok ? "Invitation link copied" : "Couldn't copy the link. Please copy it from the address bar.");
  };

  return (
    <section className="section" aria-label="Invitation actions">
      <motion.div
        className="actions"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8 }}
      >
        <Button onClick={addToCalendar} icon={CalendarPlus}>Add to Calendar</Button>
        <Button variant="ghost" onClick={share} icon={Share2}>Share Invitation</Button>
      </motion.div>
    </section>
  );
}