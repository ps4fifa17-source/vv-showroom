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
    <main className="showroom-page">
      <section className="showroom-video-area">
        <video ref={videoRef} className="walk-video" src={car.walkaroundVideo} poster={car.poster} autoPlay muted loop playsInline controls preload="metadata" />
        <div className={`video-gradient ${uiHidden ? "clean" : ""}`} />

        <motion.div className={`showroom-overlay ${uiHidden ? "hidden-ui" : ""}`} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, ease: [0.2, 0.8, 0.2, 1] }}>
          <div className="overlay-inner">
            <div className="main-copy">
              <span className="kicker"><span className="live-dot" /> Full walkaround</span>
              <h1>{car.title}</h1>
              <div className="keybar">
                <span>{car.price}</span>
                <span>{car.mileage}</span>
                <span>{car.fuel}</span>
                <span>{car.gearbox}</span>
                <span>{car.body}</span>
              </div>
            </div>

            <div className="floating-panel">
              <div className="glass-card">
                <h2>Details</h2>
                {car.details.map(([label, value]) => (
                  <div className="detail-row" key={label}><span>{label}</span><strong>{value}</strong></div>
                ))}
              </div>

              <div className="glass-card">
                <h2>Ask</h2>
                <textarea className="question-input" value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="Ask about this car..." />
                <div className="cta-grid">
                  <a className="btn btn-purple" href={`https://wa.me/${whatsAppNumber}?text=${message}`}>WhatsApp</a>
                  <a className="btn btn-white" href={`tel:${cleanPhone}`}>Call</a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <button className={`inspect-tease ${uiHidden ? "hidden-ui" : ""}`} onClick={() => setInspectOpen(true)}>
          <div className="inspect-tease-content">
            <span className="kicker"><span className="live-dot" /> Interactive</span>
            <h2>Choose Viewing Area</h2>
            <p>Tap the car diagram to jump straight to wheels, interior, boot, startup or condition.</p>
            <span className="inspect-chip">Open Viewer →</span>
          </div>
        </button>

        <div className="video-tools">
          <button className="btn btn-glass" onClick={() => setUiHidden(!uiHidden)}>
            {uiHidden ? "Show Details" : "Clean Video"}
          </button>
          <button className="btn btn-purple" onClick={() => setInspectOpen(true)}>Choose Area</button>
          <a className="btn btn-white" href={`https://wa.me/${whatsAppNumber}?text=${message}`}>Enquire</a>
        </div>
      </section>

      <AnimatePresence>
        {inspectOpen && <InspectBay car={car} onClose={() => setInspectOpen(false)} onJump={jumpTo} />}
      </AnimatePresence>
    </main>
  );
}
