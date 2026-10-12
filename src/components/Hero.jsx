import { motion } from "framer-motion";
import { CalendarDays, MapPin } from "lucide-react";
import { Flower, Divider, Heart } from "./Ornaments";
import Button from "./Button";
import config from "../data/weddingConfig";
import { formatDate, formatTimeRange } from "../utils/eventUtils";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.18, delayChildren: 0.2 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: "easeOut" } },
};

export default function Hero() {
  const scrollToDetails = () =>
    document.getElementById("details")?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <header className="hero" id="top">
      <motion.div
        className="hero-frame"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <Flower className="corner corner-bl float float-2" size={46} />
        <Flower className="corner corner-br float" size={46} />

        <div className="hero-content">
          <motion.div className="crest" variants={item} aria-hidden="true">
            <Heart size={12} className="heart-beat" />
            <Flower size={46} petals={10} className="crest-flower" />
            <Heart size={12} className="heart-beat" />
          </motion.div>

          <motion.p className="eyebrow" variants={item}>
            WITH JOYFUL HEARTS
          </motion.p>
          <motion.h1 className="hero-title" variants={item}>
            Wedding Reception
          </motion.h1>

          <motion.div variants={item}>
            <Divider />
          </motion.div>

          <motion.div className="couple" variants={item}>
            <div className="person">
              <motion.span
                className="name"
                animate={{ scale: [1, 1.03, 1] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
              >
                {config.groomName}
              </motion.span>
              <span className="parents">son of {config.groomParents}</span>
            </div>

            <span className="amp" aria-hidden="true">&amp;</span>
            <span className="sr-only">and</span>

            <div className="person">
              <motion.span
                className="name"
                animate={{ scale: [1, 1.03, 1] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                {config.brideName}
              </motion.span>
              <span className="parents">daughter of {config.brideParents}</span>
            </div>
          </motion.div>

          <motion.p className="message" variants={item}>
            {config.invitationMessage}
          </motion.p>

          <motion.div className="info" variants={item}>
            <div className="info-item">
              <span className="info-icon"><CalendarDays size={20} aria-hidden="true" /></span>
              <span className="info-main">{formatDate()}</span>
              <span className="info-sub">{formatTimeRange()}</span>
            </div>
            <div className="info-item">
              <span className="info-icon"><MapPin size={20} aria-hidden="true" /></span>
              <span className="info-main">{config.venueName}</span>
              <span className="info-sub">{config.venueAddress}</span>
            </div>
          </motion.div>

          <motion.div variants={item}>
            <Button onClick={scrollToDetails}>View Celebration Details</Button>
          </motion.div>
        </div>
      </motion.div>
    </header>
  );
}