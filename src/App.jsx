import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import Background from "./components/Background";
import InvitationPopup from "./components/InvitationPopup";
import Hero from "./components/Hero";
import ReceptionDetails from "./components/ReceptionDetails";
import Countdown from "./components/Countdown";
import ActionButtons from "./components/ActionButtons";
import RSVP from "./components/RSVP";
import Contacts from "./components/Contacts";
import Footer from "./components/Footer";
import { MusicToggle, ScrollTop, Toast } from "./components/FloatingControls";
import config from "./data/weddingConfig";

export default function App() {
  const [revealed, setRevealed] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [musicOk, setMusicOk] = useState(Boolean(config.musicPath));
  const [toast, setToast] = useState("");
  const audioRef = useRef(null);
  const toastTimer = useRef(null);

  const notify = useCallback((msg) => {
    setToast(msg);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(""), 2400);
  }, []);

  useEffect(() => () => clearTimeout(toastTimer.current), []);

  // Lock page scroll while the opening popup is on screen
  useEffect(() => {
    document.body.style.overflow = revealed ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [revealed]);

  // Called inside the click handler so mobile browsers allow audio
  const startMusic = () => {
    const audio = audioRef.current;
    if (!audio || !musicOk) return;
    audio.volume = 0.5;
    const p = audio.play();
    if (p?.catch) p.catch(() => setPlaying(false));
  };

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play().catch(() => notify("Couldn't play the music on this device."));
    } else {
      audio.pause();
    }
  };

  return (
    <>
      <Background />

      {config.musicPath && (
        <audio
          ref={audioRef}
          src={config.musicPath}
          loop
          preload="none"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onError={() => {
            setMusicOk(false);
            setPlaying(false);
          }}
        />
      )}

      <AnimatePresence>
        {!revealed && (
          <InvitationPopup
            key="popup"
            onOpenStart={startMusic}
            onOpened={() => {
              setRevealed(true);
              window.scrollTo(0, 0);
            }}
          />
        )}
      </AnimatePresence>

      {revealed && (
        <>
          <main>
            <Hero />
            <ReceptionDetails notify={notify} />
            <Countdown />
            <ActionButtons notify={notify} />
            <RSVP notify={notify} />
            <Contacts />
          </main>
          <Footer />
          {musicOk && <MusicToggle playing={playing} onToggle={toggleMusic} />}
          <ScrollTop />
        </>
      )}

      <Toast message={toast} />
    </>
  );
}