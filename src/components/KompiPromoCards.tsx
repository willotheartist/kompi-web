"use client";

import "./kompi-promo-cards.css";

export function KompiPromoCards() {
  return (
    <div className="wf-kpromo-layout">
      {/* LEFT – copy */}
      <div className="wf-kpromo-copy">
        <p className="wf-eyebrow">Kompi in action</p>
        <h2 className="wf-kpromo-heading">
          Make the world more{" "}
          <span className="wf-serif-accent">clickable.</span>
        </h2>
        <p className="wf-kpromo-body">
          Line up K-Cards, QR posters and short links behind one Kompi
          workspace. Every tap, scan and swipe lands exactly where you need it —
          with analytics your team can actually use.
        </p>
      </div>

      {/* RIGHT – mapping card */}
      <aside className="wf-kpromo-card">
        <div className="wf-kpromo-card-header">
          <span className="wf-kpromo-url-pill">kompi.app/willo</span>
          <span className="wf-kpromo-card-meta">Workspace · Studio</span>
        </div>

        <div className="wf-kpromo-rows">
          <KPromoRow label="K-Card tap" dest="Tap-to-share profile" />
          <KPromoRow label="QR poster" dest="Pop-up offer page" />
          <KPromoRow label="Social bio" dest="Always-fresh link hub" />
          <KPromoRow label="Paid ads" dest="Experiment A/B URLs" />
        </div>
      </aside>
    </div>
  );
}

function KPromoRow({ label, dest }: { label: string; dest: string }) {
  return (
    <div className="wf-kpromo-row">
      <span className="wf-kpromo-row-label">{label}</span>
      <span className="wf-kpromo-row-dest">{dest}</span>
    </div>
  );
}
