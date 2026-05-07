 "use client";
import { useMemo, useRef, useState } from "react";
import { defaultHotspots, dealership } from "../../data/cars";

export default function CalibratePage() {
  const stageRef = useRef(null);
  const [points, setPoints] = useState(defaultHotspots);
  const [dragging, setDragging] = useState(null);

  function updatePoint(index, clientX, clientY) {
    const rect = stageRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
    const y = Math.max(0, Math.min(100, ((clientY - rect.top) / rect.height) * 100));
    setPoints((old) => old.map((p, i) => i === index ? { ...p, x: Number(x.toFixed(1)), y: Number(y.toFixed(1)) } : p));
  }

  const output = useMemo(() => `export const defaultHotspots = [
${points.map((p) => `  { label: "${p.label}", time: ${p.time}, x: ${p.x}, y: ${p.y} }`).join(",\n")}
];`, [points]);

  return (
    <main className="calibrate-page" style={{ "--accent": dealership.accent, "--accent2": dealership.accent2 }}>
      <div className="calibrate-shell">
        <div className="calibrate-card">
          <h1>Hotspot calibration</h1>
          <p className="muted">Drag each dot onto the exact part of the inspect image. Copy the code into <strong>data/cars.js</strong>.</p>
          <div
            ref={stageRef}
            className="calibrate-stage"
            onPointerMove={(e) => {
              if (dragging !== null) updatePoint(dragging, e.clientX, e.clientY);
            }}
            onPointerUp={() => setDragging(null)}
            onPointerLeave={() => setDragging(null)}
          >
            <img src="/images/inspect-car.png" alt="Inspect car calibration" />
            {points.map((point, index) => (
              <button
                key={point.label}
                className="cal-point"
                style={{ "--x": point.x, "--y": point.y }}
                onPointerDown={(e) => {
                  e.currentTarget.setPointerCapture(e.pointerId);
                  setDragging(index);
                  updatePoint(index, e.clientX, e.clientY);
                }}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
        <div className="calibrate-card">
          <h2>Coordinates</h2>
          {points.map((point, index) => (
            <div className="detail-row" key={point.label}>
              <span>{index + 1}. {point.label}</span>
              <strong>{point.x}, {point.y}</strong>
            </div>
          ))}
          <h2 style={{ marginTop: 20 }}>Copy this</h2>
          <pre className="code-output">{output}</pre>
        </div>
      </div>
    </main>
  );
}
