"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import illustration from "../../public/illustrations/developer.png";

export function DeveloperIllustration() {
  const video = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      if (preference.matches) video.current?.pause();
      else video.current?.play().catch(() => {});
    };
    update();
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);

  return <figure className={`about-illustration${failed ? " video-unavailable" : ""}`}>
    <video
      ref={video}
      className="developer-animation"
      src="/illustrations/developer-loop.webm"
      poster={illustration.src}
      width={1280}
      height={720}
      autoPlay
      loop
      muted
      playsInline
      preload="metadata"
      aria-label="Animated cartoon of Alen working on his laptop"
      onError={() => setFailed(true)}
    >Your browser does not support video playback.</video>
    <Image className="developer-still" src={illustration} alt="Illustration of Alen working on a laptop with a matcha drink" sizes="(max-width: 760px) 85vw, 450px" />
  </figure>;
}
