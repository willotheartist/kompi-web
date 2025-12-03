"use client";

import Image from "next/image";
import { instrumentSerif } from "@/lib/fonts";

const SOLUTION_IMAGES = [
  "/solutions/solutions19.png",
  "/solutions/solutions20.png",
  "/solutions/solutions21.png",
  "/solutions/solutions22.png",
  "/solutions/solutions23.png",
  "/solutions/solutions24.png",
  "/solutions/solutions25.png",
  "/solutions/solutions26.png",
];

export function KompiAudienceStrip() {
  const marqueeImages = [...SOLUTION_IMAGES, ...SOLUTION_IMAGES];

  return (
    <section className="w-full min-h-screen px-4 py-16 sm:px-8 sm:py-20 lg:px-12 flex flex-col justify-center">
      {/* Heading */}
      <div className="mb-10 text-center sm:mb-14">
        <h2 className="text-3xl font-medium tracking-tight text-[var(--color-text)] sm:text-4xl lg:text-[2.6rem]">
          <span className="block">Designed to help your</span>
          <span
            className={`block ${instrumentSerif.className} text-[#1d4ed8] italic`}
          >
            audience get where 
          </span>
          <span className="block"> they need to go.</span>
        </h2>
      </div>

      {/* Strip background */}
      <div className="overflow-hidden px-1 py-6 sm:px-2 sm:py-8 lg:px-4">
        <div className="relative -mx-6 sm:-mx-8 lg:-mx-10">
          {/* Marquee row */}
          <div className="kompi-marquee flex gap-5 sm:gap-6 lg:gap-8">
            {marqueeImages.map((src, index) => (
              <div
                key={`${src}-${index}`}
                className="relative h-[240px] w-[240px] shrink-0 overflow-hidden rounded-[30px] bg-[#e5e5e5] sm:h-[280px] sm:w-[280px] lg:h-[320px] lg:w-[320px]"
              >
                <Image
                  src={src}
                  alt="People and spaces that Kompi is built for"
                  fill
                  priority={index < 4}
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .kompi-marquee {
          width: max-content;
          animation: kompi-marquee-scroll 40s linear infinite;
        }

        @keyframes kompi-marquee-scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .kompi-marquee {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
