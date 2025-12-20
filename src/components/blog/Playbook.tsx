import React from "react";
import "./playbook.css";

export type PlaybookWeek = {
  title: string;
  summary?: string;
  bullets: string[];

  // NEW: small "signal row" (keeps it premium + scannable)
  outcome?: string;     // e.g. "3 placements live"
  time?: string;        // e.g. "~45 min"
  effort?: string;      // e.g. "Low lift"
  note?: string;        // one-line editorial note
};

function slugifyId(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 64);
}

export function Playbook({
  title = "A simple 3-week playbook",
  kicker = "Playbook",
  lede = "A structured rollout you can follow without overthinking. Ship, measure, then scale.",
  weeks,
}: {
  title?: string;
  kicker?: string;
  lede?: string;
  weeks: PlaybookWeek[];
}) {
  const items = weeks.map((w, idx) => {
    const id = `pb-${idx + 1}-${slugifyId(w.title)}`;
    return { ...w, id, n: idx + 1 };
  });

  return (
    <section className="k-playbook" aria-label={kicker}>
      <header className="k-playbook__header">
        <div className="k-playbook__kicker">{kicker}</div>
        <h2 className="k-playbook__title">{title}</h2>
        <p className="k-playbook__lede">{lede}</p>
      </header>

      {/* Sticky mini navigator (desktop) */}
      <div className="k-playbook__layout">
        <aside className="k-playbook__aside" aria-label="Playbook navigation">
          <div className="k-playbook__asideCard">
            <div className="k-playbook__asideTitle">On this playbook</div>
            <nav className="k-playbook__nav">
              {items.map((w) => (
                <a key={w.id} className="k-playbook__navItem" href={`#${w.id}`}>
                  <span className="k-playbook__navDot" aria-hidden="true" />
                  <span className="k-playbook__navText">
                    <span className="k-playbook__navWeek">Week {w.n}</span>
                    <span className="k-playbook__navLabel">{w.title}</span>
                  </span>
                </a>
              ))}
            </nav>

            <div className="k-playbook__asideHint">
              Tip: click a week to jump. Readers love “scannable” structure.
            </div>
          </div>
        </aside>

        <ol className="k-playbook__weeks">
          {items.map((w) => (
            <li key={w.id} className="k-playbook__week" id={w.id}>
              <div className="k-playbook__rail" aria-hidden="true">
                <div className="k-playbook__dot">
                  <span className="k-playbook__dotNum">{w.n}</span>
                </div>
                <div className="k-playbook__line" />
              </div>

              <article className="k-playbook__card">
                <div className="k-playbook__cardTop">
                  <div className="k-playbook__weekLabel">Week {w.n}</div>
                  <h3 className="k-playbook__weekTitle">{w.title}</h3>
                  {w.summary ? <p className="k-playbook__summary">{w.summary}</p> : null}
                </div>

                {/* NEW: signal row (like your examples, but editorial) */}
                {(w.outcome || w.time || w.effort) && (
                  <div className="k-playbook__signals" role="group" aria-label="Week signals">
                    {w.outcome && (
                      <div className="k-playbook__signal">
                        <div className="k-playbook__signalLabel">Outcome</div>
                        <div className="k-playbook__signalValue">{w.outcome}</div>
                      </div>
                    )}
                    {w.time && (
                      <div className="k-playbook__signal">
                        <div className="k-playbook__signalLabel">Time</div>
                        <div className="k-playbook__signalValue">{w.time}</div>
                      </div>
                    )}
                    {w.effort && (
                      <div className="k-playbook__signal">
                        <div className="k-playbook__signalLabel">Effort</div>
                        <div className="k-playbook__signalValue">{w.effort}</div>
                      </div>
                    )}
                  </div>
                )}

                <ul className="k-playbook__bullets">
                  {w.bullets.map((b, bi) => (
                    <li key={`${w.id}-${bi}`} className="k-playbook__bullet">
                      <span className="k-playbook__check" aria-hidden="true">✓</span>
                      <span className="k-playbook__bulletText">{b}</span>
                    </li>
                  ))}
                </ul>

                {w.note ? <p className="k-playbook__note">{w.note}</p> : null}
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
