import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { Divider } from "./Ornaments";
import Button from "./Button";
import config from "../data/weddingConfig";
import { copyText, formatShortDate, getWhatsappUrl } from "../utils/eventUtils";

export default function RSVP({ notify }) {
  const [name, setName] = useState("");
  const [attending, setAttending] = useState("yes");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const nameRef = useRef(null);

  const buildText = () => {
    const couple = `${config.groomName} & ${config.brideName}`;
    const intro =
      attending === "yes"
        ? `Hello! This is ${name.trim()}. I will be joyfully attending the wedding reception of ${couple} on ${formatShortDate()}.`
        : `Hello! This is ${name.trim()}. I am sorry, I won't be able to attend the wedding reception of ${couple} on ${formatShortDate()}.`;
    return message.trim() ? `${intro}\n\n${message.trim()}` : intro;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Please enter your name.");
      nameRef.current?.focus();
      return;
    }
    setError("");
    const text = buildText();
    const url = getWhatsappUrl(text);

    if (!url) {
      // No WhatsApp number configured yet: let the guest copy the reply instead
      const ok = await copyText(text);
      notify(ok ? "Reply copied. Please send it to the couple." : "Couldn't copy your reply.");
      return;
    }
    const win = window.open(url, "_blank");
    if (win) win.opener = null;
    else window.location.href = url;
  };

  return (
    <section className="section" id="rsvp" aria-labelledby="rsvp-title">
      <motion.div
        className="section-head"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8 }}
      >
        <h2 id="rsvp-title" className="section-title rsvp-title">Will you join us?</h2>
        <Divider />
        <p className="rsvp-intro">
          Let us know if you can make it.
          {config.rsvpDeadline
            ? ` Please reply on or before ${config.rsvpDeadline}.`
            : ""}{" "}
          It takes just one tap on WhatsApp.
        </p>
      </motion.div>

      <motion.form
        className="rsvp-card"
        onSubmit={handleSubmit}
        noValidate
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
      >
        <div className="field">
          <label htmlFor="rsvp-name">Your name</label>
          <input
            id="rsvp-name"
            ref={nameRef}
            type="text"
            autoComplete="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (error) setError("");
            }}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? "rsvp-name-error" : undefined}
          />
          {error && (
            <p id="rsvp-name-error" className="field-error" role="alert">
              {error}
            </p>
          )}
        </div>

        <fieldset className="field">
          <legend>Will you attend?</legend>
          <div className="pills">
            {[
              { value: "yes", label: "Joyfully yes" },
              { value: "no", label: "Cannot make it" },
            ].map((o) => (
              <label key={o.value} className={`pill ${attending === o.value ? "is-on" : ""}`}>
                <input
                  type="radio"
                  name="attending"
                  value={o.value}
                  checked={attending === o.value}
                  onChange={() => setAttending(o.value)}
                />
                <span>{o.label}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="field">
          <label htmlFor="rsvp-message">Message for the couple (optional)</label>
          <textarea
            id="rsvp-message"
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        <Button type="submit" icon={Send}>
          {config.whatsappNumber ? "Send on WhatsApp" : "Copy My Reply"}
        </Button>
      </motion.form>
    </section>
  );
}