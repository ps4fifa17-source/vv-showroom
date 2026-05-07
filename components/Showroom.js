 "use client";
import { AnimatePresence, motion } from "framer-motion";
import { Search, Eye, MessageCircle, Phone } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { dealership } from "../data/cars";
import InspectBay from "./InspectBay";

function DetailsCard({ car }) {
  return (
    <div className="glass-card">
      <h2>Details</h2>
      {car.details.map(([label, value]) => <div className="detail-row" key={label}><span>{label}</span><strong>{value}</strong></div>)}
    </div>
  );
}

function AskCard({ question, setQuestion, message, cleanPhone, whatsAppNumber }) {
  return (
    <div className="glass-card">
      <h2>Ask</h2>
      <textarea className="question-input" value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="Ask about this car..." />
      <div className="cta-grid">
        <a className="btn btn-accent" href={`https://wa.me/${whatsAppNumber}?text=${message}`}><MessageCircle size={15}/> WhatsApp</a>
        <a className="btn btn-white" href={`tel:${cleanPhone}`}><Phone size={15}/> Call</a>
      </div>
    </div>
  );
}

function InspectCard({ onClick }) {
  return (
    <button className="glass-card inspect-mini" onClick={onClick}>
      <h2>Inspect Vehicle</h2>
      <p>Jump straight to key areas in the walkaround.</p>
      <span className="mini-link"><Search size={14}/> Open inspect</span>
    </button>
  );
}

export default function Showroom({ car }) {
  const videoRef = useRef(null);
  const [inspectOpen, setInspectOpen] = useState(false);
  const [cleanMode, setCleanMode] = useState(false);
  const [question, setQuestion] = useState("");

  useEffect(() => {
    document.body.classList.toggle("no-scroll", inspectOpen);
    return () => document.body.classList.remove("no-scroll");
  }, [inspectOpen]);

  useEffect(() => {
    document.body.classList.toggle("clean-site", cleanMode);
    return () => document.body.classList.remove("clean-site");
  }, [cleanMode]);

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
    <main className={`showroom-page ${cleanMode ? "clean-mode" : ""}`} style={{ "--accent": dealership.accent, "--accent2": dealership.accent2 }}>
      <section className="showroom-video-area">
        <img className="walk-video" src={car.poster} alt="" aria-hidden="true" />
        <video ref={videoRef} className="walk-video" src={car.walkaroundVideo} poster={car.poster} autoPlay muted loop playsInline controls={!cleanMode} preload="metadata" />
        <div className="video-gradient" />

        <motion.div className="showroom-overlay" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, ease: [0.2, 0.8, 0.2, 1] }}>
          <div className="overlay-inner">
            <div className="main-copy">
              <h1>{car.title}</h1>
              <div className="keybar"><span>{car.price}</span><span>{car.mileage}</span><span>{car.fuel}</span><span>{car.gearbox}</span><span>{car.body}</span></div>
            </div>
            <div className="floating-panel">
              <InspectCard onClick={() => setInspectOpen(true)} />
              <DetailsCard car={car} />
              <AskCard question={question} setQuestion={setQuestion} message={message} cleanPhone={cleanPhone} whatsAppNumber={whatsAppNumber} />
            </div>
          </div>
        </motion.div>

        <div className="video-tools">
          <button className="btn btn-glass" onClick={() => setCleanMode(true)}><Eye size={15}/> Clean View</button>
          <button className="btn btn-accent" onClick={() => setInspectOpen(true)}><Search size={15}/> Inspect</button>
          <a className="btn btn-white" href={`https://wa.me/${whatsAppNumber}?text=${message}`}>Enquire</a>
        </div>

        <div className="clean-tools">
          <button className="btn btn-glass" onClick={() => setCleanMode(false)}>Show Details</button>
          <button className="btn inspect-clean-btn" onClick={() => setInspectOpen(true)}><Search size={15}/> Inspect</button>
        </div>
      </section>

      <section className="mobile-car-info">
        <div className="mobile-info-stack">
          <InspectCard onClick={() => setInspectOpen(true)} />
          <DetailsCard car={car} />
          <AskCard question={question} setQuestion={setQuestion} message={message} cleanPhone={cleanPhone} whatsAppNumber={whatsAppNumber} />
        </div>
      </section>

      <AnimatePresence>
        {inspectOpen && <InspectBay car={car} onClose={() => setInspectOpen(false)} onJump={jumpTo} />}
      </AnimatePresence>
    </main>
  );
}
