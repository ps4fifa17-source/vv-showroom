 "use client";

import { Armchair, CircleDot, CarFront, Car, ShieldCheck, Play, RotateCcw } from "lucide-react";
import PremiumVideo from "./PremiumVideo";

const iconMap = {
  seat: Armchair,
  wheel: CircleDot,
  front: CarFront,
  rear: Car,
  shield: ShieldCheck,
  walkaround: RotateCcw,
};

export default function InspectCards({ car, activeLabel, onSelect, popup = false }) {
  const clips = [
    { label: "Walkaround", icon: "walkaround", video: car.walkaroundVideo, preview: car.teaserVideo },
    ...(car.inspectVideos || []).filter((clip) => clip?.video)
  ];

  return (
    <div className={popup ? "inspect-card-grid popup-grid" : "inspect-card-grid"}>
      {clips.map((clip) => {
        const Icon = iconMap[clip.icon] || Play;
        const isActive = activeLabel === clip.label;

        return (
          <button type="button" key={clip.label} className={`inspect-video-card ${isActive ? "active" : ""}`} onClick={() => onSelect(clip)}>
            <PremiumVideo src={clip.preview || clip.video} wrapperClassName="inspect-preview-video" />
            <div className="inspect-video-shade" />
            <div className="inspect-video-content">
              <span className="inspect-video-icon"><Icon size={16} /></span>
              <strong>{clip.label}</strong>
              <small>{isActive ? "Playing now" : "Tap to view"}</small>
            </div>
          </button>
        );
      })}
    </div>
  );
}
