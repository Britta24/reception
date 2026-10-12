import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Flower, Heart } from "./Ornaments";
import Button from "./Button";
import config from "../data/weddingConfig";

/**
 * Opening envelope. `onOpenStart` runs synchronously inside the click
 * (needed so mobile browsers allow music to play); `onOpened` runs once
 * the envelope animation has finished and the invitation should show.
 */
export default function InvitationPopup({ onOpenStart, onOpened }) {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  const handleOpen = () => {
    if (open) return;
    setOpen(true);
    onOpenStart?.();
    timer.current = setTimeout(() => onOpened?.(), reduce ? 350 : 4400);
  };

  return (
    <motion.div
      className="popup"
      role="dialog"
      aria-modal="true"
      aria-labelledby="popup-title"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1.4 } }}
    >
      <div className="popup-inner">
        <motion.div
          className="popup-flower"
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        >
          <Flower size={72} petals={10} />
        </motion.div>

        <motion.h1
          id="popup-title"
          className="popup-title"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          You Are Cordially Invited
        </motion.h1>
        <motion.p
          className="popup-sub"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          To Celebrate a Beautiful Beginning
        </motion.p>

        <motion.div
          className={`envelope ${open ? "is-open" : ""}`}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          aria-hidden="true"
        >
          <div className="env-back" />
          <div className="env-card">
            <Flower size={34} petals={6} />
            <span className="env-card-text">Wedding Reception</span>
            <span className="env-card-names">
              {config.groomName} &amp; {config.brideName}
            </span>
          </div>
          <div className="env-pocket" />
          <div className="env-flap" />
          <div className="env-seal">
            <Heart size={20} />
          </div>
          {!reduce &&
            [0, 1, 2].map((i) => (
              <span key={i} className="env-float" style={{ left: `${22 + i * 28}%`, animationDelay: `${i * 1.2}s` }}>
                <Heart size={12} />
              </span>
            ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: open ? 0.4 : 1, y: 0 }}
          transition={{ delay: open ? 0 : 0.8, duration: 0.6 }}
        >
          <Button onClick={handleOpen} disabled={open} aria-label="Open invitation">
            Open Invitation
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}