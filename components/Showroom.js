 "use client";

import { motion, AnimatePresence } from "framer-motion";
import { Search, Eye, MessageCircle, Phone, Info, Send, PhoneCall, X, Maximize2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { dealership } from "../data/cars";
import PremiumVideo from "./PremiumVideo";
import InspectCards from "./InspectCards";

function DetailsCard({ car }, ref) {
  return (
    <div className="glass-card" id="details" ref={ref}>
      <h2>Details</h2>
      {car.details.map(([label, value]) => <div className="detail-row" key={label}><span>{label}</span><strong>{value}</strong></div>)}
    </div>
  );
}

function AskCard({ question, setQuestion, message, cleanPhone, whatsAppNumber, innerRef }) {
  return (
    <div className="glass-card" id="ask" ref={innerRef}>
      <h2>Ask</h2>
      <textarea className="question-input" value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="Ask about this car..." />
      <div className="cta-grid">
        <a className="btn btn-accent" href={`https://wa.me/${whatsAppNumber}?text=${message}`}><MessageCircle size={15}/> WhatsApp</a>
        <a className="btn btn-white" href={`tel:${cleanPhone}`}><Phone size={15}/> Call</a>
      </div>
    </div>
  );
}

export default function Showroom({ car }) {
  const [cleanMode, setCleanMode] = useState(false);
  const [inspectPopup, setInspectPopup] = useState(false);
  const [question, setQuestion] = useState("");
  const [currentVideo, setCurrentVideo] = useState(car.walkaroundVideo);
  const [activeLabel, setActiveLabel] = useState("Walkaround");

  const videoRef = useRef(null);
  const inspectRef = useRef(null);
  const detailsRef = useRef(null);
  const askRef = useRef(null);

  useEffect(() => {
    document.body.classList.toggle("clean-site", cleanMode);
    return () => document.body.classList.remove("clean-site");
  }, [cleanMode]);

  useEffect(() => {
    setCurrentVideo(car.walkaroundVideo);
    setActiveLabel("Walkaround");
  }, [car.walkaroundVideo]);

  const cleanPhone = dealership.phone.replaceAll(" ", "");
  const whatsAppNumber = "44" + dealership.whatsapp.replace(/^0/, "");
  const message = encodeURIComponent(`Hi, I'm interested in the ${car.title}. ${question ? "My question is: " + question : "Can you tell me more about it?"}`);

  const sectionMap = { video: videoRef, inspect: inspectRef, details: detailsRef, ask: askRef };

  function scrollToSection(id) {
    setCleanMode(false);
    setInspectPopup(false);
    const ref = sectionMap[id];
    setTimeout(() => {
      ref?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  }

  function selectClip(clip) {
    setCurrentVideo(clip.video);
    setActiveLabel(clip.label);
    setInspectPopup(false);
    if (!cleanMode && typeof window !== "undefined" && window.innerWidth <= 920) {
      setTimeout(() => videoRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 60);
    }
  }

  return (
    <main className={`showroom-page ${cleanMode ? "clean-mode" : ""}`} style={{ "--accent": dealership.accent, "--accent2": dealership.accent2 }}>
      <section className="showroom-video-area" id="video" ref={videoRef}>
        <PremiumVideo src={currentVideo} wrapperClassName="mobile-blur-wrap" />
        <PremiumVideo src={currentVideo} wrapperClassName="walk-video-wrap" />
        <div className="video-gradient" />

        <motion.div className="showroom-overlay" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .45 }}>
          <div className="overlay-inner">
            <div className="main-copy">
              <h1>{car.title}</h1>
              <div className="keybar"><span>{car.price}</span><span>{car.mileage}</span><span>{car.fuel}</span><span>{car.gearbox}</span><span>{car.body}</span></div>
            </div>

            <div className="floating-panel desktop-panel">
              <div className="glass-card inspect-card" ref={inspectRef}>
                <h2>Inspect Vehicle</h2>
                <p>Choose an area and the showroom video switches straight to that section.</p>
                <InspectCards car={car} activeLabel={activeLabel} onSelect={selectClip} />
              </div>
              <div className="glass-card" ref={detailsRef}>
                <h2>Details</h2>
                {car.details.map(([label, value]) => <div className="detail-row" key={label}><span>{label}</span><strong>{value}</strong></div>)}
              </div>
              <AskCard question={question} setQuestion={setQuestion} message={message} cleanPhone={cleanPhone} whatsAppNumber={whatsAppNumber} innerRef={askRef} />
            </div>
          </div>
        </motion.div>

        <div className="desktop-dock video-tools">
          <button type="button" className="btn btn-glass" onClick={() => setCleanMode(true)}><Eye size={15}/> Cinema</button>
          <button type="button" className="btn btn-accent" onClick={() => setInspectPopup(true)}><Search size={15}/> Inspect</button>
          <a className="btn btn-white" href={`https://wa.me/${whatsAppNumber}?text=${message}`}>Enquire</a>
        </div>

        <div className="clean-tools">
          <button type="button" className="btn btn-glass" onClick={() => setCleanMode(false)}>Show Details</button>
          <button type="button" className="btn inspect-clean-btn" onClick={() => setInspectPopup(true)}><Search size={15}/> Inspect</button>
        </div>
      </section>

      <section className="mobile-car-info">
        <div className="mobile-info-stack">
          <div className="glass-card inspect-card" ref={inspectRef}>
            <h2>Inspect Vehicle</h2>
            <p>Choose an area and the video above switches to that section.</p>
            <InspectCards car={car} activeLabel={activeLabel} onSelect={selectClip} />
          </div>
          <div className="glass-card" ref={detailsRef}>
            <h2>Details</h2>
            {car.details.map(([label, value]) => <div className="detail-row" key={label}><span>{label}</span><strong>{value}</strong></div>)}
          </div>
          <AskCard question={question} setQuestion={setQuestion} message={message} cleanPhone={cleanPhone} whatsAppNumber={whatsAppNumber} innerRef={askRef} />
        </div>
      </section>

      <nav className="mobile-dock" aria-label="Vehicle page navigation">
        <button type="button" onClick={() => setCleanMode(true)}><Maximize2 size={17}/><span>Cinema</span></button>
        <button type="button" onClick={() => setInspectPopup(true)}><Search size={17}/><span>Inspect</span></button>
        <button type="button" onClick={() => scrollToSection("details")}><Info size={17}/><span>Details</span></button>
        <button type="button" onClick={() => scrollToSection("ask")}><Send size={17}/><span>Ask</span></button>
        <a href={`tel:${cleanPhone}`}><PhoneCall size={17}/><span>Call</span></a>
      </nav>

      <AnimatePresence>
        {inspectPopup && (
          <motion.div className="inspect-popup-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="inspect-popup" initial={{ opacity: 0, y: 28, scale: .96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 18, scale: .98 }}>
              <div className="inspect-popup-head">
                <div><h2>Inspect Vehicle</h2><p>Choose a section to play.</p></div>
                <button type="button" onClick={() => setInspectPopup(false)}><X size={20}/></button>
              </div>
              <InspectCards car={car} activeLabel={activeLabel} onSelect={selectClip} popup />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
