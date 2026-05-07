import { motion } from "framer-motion";
import { dealership } from "../data/cars";

export default function InspectBay({ car, onClose, onJump }) {
  return (
    <motion.div className="inspect-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ "--accent": dealership.accent, "--accent2": dealership.accent2 }}>
      <motion.div className="inspect-bay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.42, ease: [0.2, 0.8, 0.2, 1] }}>
        <div className="inspect-top">
          <div>
            <h2>Inspect Vehicle</h2>
            <p>Select an area. The walkaround jumps straight there.</p>
          </div>
          <button className="close" onClick={onClose}>×</button>
        </div>
        <div className="inspect-visual-wrap">
          <div className="inspect-frame">
            <img src="/images/inspect-car.png" alt="Vehicle inspection graphic" />
            {car.hotspots.map((spot) => (
              <button key={spot.label} className="hotspot" style={{ "--x": spot.x, "--y": spot.y }} onClick={() => onJump(spot.time)}>
                <span className="hotspot-dot" />
                <span className="hotspot-label">{spot.label}</span>
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
