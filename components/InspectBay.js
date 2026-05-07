import { motion } from "framer-motion";

export default function InspectBay({ car, onClose, onJump }) {
  return (
    <motion.div className="inspect-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.div className="inspect-bay" initial={{ opacity: 0, scale: 0.96, y: 18 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96, y: 18 }} transition={{ duration: 0.42, ease: [0.2, 0.8, 0.2, 1] }}>
        <div className="inspect-top">
          <div>
            <h2>Choose Viewing Area</h2>
            <p>Tap a part of the car. The video jumps straight there.</p>
          </div>
          <button className="close" onClick={onClose} aria-label="Close viewing area">×</button>
        </div>

        <div className="inspect-visual-wrap">
          <div className="inspect-grid-bg" />
          <div className="inspect-visual">
            <img src="/images/inspect-car.png" alt="Vehicle inspection graphic" />
            {car.hotspots.map((spot) => (
              <button key={spot.label} className="hotspot" style={{ "--x": spot.x, "--y": spot.y }} onClick={() => onJump(spot.time)} aria-label={`View ${spot.label}`}>
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
