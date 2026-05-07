 "use client";
import Link from "next/link";
import { motion } from "framer-motion";

export default function PortraitCard({ car }) {
  return (
    <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}>
      <Link href={`/car/${car.slug}`} className="portrait-card">
        <video src={car.teaserVideo} poster={car.poster} autoPlay muted loop playsInline preload="metadata" />
        <div className="portrait-shade" />
        <div className="portrait-info">
          <span className="status">{car.status}</span>
          <h3 className="car-title">{car.title}</h3>
          <div className="card-price">{car.price}</div>
          <div className="specs"><span>{car.mileage}</span><span>{car.fuel}</span><span>{car.gearbox}</span></div>
          <div className="enter"><strong>Enter showroom</strong><div className="arrow">→</div></div>
        </div>
      </Link>
    </motion.div>
  );
}
