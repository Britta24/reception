import { motion } from "framer-motion";
import { Flower, Divider, Heart } from "./Ornaments";
import config from "../data/weddingConfig";

export default function Footer() {
  return (
    <footer className="footer">
      <motion.div
        className="footer-inner"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <Flower className="float" size={56} petals={10} />
        <Divider />
        {config.welcomeBy && (
          <p className="welcome">
            Hearty Welcome{" "}
            <span>{config.welcomeBy}</span>
          </p>
        )}
        <p className="thanks">{config.thankYouLine}</p>
        <p className="signoff">
          With love and gratitude,
          <br />
          <span className="signoff-names">
            {config.groomName} &amp; {config.brideName}
          </span>
        </p>
        <Heart size={26} className="heart-beat" />
        <p className="made">Made with love.</p>
      </motion.div>
    </footer>
  );
}