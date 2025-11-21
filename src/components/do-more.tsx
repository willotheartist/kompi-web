import Image from "next/image";

const CARDS = [
  {
    title: "Share your world instantly",
    body: "Make it effortless for people to find you, anywhere.",
    image: "/kompione.png",
  },
  {
    title: "Turn attention into action",
    body: "Guide your audience to what matters most—fast.",
    image: "/kompitwo.png",
  },
  {
    title: "Everywhere, in one place.",
    body: "Bring all your content together in one clean place.",
    image: "/kompithree.png",
  },
  {
    title: "Make every interaction count",
    body: "Give people an easy way to follow, message, or explore.",
    image: "/kompifour.png",
  },
  {
    title: "Boost visibility with style",
    body: "Stand out with a modern, branded digital presence.",
    image: "/kompisix.png",
  },
];

// You can call this component <DoMoreSection /> or <Section /> – your choice.
// I’ll use DoMoreSection here.
export function DoMoreSection() {
  const cardsLoop = [...CARDS, ...CARDS];

  return (
    <section className="doMore-section" id="DoMore">
      <div className="doMore-header">
        <h2 className="doMore-title">Do more with your digital presence.</h2>
      </div>

      <div className="doMore-track-outer">
        <div className="doMore-track">
          {cardsLoop.map((card, index) => (
            <article className="doMore-card" key={`${card.title}-${index}`}>
              <div className="doMore-card-imageWrapper">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  sizes="(max-width: 768px) 80vw, 320px"
                  className="doMore-card-image"
                />
              </div>

              <div className="doMore-card-body">
                <h3 className="doMore-card-title">{card.title}</h3>
                <p className="doMore-card-text">{card.body}</p>
                <button className="doMore-card-cta" type="button">
                  Learn more
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
