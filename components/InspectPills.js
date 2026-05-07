 "use client";

import { Armchair, CircleDot, CarFront, Car, ShieldCheck, Play } from "lucide-react";

const iconMap = {
  seat: Armchair,
  wheel: CircleDot,
  front: CarFront,
  rear: Car,
  shield: ShieldCheck,
};

export default function InspectPills({ clips = [], activeClip, onSelect, compact = false }) {
  const available = clips.filter((clip) => clip?.video);
  if (!available.length) return null;

  return (
    <div className={compact ? "inspect-popup-list" : "inspect-pill-grid"}>
      {available.map((clip) => {
        const Icon = iconMap[clip.icon] || Play;
        const isActive = activeClip === clip.label;
        return (
          <button
            type="button"
            key={`${clip.label}-${clip.video}`}
            className={`inspect-pill ${isActive ? "active" : ""} ${compact ? "compact" : ""}`}
            onClick={() => onSelect(clip)}
          >
            <span className="inspect-pill-icon"><Icon size={16} /></span>
            <span><strong>{clip.label}</strong><small>{isActive ? "Playing now" : "View clip"}</small></span>
          </button>
        );
      })}
    </div>
  );
}
