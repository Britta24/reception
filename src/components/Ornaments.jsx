import { motion } from "framer-motion";

/** Line-art flower drawn with SVG (no images). Inherits color from CSS. */
export function Flower({ size = 64, petals = 8, className = "" }) {
  return (
    <svg
      viewBox="-50 -50 100 100"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
      focusable="false"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
    >
      {Array.from({ length: petals }).map((_, i) => (
        <ellipse
          key={i}
          cx="0"
          cy="-26"
          rx="9"
          ry="20"
          transform={`rotate(${(360 / petals) * i})`}
        />
      ))}
      <circle r="6" />
      <circle r="2" fill="currentColor" />
    </svg>
  );
}

/** Slowly rotating ring of leaves and tiny blossoms. */
export function Wreath({ className = "" }) {
  const items = Array.from({ length: 24 }, (_, i) => i);
  return (
    <svg
      viewBox="-100 -100 200 200"
      className={className}
      aria-hidden="true"
      focusable="false"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
    >
      <circle r="78" opacity=".5" />
      <circle r="94" opacity=".35" />
      {items.map((i) => {
        const angle = (360 / items.length) * i;
        return i % 3 === 0 ? (
          <g key={i} transform={`rotate(${angle}) translate(0 -86)`}>
            {[0, 72, 144, 216, 288].map((r) => (
              <ellipse key={r} cx="0" cy="-4" rx="2.6" ry="5" transform={`rotate(${r})`} />
            ))}
            <circle r="1.4" fill="currentColor" />
          </g>
        ) : (
          <path
            key={i}
            d="M0 0 C 5 -6, 5 -14, 0 -20 C -5 -14, -5 -6, 0 0 Z"
            transform={`rotate(${angle + 8}) translate(0 -80)`}
          />
        );
      })}
    </svg>
  );
}

/** Divider whose line draws itself when scrolled into view. */
export function Divider({ className = "" }) {
  return (
    <div className={`divider ${className}`} aria-hidden="true">
      <svg viewBox="0 0 300 24" preserveAspectRatio="xMidYMid meet" fill="none">
        <motion.path
          d="M5 12 H122"
          stroke="currentColor"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        />
        <motion.path
          d="M295 12 H178"
          stroke="currentColor"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        />
        <motion.g
          initial={{ opacity: 0, scale: 0.6 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          style={{ transformOrigin: "150px 12px", transformBox: "fill-box" }}
        >
          <path
            d="M150 4 C156 4 160 9 150 20 C140 9 144 4 150 4 Z"
            stroke="currentColor"
            strokeWidth="1.2"
            fill="var(--soft)"
          />
        </motion.g>
      </svg>
    </div>
  );
}

export function Heart({ size = 18, className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M12 21s-7.5-4.6-9.6-9.2C1 8.6 3 5 6.4 5c2 0 3.6 1.1 4.6 2.7h2C14 6.1 15.600 5 17.600 5 21 5 23 8.600 21.600 11.800 19.500 16.400 12 21 12 21z"
        fill="currentColor"
      />
    </svg>
  );
}
