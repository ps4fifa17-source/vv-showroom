 "use client";

import { useEffect, useRef, useState } from "react";

export default function PremiumVideo({ src, wrapperClassName = "", videoClassName = "" }) {
  const ref = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video || !src) return;

    async function play() {
      const el = ref.current;
      if (!el) return;
      el.muted = true;
      el.playsInline = true;
      try {
        if (el.readyState < 2) el.load();
        await el.play();
      } catch (_) {}
    }

    play();
    window.addEventListener("pageshow", play);
    window.addEventListener("focus", play);
    document.addEventListener("visibilitychange", play);

    return () => {
      window.removeEventListener("pageshow", play);
      window.removeEventListener("focus", play);
      document.removeEventListener("visibilitychange", play);
    };
  }, [src]);

  return (
    <div className={`video-shell ${ready ? "video-ready" : ""} ${wrapperClassName}`}>
      <video
        ref={ref}
        className={videoClassName}
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
