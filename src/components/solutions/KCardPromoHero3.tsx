"use client";

import Image from "next/image";
import React from "react";

export function KCardPromoHero3() {
  return (
    <section
      className="
        w-full 
        h-[80vh] 
        rounded-[48px] 
        bg-[#EBF77A] 
        overflow-hidden 
        flex 
        items-center 
        justify-between 
        px-16 
        relative
      "
    >
      {/* LEFT CONTENT */}
      <div className="w-1/2 flex flex-col gap-6 z-10">
        <h1 className="text-5xl font-semibold leading-[1.05] tracking-[-0.04em] text-[#0C4138]">
          Customisable QR <br /> Codes that stand out.
        </h1>

        <p className="text-lg max-w-md text-[#0C4138] leading-relaxed">
          Kompi brings your links, pages, analytics and customer touchpoints
          into one simple workspace. Track performance, collect contacts, manage
          campaigns and share everything with your team — all without switching tools.
        </p>

        <button
          className="
            mt-4 
            px-8 
            py-4 
            bg-[#0C4138] 
            rounded-full 
            font-medium 
            text-white 
            hover:opacity-90 
            transition
          "
        >
          Get Started
        </button>
      </div>

      {/* RIGHT IMAGE */}
      <div className="w-1/2 h-full flex items-center justify-center relative">
        <Image
          src="/growth/kompi-codes.png"
          alt="Kompi Cards"
          width={400}
          height={400}
          className="object-contain"
        />
      </div>
    </section>
  );
}
