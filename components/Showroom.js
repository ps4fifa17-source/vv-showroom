 "use client";

import { motion, AnimatePresence } from "framer-motion";
import { Search, Eye, MessageCircle, Phone, Info, Send, PhoneCall, X, Video, Maximize2 } from "lucide-react";
import { useEffect, useState } from "react";
import { dealership } from "../data/cars";
import PremiumVideo from "./PremiumVideo";
import InspectPills from "./InspectPills";

function DetailsCard({ car }) {
  return (
    <div className="glass-card" id="details">
      <h2>Details</h2>
      {car.details.map(([label, value]) => <div className="detail-row" key={label}><span>{label}</span><strong>{value}</strong></div>)}
    </div>
  );
}

function AskCard({ question, setQuestion, message, cleanPhone, whatsAppNumber }) {
  return (
    <div className="glass-card" id="ask">
      <h2>Ask</h2>
      <textarea className="question-input" value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="Ask about this car..." />
      <div className="cta-grid">
        <a className="btn btn-accent" href={`https://wa.me/${whatsAppNumber}?text=${message}`}><MessageCircle size={15}/> WhatsApp</a>
        <a className="btn btn-white" href={`tel:${cleanPhone}`}><Phone size={15}/> Call</a>
      </div>
    </div>
  );
}

function InspectSection({ car, activeClip, onSelect }) {
  if (!car.inspectVideos?.filter((clip) => clip.video).length) return null;
  return (
    <div className="glass-card inspect-card" id="inspect">
      <h2>Inspect Vehicle</h2>
      <p>Choose an area and the showroom video switches straight to that section.</p>
      <InspectPills clips={car.inspectVideos} activeClip={activeClip} onSelect={onSelect} />
    </div>
  );
}

export default function Showroom({ car }) {
  const [cleanMode, setCleanMode] = useState(false);
  const [inspectMenu, setInspectMenu] = useState(false);
  const [question, setQuestion] = useState("");
  const [currentVideo, setCurrentVideo] = useState(car.walkaroundVideo);
  const [activeClip, setActiveClip] = useState("Walkaround");

  useEffect(() => {
    document.body.classList.toggle("clean-site", cleanMode);
    return () => document.body.classList.remove("clean-site");
  }, [cleanMode]);

  useEffect(() => {
    setCurrentVideo(car.walkaroundVideo);
    setActiveClip("Walkaround");
  }, [car.walkaroundVideo]);

  const cleanPhone = dealership.phone.replaceAll(" ", "");
  const whatsAppNumber = "44" + dealership.whatsapp.replace(/^0/, "");
  const message = encodeURIComponent(`Hi, I'm interested in the ${car.title}. ${question ? "My question is: " + question : "Can you tell me more about it?"}`);

  function scrollToSection(id) {
    setCleanMode(false);
    setInspectMenu(false);
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 60);
  }

  function selectInspectClip(clip) {
    setCurrentVideo(clip.video);
    setActiveClip(clip.label);
    setInspectMenu(false);
    if (!cleanMode && typeof window !== "undefined" && window.innerWidth <= 920) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  return (
    <main className={`showroom-page ${cleanMode ? "clean-mode" : ""}`} style={{ "--accent": dealership.accent, "--accent2": dealership.accent2 }}>
      <section className="showroom-video-area" id="video">
        <PremiumVideo src={currentVideo} wrapperClassName="mobile-blur-wrap" />
        <PremiumVideo src={currentVideo} wrapperClassName="walk-video-wrap" />
        <div className="video-gradient" />

        <motion.div className="showroom-overlay" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, ease: [0.2, 0.8, 0.2, 1] }}>
          <div className="overlay-inner">
            <div className="main-copy">
              <h1>{car.title}</h1>
              <div className="keybar"><span>{car.price}</span><span>{car.mileage}</span><span>{car.fuel}</span><span>{car.gearbox}</span><span>{car.body}</span></div>
            </div>

            <div className="floating-panel">
              <InspectSection car={car} activeClip={activeClip} onSelect={selectInspectClip} />
              <DetailsCard car={car} />
              <AskCard question={question} setQuestion={setQuestion} message={message} cleanPhone={cleanPhone} whatsAppNumber={whatsAppNumber} />
            </div>
          </div>
        </motion.div>

        <div className="mobile-video-dock">
          <button type="button" onClick={() => setCleanMode(true)}><Maximize2 size={16}/><span>Cinema</span></button>
          <button type="button" onClick={() => scrollToSection("inspect")}><Search size={16}/><span>Inspect</span></button>
          <button type="button" onClick={() => scrollToSection("details")}><Info size={16}/><span>Details</span></button>
          <button type="button" onClick={() => scrollToSection("ask")}><Send size={16}/><span>Ask</span></button>
          <a href={`tel:${cleanPhone}`}><PhoneCall size={16}/><span>Call</span></a>
        </div>

        <div className="desktop-tools">
          <button type="button" className="btn btn-glass" onClick={() => setCleanMode(true)}><Eye size={15}/> Clean View</button>
          <button type="button" className="btn btn-accent" onClick={() => scrollToSection("inspect")}><Search size={15}/> Inspect</button>
          <a className="btn btn-white" href={`https://wa.me/${whatsAppNumber}?text=${message}`}>Enquire</a>
        </div>

        <div className="clean-tools">
          <button type="button" className="btn btn-glass" onClick={() => setCleanMode(false)}>Show Details</button>
          <button type="button" className="btn inspect-clean-btn" onClick={() => setInspectMenu(true)}><Search size={15}/> Inspect</button>
        </div>
      </section>

      <section className="mobile-car-info">
        <div className="mobile-info-stack">
          <InspectSection car={car} activeClip={activeClip} onSelect={selectInspectClip} />
          <DetailsCard car={car} />
          <AskCard question={question} setQuestion={setQuestion} message={message} cleanPhone={cleanPhone} whatsAppNumber={whatsAppNumber} />
        </div>
      </section>

      <AnimatePresence>
        {inspectMenu && (
          <motion.div className="inspect-menu-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="inspect-menu" initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 40, opacity: 0 }}>
              <div className="inspect-menu-head">
                <div>
                  <h2>Inspect Vehicle</h2>
                  <p>Choose a clip. Cinema view stays on.</p>
                </div>
                <button type="button" onClick={() => setInspectMenu(false)}><X size={20}/></button>
              </div>
              <InspectPills clips={car.inspectVideos} activeClip={activeClip} onSelect={selectInspectClip} compact />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
