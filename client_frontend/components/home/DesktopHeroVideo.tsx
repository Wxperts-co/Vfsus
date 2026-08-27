'use client';

import { useEffect, useRef, useState } from 'react';

export default function DesktopHeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [canLoad, setCanLoad] = useState(false);

  useEffect(() => {
    // Only load video on desktop devices (>= 768px) and when main thread is idle
    if (typeof window !== 'undefined' && window.innerWidth >= 768) {
      if ('requestIdleCallback' in window) {
        window.requestIdleCallback(() => setCanLoad(true));
      } else {
        const timer = setTimeout(() => setCanLoad(true), 1200);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  useEffect(() => {
    if (canLoad && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [canLoad]);

  if (!canLoad) return null;

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      loop
      playsInline
      preload="none"
      className="absolute inset-0 w-full h-full object-cover z-10 transition-opacity duration-1000"
    >
      <source src="/images/bg-video-flag.mp4" type="video/mp4" />
    </video>
  );
}
