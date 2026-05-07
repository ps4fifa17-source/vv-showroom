 "use client";

import { Armchair, CircleDot, CarFront, Car, ShieldCheck, Play } from "lucide-react";

const iconMap = {
  seat: Armchair,
  wheel: CircleDot,
  front: CarFront,
  rear: Car,
  shield: ShieldCheck,
};

export default function InspectPills({ clips = [], activeVideo, onSelect }) {
  const available = clips.filter((clip) => clip?.video);
  if (!available.length) return null;

  return (
    <div className="glass-card inspect-card" id="inspect">
      <h2>Inspect Vehicle</h2>
      <p>Choose an area and the showroom video switches straight to that section.</p>

      <div className="inspect-pill-grid">
        {available.map((clip) => {
          const Icon = iconMap[clip.icon] || Play;
          const isActive = activeVideo === clip.video;
          return (
            <button key={`${clip.label}-${clip.video}`} className={`inspect-pill ${isActive ? "active" : ""}`} onClick={() => onSelect(clip.video)}>
              <span className="inspect-pill-icon"><Icon size={16} /></span>
              <span><strong>{clip.label}</strong><small>{isActive ? "Playing now" : "View clip"}</small></span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
