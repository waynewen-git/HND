"use client";

import { useRef } from "react";
import { Square } from "lucide-react";

const DEMO_VIDEO = "/videos/products/Testing-Demo-1.MP4";

export default function CategoryDemoVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleStop = () => {
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    video.currentTime = 0;
  };

  return (
    <div className="mx-auto w-full max-w-5xl">
      <div className="relative aspect-video overflow-hidden rounded-sm bg-hnd-black">
        <video
          ref={videoRef}
          controls
          playsInline
          preload="metadata"
          className="h-full w-full object-contain"
        >
          <source src={DEMO_VIDEO} type="video/mp4" />
        </video>
      </div>
      <div className="mt-3 flex justify-center">
        <button
          type="button"
          onClick={handleStop}
          className="inline-flex items-center gap-2 rounded-sm bg-hnd-gray-100 px-4 py-2 text-sm text-hnd-gray-700 transition-colors hover:bg-hnd-gray-300 dark:bg-hnd-gray-900 dark:text-hnd-gray-300 dark:hover:bg-hnd-gray-800"
          aria-label="Stop video"
        >
          <Square className="h-3.5 w-3.5 fill-current" />
          Stop
        </button>
      </div>
    </div>
  );
}
