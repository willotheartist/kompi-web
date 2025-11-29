"use client";

import { motion } from "framer-motion";

export default function KPromo() {
  const cards = [
    {
      id: "c1",
      title: "Tap-to-share, instantly.",
      subtitle: "K-Cards make real-world moments clickable.",
      img: "/rosadjkompi.png",
      color: "#F6F3E7",
      text: "#0A0A0A",
    },
    {
      id: "c2",
      title: "Premium cards, real impact.",
      subtitle: "Every tap routes through clean Kompi links.",
      img: "/rosadjkompi.png",
      color: "#FFEE8A",
      text: "#0A0A0A",
    },
    {
      id: "c3",
      title: "Your world, connected.",
      subtitle: "Beautiful NFC cards built for modern brands.",
      img: "/rosadjkompi.png",
      color: "#F6F3E7",
      text: "#0A0A0A",
    },
  ];

  return (
    <section
      className="w-full py-28"
      style={{
        background: "#06221F",
        color: "#fff",
        fontFamily: "Inter Tight, sans-serif",
      }}
    >
      <div className="max-w-5xl mx-auto px-6 flex flex-col items-center text-center">
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="uppercase tracking-[0.18em] text-[#86FFC8] text-sm mb-6"
        >
          KOMPI K-CARDS
        </motion.p>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-[48px] md:text-[62px] font-bold leading-[1.05]"
        >
          Make real-world moments
          <br />
          <span
            style={{
              fontFamily: "Instrument Serif, serif",
              fontStyle: "italic",
              color: "#FD7CFD",
            }}
          >
            instantly clickable.
          </span>
        </motion.h2>
      </div>

      {/* Cards */}
      <div className="max-w-6xl mx-auto mt-20 px-6 flex gap-12 justify-center flex-wrap">
        {cards.map((card, i) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1.2,
              ease: "easeOut",
              delay: i * 0.25, // luxe stagger
            }}
            viewport={{ once: true }}
            className="w-[260px] h-[520px] rounded-[32px] overflow-hidden shadow-none flex flex-col"
            style={{
              background: card.color,
              color: card.text,
            }}
          >
            <div className="w-full h-[70%] overflow-hidden">
              <img
                src={card.img}
                alt="Kompi K-Card"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex flex-col px-6 pt-6 pb-8 text-left">
              <h3 className="text-lg font-semibold">{card.title}</h3>
              <p
                className="text-sm mt-2 opacity-80"
                style={{
                  fontFamily: "Instrument Serif, serif",
                  fontStyle: "italic",
                }}
              >
                {card.subtitle}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
