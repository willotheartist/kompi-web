"use client";

import * as React from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Slide = {
  title: string;
  description: string; // ~130 chars
  imageSrc: string;
  imageAlt: string;
  bg: string; // card background
};

const SLIDES: Slide[] = [
  {
    title: "Link in bio",
    description:
      "One clean link for your bio. Add your top destinations, keep it tidy, and update it anytime without breaking your flow.",
    imageSrc: "/solutions/solutions25.png",
    imageAlt: "Link in bio preview",
    bg: "#7F1D1D",
  },
  {
    title: "Short links + tracking",
    description:
      "Turn long URLs into short, branded links. Track clicks over time and see what’s working before you post the next thing.",
    imageSrc: "/solutions/solutions21.png",
    imageAlt: "Short links preview",
    bg: "#1D4ED8",
  },
  {
    title: "Branded QR codes",
    description:
      "Create on-brand QR codes that scan fast. Track scans and route offline attention to something measurable, not a dead end.",
    imageSrc: "/solutions/solutions22.png",
    imageAlt: "QR codes preview",
    bg: "#0F766E",
  },
  {
    title: "K-Cards",
    description:
      "A digital card for your name, links, and CTA. Share instantly, look professional, and make it easy for people to act.",
    imageSrc: "/solutions/solutions23.png",
    imageAlt: "Digital business card preview",
    bg: "#F97316",
  },
  {
    title: "QR menus",
    description:
      "Build a menu that looks great on phones. Update items instantly and let customers scan once and get what they need fast.",
    imageSrc: "/solutions/solutions24.png",
    imageAlt: "QR menu preview",
    bg: "#A78BFA",
  },
  {
    title: "Analytics that matter",
    description:
      "Know what people actually click and scan. Use simple analytics to improve your next post, promo, or campaign each week.",
    imageSrc: "/solutions/solutions26.png",
    imageAlt: "Analytics preview",
    bg: "#111827",
  },
];

function clampIndex(i: number, len: number) {
  return (i + len) % len;
}

export default function KompiDoes() {
  const [index, setIndex] = React.useState(0);
  const trackRef = React.useRef<HTMLDivElement | null>(null);

  const go = React.useCallback((dir: -1 | 1) => {
    setIndex((prev) => clampIndex(prev + dir, SLIDES.length));
  }, []);

  // Simple swipe support (touch + trackpad)
  React.useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    let startX = 0;
    let deltaX = 0;
    let isDown = false;

    const onDown = (clientX: number) => {
      isDown = true;
      startX = clientX;
      deltaX = 0;
    };

    const onMove = (clientX: number) => {
      if (!isDown) return;
      deltaX = clientX - startX;
    };

    const onUp = () => {
      if (!isDown) return;
      isDown = false;

      // threshold tuned for "card slider" feel
      if (deltaX > 60) go(-1);
      if (deltaX < -60) go(1);
    };

    const onTouchStart = (e: TouchEvent) => onDown(e.touches[0]?.clientX ?? 0);
    const onTouchMove = (e: TouchEvent) => onMove(e.touches[0]?.clientX ?? 0);
    const onTouchEnd = () => onUp();

    const onMouseDown = (e: MouseEvent) => onDown(e.clientX);
    const onMouseMove = (e: MouseEvent) => onMove(e.clientX);
    const onMouseUp = () => onUp();

    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: true });
    el.addEventListener("touchend", onTouchEnd);

    // mouse (desktop)
    el.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
      el.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [go]);

  return (
    <section className="w-full py-14 md:py-20">
      <div className="mx-auto w-full max-w-6xl px-4">
        {/* Header (Option B) */}
        <div className="text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-neutral-950">
            Everything Kompi helps you do
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base md:text-lg leading-relaxed text-neutral-700">
            Links, QR, cards, menus, and simple analytics — built to turn attention into measurable actions.
          </p>
        </div>

        {/* Slider */}
        <div
          ref={trackRef}
          className="relative mt-10 overflow-hidden rounded-[2.5rem]"
          aria-roledescription="carousel"
        >
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {SLIDES.map((s, i) => (
              <div key={s.title} className="w-full shrink-0">
                <div
                  className="rounded-[2.5rem] border border-black/10"
                  style={{ backgroundColor: s.bg }}
                >
                  <div className="grid items-center gap-8 p-8 md:grid-cols-12 md:p-12">
                    {/* Left image block */}
                    <div className="md:col-span-5">
                      <div className="relative overflow-hidden rounded-[1.75rem] bg-white/10 ring-1 ring-white/15">
                        <div className="relative aspect-[4/3] w-full">
                          <Image
                            src={s.imageSrc}
                            alt={s.imageAlt}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 520px"
                            priority={i === 0}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Right text */}
                    <div className="md:col-span-7">
                      <div className="max-w-xl space-y-4">
                        <h3 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
                          {s.title}
                        </h3>
                        <p className="text-base md:text-lg leading-relaxed text-white/85">
                          {s.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="mt-6 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => go(-1)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-black/15 bg-white shadow-sm hover:shadow-md transition"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={() => go(1)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-black/15 bg-white shadow-sm hover:shadow-md transition"
            aria-label="Next slide"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
