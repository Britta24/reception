import { motion } from "framer-motion";
import { Phone } from "lucide-react";
import { Divider } from "./Ornaments";
import config from "../data/weddingConfig";

const telHref = (phone) => `tel:${phone.replace(/[^\d+]/g, "")}`;

export default function Contacts() {
  const all = config.helpContacts || [];
  // Guests only see contacts that have a phone number.
  // While developing (npm run dev) all entries show, so you can preview the layout.
  const contacts = import.meta.env.DEV ? all : all.filter((c) => c.phone);
  if (contacts.length === 0) return null;

  return (
    <section className="section" id="help" aria-labelledby="help-title">
      <motion.div
        className="section-head"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8 }}
      >
        <h2 id="help-title" className="section-title rsvp-title">Need help finding us?</h2>
        <Divider />
        <p className="rsvp-intro">Call us and we will guide you to the venue.</p>
      </motion.div>

      <div className="help-grid">
        {contacts.map((c, i) => (
          <motion.article
            key={`${c.label}-${i}`}
            className="help-card"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: i * 0.12 }}
            whileHover={{ y: -4 }}
          >
            <h3 className="help-label">{c.label}</h3>
            <p className="help-name">{c.name}</p>
            {c.phone ? (
              <motion.a
                className="btn btn-primary"
                href={telHref(c.phone)}
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
              >
                <Phone size={18} aria-hidden="true" />
                <span>{c.phone}</span>
              </motion.a>
            ) : (
              <p className="help-missing">Add a phone number in weddingConfig.js</p>
            )}
          </motion.article>
        ))}
      </div>
    </section>
  );
}