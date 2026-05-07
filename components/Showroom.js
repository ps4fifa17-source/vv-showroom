 "use client";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { dealership } from "../data/cars";
import InspectBay from "./InspectBay";

export default function Showroom({ car }) {
  const videoRef = useRef(null);
  const [inspectOpen, setInspectOpen] = useState(false);
  const [uiHidden, setUiHidden] = useState(false);
  const [question, setQuestion] = useState("");

  useEffect(() => {
    document.body.classList.toggle("no-scroll", inspectOpen);
    return () => document.body.classList.remove("no-scroll");
  }, [inspectOpen]);

  function jumpTo(seconds) {
    const video = videoRef.current;
    if (!video) return;
    setInspectOpen(false);
    video.currentTime = seconds;
    video.play();
  }

  const cleanPhone = dealership.phone.replaceAll(" ", "");
  const whatsAppNumber = "44" + dealership.whatsapp.replace(/^0/, "");
  const message = encodeURIComponent(`Hi, I'm interested in the ${car.title}. ${question ? "My question is: " + question : "Can you tell me more about it?"}`);

  return (
    <main className="showroom-page" style={{ "--accent": dealership.accent, "--accent2": "#b85cff" }}>
      <section className="showroom-video-area">
        <img className="walk-video" src={car.poster} alt="" aria-hidden="true" />
        <video ref={videoRef} className="walk-video" src={car.walkaroundVideo} poster={car.poster} autoPlay muted loop playsInline controls preload="metadata" />
        <div className={`video-gradient ${uiHidden ? "clean" : ""}`} />

        <motion.div className={`showroom-overlay ${uiHidden ? "hidden-ui" : ""}`} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, ease: [0.2, 0.8, 0.2, 1] }}>
          <div className="overlay-inner">
            <div className="main-copy">
              <span className="kicker"><span className="live-dot" /> Interactive Walkaround</span>
              <h1>{car.title}</h1>
              <div className="keybar"><span>{car.price}</span><span>{car.mileage}</span><span>{car.fuel}</span><span>{car.gearbox}</span><span>{car.body}</span></div>
            </div>

            <div className="floating-panel">
              <button className="glass-card inspect-mini" onClick={() => setInspectOpen(true)}>
                <h2>Inspect Vehicle</h2>
                <p>Open the vehicle selector and jump through the walkaround by area.</p>
                <span className="mini-link">Open inspect →</span>
              </button>

              <div className="glass-card">
                <h2>Details</h2>
                {car.details.map(([label, value]) => <div className="detail-row" key={label}><span>{label}</span><strong>{value}</strong></div>)}
              </div>

              <div className="glass-card">
                <h2>Ask</h2>
                <textarea className="question-input" value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="Ask about this car..." />
                <div className="cta-grid"><a className="btn btn-accent" href={`https://wa.me/${whatsAppNumber}?text=${message}`}>WhatsApp</a><a className="btn btn-white" href={`tel:${cleanPhone}`}>Call</a></div>
              </div>
            </div>
          </div>
        </motion.div>

        <button className={`inspect-widget ${uiHidden ? "show" : ""}`} onClick={() => setInspectOpen(true)} aria-label="Inspect vehicle" />

        <div className="video-tools">
          <button className="btn btn-glass" onClick={() => setUiHidden(!uiHidden)}>{uiHidden ? "Show Details" : "Clean View"}</button>
          <button className="btn btn-accent" onClick={() => setInspectOpen(true)}>Inspect</button>
          <a className="btn btn-white" href={`https://wa.me/${whatsAppNumber}?text=${message}`}>Enquire</a>
        </div>
      </section>

      <AnimatePresence>
        {inspectOpen && <InspectBay car={car} onClose={() => setInspectOpen(false)} onJump={jumpTo} />}
      </AnimatePresence>
    </main>
  );
}
