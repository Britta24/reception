import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Divider, Heart } from "./Ornaments";
import { getStart } from "../utils/eventUtils";

const getParts = () => {
  const diff = getStart().getTime() - Date.now();
  if (Number.isNaN(diff) || diff <= 0) return null;
  const s = Math.floor(diff / 1000);
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
  };
};

function Unit({ value, label }) {
  const text = String(value).padStart(2, "0");
  return (
    <div className="count-card" role="timer" aria-label={`${value} ${label}`}>
      <div className="count-num">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={text}
            initial={{ y: -14, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 14, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {text}
          </motion.span>
        </AnimatePresence>
      </div>
      <div className="count-label">{label}</div>
    </div>
  );
}

export default function Countdown() {
  const [parts, setParts] = useState(getParts);

  useEffect(() => {
    const id = setInterval(() => setParts(getParts()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="section" id="countdown" aria-labelledby="countdown-title">
      <motion.div
        className="section-head"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8 }}
      >
        <h2 id="countdown-title" className="section-title">Counting Down</h2>
        <Divider />
      </motion.div>

      {parts ? (
        <motion.div
          className="count-grid"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <Unit value={parts.days} label="Days" />
          <Unit value={parts.hours} label="Hours" />
          <Unit value={parts.minutes} label="Minutes" />
          <Unit value={parts.seconds} label="Seconds" />
        </motion.div>
      ) : (
        <motion.p
          className="celebrate"
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Heart size={22} className="heart-beat" /> The Celebration Has Begun!
        </motion.p>
      )}
    </section>
  );
}
