"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, Volume2, VolumeX } from "lucide-react";
import Button from "@/components/ui/Button";
import { withBasePath } from "@/lib/assetPath";

const HERO_VIDEO = withBasePath("/videos/hero.mp4");
const HERO_POSTER = withBasePath("/images/hero-guitar-1.png");

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [videoFailed, setVideoFailed] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const play = async () => {
      try {
        video.muted = true;
        await video.play();
      } catch {
        setVideoFailed(true);
      }
    };

    play();
  }, []);

  const toggleMute = async () => {
    const video = videoRef.current;
    if (!video) return;

    const next = !muted;
    video.muted = next;
    setMuted(next);

    if (!next) {
      try {
        await video.play();
      } catch {
        video.muted = true;
        setMuted(true);
      }
    }
  };

  return (
    <section
      className="relative min-h-[100svh] w-full overflow-hidden bg-hnd-black"
      aria-label="HND hero"
    >
      {!videoFailed ? (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={HERO_POSTER}
          onError={() => setVideoFailed(true)}
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src={HERO_VIDEO} type="video/mp4" />
        </video>
      ) : (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_POSTER})` }}
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/20" />

      {!videoFailed && (
        <button
          onClick={toggleMute}
          className="absolute top-24 right-6 z-20 flex items-center gap-2 rounded-full bg-black/40 px-4 py-2 text-sm text-white backdrop-blur-sm transition-colors hover:bg-black/60 md:top-28 md:right-12"
          aria-label={muted ? "Unmute video" : "Mute video"}
        >
          {muted ? (
            <VolumeX className="h-4 w-4" />
          ) : (
            <Volume2 className="h-4 w-4" />
          )}
          {muted ? "Unmute" : "Sound On"}
        </button>
      )}

      <div className="relative z-10 flex min-h-[100svh] flex-col items-center justify-end px-6 pb-28 text-center md:pb-36">
        <div className="max-w-4xl">
          <h1 className="font-bebas text-5xl tracking-tight text-white md:text-7xl lg:text-8xl">
            Live is Life
          </h1>
          <p className="mt-4 text-lg text-white/80 md:text-xl">
            Precision electric guitars built for heavy rock
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button href="/products/guitars" size="lg">
              Explore Guitars
            </Button>
            <Button
              href="/shop"
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white/10"
            >
              Shop All
            </Button>
          </div>
        </div>

        <a
          href="#home-content"
          className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1 text-white/50 transition-colors hover:text-white"
          aria-label="Scroll to content"
        >
          <span className="text-[10px] tracking-[0.2em] uppercase">Scroll</span>
          <ChevronDown className="h-5 w-5 animate-bounce" />
        </a>
      </div>
    </section>
  );
}
