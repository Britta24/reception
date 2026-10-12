import { useMemo } from "react";

/** Animated gradient, drifting petals, glowing particles and twinkling stars. */
export default function Background() {
  const petals = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        id: i,
        left: (i * 37 + 7) % 100,
        size: 10 + ((i * 7) % 10),
        delay: -((i * 3.1) % 18),
        duration: 15 + ((i * 5) % 10),
        drift: (i % 2 ? 1 : -1) * (20 + ((i * 13) % 50)),
      })),
    []
  );
  const stars = useMemo(
    () =>
      Array.from({ length: 22 }, (_, i) => ({
        id: i,
        left: (i * 53 + 11) % 100,
        top: (i * 29 + 5) % 100,
        size: 2 + (i % 3),
        delay: -((i * 1.7) % 6),
        duration: 3 + (i % 4),
      })),
    []
  );
  const glows = useMemo(
    () =>
      Array.from({ length: 5 }, (_, i) => ({
        id: i,
        left: (i * 23 + 10) % 90,
        top: (i * 31 + 8) % 85,
        size: 90 + i * 25,
        delay: -i * 4,
      })),
    []
  );

  return (
    <div className="bg-layer" aria-hidden="true">
      <div className="bg-gradient" />
      {glows.map((g) => (
        <span
          key={g.id}
          className="glow"
          style={{
            left: `${g.left}%`,
            top: `${g.top}%`,
            width: g.size,
            height: g.size,
            animationDelay: `${g.delay}s`,
          }}
        />
      ))}
      {stars.map((s) => (
        <span
          key={s.id}
          className="star"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size,
            height: s.size,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
          }}
        />
      ))}
      {petals.map((p) => (
        <span
          key={p.id}
          className="petal"
          style={{
            left: `${p.left}%`,
            "--s": `${p.size}px`,
            "--x": `${p.drift}px`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </div>
  );
}
