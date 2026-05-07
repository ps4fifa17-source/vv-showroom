 "use client";

import { useEffect, useRef, useState } from "react";

export default function PremiumVideo({ src, wrapperClassName = "", videoClassName = "" }) {
  const ref = useRef(null);
  const lastSrc = useRef(src);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video || !src) return;

    async function playOnly() {
      const el = ref.current;
      if (!el) return;
      el.muted = true;
      el.playsInline = true;
      try {
        await el.play();
      } catch (_) {}
    }

    if (lastSrc.current !== src) {
      lastSrc.current = src;
      setReady(false);
      video.load();
    }

    playOnly();

    window.addEventListener("pageshow", playOnly);
    window.addEventListener("focus", playOnly);
    document.addEventListener("visibilitychange", playOnly);

    return () => {
      window.removeEventListener("pageshow", playOnly);
      window.removeEventListener("focus", playOnly);
      document.removeEventListener("visibilitychange", playOnly);
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
