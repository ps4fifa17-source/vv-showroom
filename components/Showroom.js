 "use client";

import { motion } from "framer-motion";
import { Search, Eye, MessageCircle, Phone, Info, Send, PhoneCall } from "lucide-react";
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

export default function Showroom({ car }) {
  const [cleanMode, setCleanMode] = useState(false);
  const [question, setQuestion] = useState("");
  const [currentVideo, setCurrentVideo] = useState(car.walkaroundVideo);

  useEffect(() => {
    document.body.classList.toggle("clean-site", cleanMode);
    return () => document.body.classList.remove("clean-site");
  }, [cleanMode]);

  useEffect(() => setCurrentVideo(car.walkaroundVideo), [car.walkaroundVideo]);

  const cleanPhone = dealership.phone.replaceAll(" ", "");
  const whatsAppNumber = "44" + dealership.whatsapp.replace(/^0/, "");
  const message = encodeURIComponent(`Hi, I'm interested in the ${car.title}. ${question ? "My question is: " + question : "Can you tell me more about it?"}`);

  function scrollToSection(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function selectInspectClip(video) {
    setCurrentVideo(video);
    setCleanMode(false);
    if (typeof window !== "undefined" && window.innerWidth <= 920) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  return (
    <main className={`showroom-page ${cleanMode ? "clean-mode" : ""}`} style={{ "--accent": dealership.accent, "--accent2": dealership.accent2 }}>
      <section className="showroom-video-area">
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
              <InspectPills clips={car.inspectVideos} activeVideo={currentVideo} onSelect={selectInspectClip} />
              <DetailsCard car={car} />
              <AskCard question={question} setQuestion={setQuestion} message={message} cleanPhone={cleanPhone} whatsAppNumber={whatsAppNumber} />
            </div>
          </div>
        </motion.div>

        <div className="video-tools">
          <button className="btn btn-glass" onClick={() => setCleanMode(true)}><Eye size={15}/> Clean View</button>
          <button className="btn btn-accent" onClick={() => scrollToSection("inspect")}><Search size={15}/> Inspect</button>
          <a className="btn btn-white" href={`https://wa.me/${whatsAppNumber}?text=${message}`}>Enquire</a>
        </div>

        <div className="clean-tools">
          <button className="btn btn-glass" onClick={() => setCleanMode(false)}>Show Details</button>
          <button className="btn inspect-clean-btn" onClick={() => setCleanMode(false)}><Search size={15}/> Inspect</button>
        </div>
      </section>

      <section className="mobile-car-info">
        <div className="mobile-info-stack">
          <div className="mobile-shortcuts">
            <button onClick={() => scrollToSection("inspect")} aria-label="Inspect"><Search size={18} /></button>
            <button onClick={() => scrollToSection("details")} aria-label="Details"><Info size={18} /></button>
            <button onClick={() => scrollToSection("ask")} aria-label="Ask"><Send size={18} /></button>
            <a href={`tel:${cleanPhone}`} aria-label="Call"><PhoneCall size={18} /></a>
          </div>
          <InspectPills clips={car.inspectVideos} activeVideo={currentVideo} onSelect={selectInspectClip} />
          <DetailsCard car={car} />
          <AskCard question={question} setQuestion={setQuestion} message={message} cleanPhone={cleanPhone} whatsAppNumber={whatsAppNumber} />
        </div>
      </section>
    </main>
  );
}
