 "use client";

import { useEffect, useRef, useState } from "react";

export default function PremiumVideo({ src, className = "", wrapperClassName = "" }) {
  const ref = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video || !src) return;

    async function attemptPlay() {
      const el = ref.current;
      if (!el) return;
      el.muted = true;
      el.playsInline = true;
      try {
        if (el.readyState < 2) el.load();
        await el.play();
      } catch (_) {}
    }

    attemptPlay();
    window.addEventListener("pageshow", attemptPlay);
    window.addEventListener("focus", attemptPlay);
    document.addEventListener("visibilitychange", attemptPlay);

    return () => {
      window.removeEventListener("pageshow", attemptPlay);
      window.removeEventListener("focus", attemptPlay);
      document.removeEventListener("visibilitychange", attemptPlay);
    };
  }, [src]);

  return (
    <div className={`video-shell ${ready ? "video-ready" : ""} ${wrapperClassName}`}>
      <video
        ref={ref}
        className={className}
        src={src}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        controls={false}
        disablePictureInPicture
        controlsList="nodownload nofullscreen noremoteplayback"
        onLoadedData={() => setReady(true)}
        onCanPlay={() => {
          setReady(true);
          ref.current?.play().catch(() => {});
        }}
      />
    </div>
  );
}
