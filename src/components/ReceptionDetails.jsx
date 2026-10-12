import { motion } from "framer-motion";
import { CalendarDays, Clock, MapPin, Shirt, Navigation, Copy } from "lucide-react";
import { Divider } from "./Ornaments";
import Button from "./Button";
import config from "../data/weddingConfig";
import {
  formatDate,
  formatTimeRange,
  getDirectionsUrl,
  fullVenueAddress,
  copyText,
} from "../utils/eventUtils";

const list = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};
const card = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

export default function ReceptionDetails({ notify }) {
  const copyAddress = async () => {
    const ok = await copyText(fullVenueAddress());
    notify(ok ? "Venue address copied" : "Couldn't copy. Please copy the address manually.");
  };

  return (
    <section className="section" id="details" aria-labelledby="details-title">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8 }}
        className="section-head"
      >
        <h2 id="details-title" className="section-title">Reception Details</h2>
        <Divider />
      </motion.div>

      <motion.div
        className="cards"
        variants={list}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
      >
        <motion.article className="card" variants={card} whileHover={{ y: -4 }}>
          <span className="card-icon"><CalendarDays size={22} aria-hidden="true" /></span>
          <h3>Date</h3>
          <p>{formatDate()}</p>
        </motion.article>

        <motion.article className="card" variants={card} whileHover={{ y: -4 }}>
          <span className="card-icon"><Clock size={22} aria-hidden="true" /></span>
          <h3>Time</h3>
          <p>{formatTimeRange()}</p>
        </motion.article>

        <motion.article className="card card-wide" variants={card} whileHover={{ y: -4 }}>
          <span className="card-icon"><MapPin size={22} aria-hidden="true" /></span>
          <h3>Venue</h3>
          <p className="venue-name">{config.venueName}</p>
          <p>{config.venueAddress}</p>
          <div className="card-actions">
            <Button href={getDirectionsUrl()} external icon={Navigation}>
              Get Directions
            </Button>
            <Button variant="ghost" onClick={copyAddress} icon={Copy}>
              Copy Address
            </Button>
          </div>
        </motion.article>

        {config.dressCode && (
          <motion.article className="card card-wide" variants={card} whileHover={{ y: -4 }}>
            <span className="card-icon"><Shirt size={22} aria-hidden="true" /></span>
            <h3>Dress Code</h3>
            <p>{config.dressCode}</p>
          </motion.article>
        )}
      </motion.div>
    </section>
  );
}
