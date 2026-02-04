// src/app/(dashboard)/builder/new/BriefCaptureClient.tsx
"use client";

import { useMemo, useState } from "react";

type StartupStage = "idea" | "waitlist" | "live";
type PrimaryGoal = "collect_emails" | "book_demos" | "explain_product";
type StyleChoice = "1" | "2" | "3" | "4" | "5";

type ActionResult = { ok: true } | { ok: false; error: string };

export default function BriefCaptureClient({
  createSiteAction,
}: {
  createSiteAction: (formData: FormData) => Promise<ActionResult | void>;
}) {
  const [step, setStep] = useState<1 | 2 | 3>(1);

  const [startupName, setStartupName] = useState("");
  const [oneLiner, setOneLiner] = useState("");
  const [targetAudience, setTargetAudience] = useState("");

  const [startupStage, setStartupStage] = useState<StartupStage>("idea");
  const [primaryGoal, setPrimaryGoal] = useState<PrimaryGoal>("explain_product");

  const [styleChoice, setStyleChoice] = useState<StyleChoice>("1");

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canNextStep1 = useMemo(() => {
    return startupName.trim().length > 1 && oneLiner.trim().length > 3;
  }, [startupName, oneLiner]);

  const canNextStep2 = useMemo(() => {
    return targetAudience.trim().length > 1;
  }, [targetAudience]);

  const shellStyle: React.CSSProperties = {
    minHeight: "100vh",
    padding: 24,
    background: "rgba(0,0,0,0.02)",
  };

  const cardStyle: React.CSSProperties = {
    maxWidth: 720,
    margin: "0 auto",
    background: "white",
    border: "1px solid rgba(0,0,0,0.10)",
    borderRadius: 16,
    padding: 18,
  };

  const h1Style: React.CSSProperties = { fontSize: 26, fontWeight: 950, letterSpacing: -0.2 };
  const subStyle: React.CSSProperties = { marginTop: 8, opacity: 0.75, lineHeight: 1.45 };

  const labelStyle: React.CSSProperties = { fontSize: 12, fontWeight: 900, opacity: 0.8, marginTop: 14 };
  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px 12px",
    borderRadius: 12,
    border: "1px solid rgba(0,0,0,0.12)",
    outline: "none",
    fontSize: 14,
  };
  const textareaStyle: React.CSSProperties = {
    ...inputStyle,
    minHeight: 96,
    resize: "vertical",
  };

  const btnPrimary: React.CSSProperties = {
    padding: "12px 14px",
    borderRadius: 12,
    border: "1px solid rgba(0,0,0,0.12)",
    background: "rgba(0,0,0,0.04)",
    cursor: "pointer",
    fontWeight: 950,
  };

  const btnGhost: React.CSSProperties = {
    padding: "12px 14px",
    borderRadius: 12,
    border: "1px solid rgba(0,0,0,0.12)",
    background: "white",
    cursor: "pointer",
    fontWeight: 900,
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;

    setSubmitting(true);
    setError(null);

    try {
      const fd = new FormData();
      fd.set("startupName", startupName);
      fd.set("oneLiner", oneLiner);
      fd.set("targetAudience", targetAudience);
      fd.set("startupStage", startupStage);
      fd.set("primaryGoal", primaryGoal);
      fd.set("styleChoice", styleChoice);

      const res = await createSiteAction(fd);
      if (res && (res as any).ok === false) {
        setError((res as any).error ?? "Something went wrong.");
        setSubmitting(false);
      }
      // If successful, server action will redirect; no client work needed.
    } catch (err: any) {
      setError(err?.message ?? "Something went wrong.");
      setSubmitting(false);
    }
  }

  return (
    <div style={shellStyle}>
      <div style={cardStyle}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "flex-start" }}>
          <div>
            <div style={h1Style}>Create your site</div>
            <div style={subStyle}>
              Answer 6 quick questions. We’ll generate a real site you can publish in under 10 minutes.
            </div>
          </div>
          <div style={{ fontSize: 12, opacity: 0.75, fontWeight: 800 }}>
            Step {step} of 3
          </div>
        </div>

        <div style={{ marginTop: 14, display: "flex", gap: 8 }}>
          <div
            style={{
              flex: 1,
              height: 8,
              borderRadius: 999,
              background: step >= 1 ? "rgba(0,0,0,0.18)" : "rgba(0,0,0,0.06)",
            }}
          />
          <div
            style={{
              flex: 1,
              height: 8,
              borderRadius: 999,
              background: step >= 2 ? "rgba(0,0,0,0.18)" : "rgba(0,0,0,0.06)",
            }}
          />
          <div
            style={{
              flex: 1,
              height: 8,
              borderRadius: 999,
              background: step >= 3 ? "rgba(0,0,0,0.18)" : "rgba(0,0,0,0.06)",
            }}
          />
        </div>

        {error ? (
          <div
            style={{
              marginTop: 14,
              padding: 12,
              borderRadius: 12,
              border: "1px solid rgba(220, 38, 38, 0.35)",
              background: "rgba(220, 38, 38, 0.06)",
              color: "rgba(153, 27, 27, 0.95)",
              fontWeight: 800,
              fontSize: 13,
            }}
          >
            {error}
          </div>
        ) : null}

        <form onSubmit={handleSubmit}>
          {/* STEP 1 */}
          {step === 1 ? (
            <div style={{ marginTop: 16 }}>
              <div style={{ fontWeight: 950, fontSize: 14 }}>Basics</div>

              <div style={labelStyle}>Startup name</div>
              <input
                value={startupName}
                onChange={(e) => setStartupName(e.target.value)}
                placeholder="e.g. Orbit Labs"
                style={inputStyle}
                autoFocus
              />

              <div style={labelStyle}>One-sentence description</div>
              <textarea
                value={oneLiner}
                onChange={(e) => setOneLiner(e.target.value)}
                placeholder="What do you do? (One clear sentence.)"
                style={textareaStyle}
              />

              <div style={{ marginTop: 16, display: "flex", gap: 10 }}>
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  disabled={!canNextStep1}
                  style={{
                    ...btnPrimary,
                    opacity: canNextStep1 ? 1 : 0.5,
                    cursor: canNextStep1 ? "pointer" : "not-allowed",
                    flex: 1,
                  }}
                >
                  Continue
                </button>
              </div>
            </div>
          ) : null}

          {/* STEP 2 */}
          {step === 2 ? (
            <div style={{ marginTop: 16 }}>
              <div style={{ fontWeight: 950, fontSize: 14 }}>Audience & intent</div>

              <div style={labelStyle}>Target audience</div>
              <input
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                placeholder="e.g. solo founders, indie makers, early-stage teams"
                style={inputStyle}
                autoFocus
              />

              <div style={labelStyle}>Startup stage</div>
              <select value={startupStage} onChange={(e) => setStartupStage(e.target.value as StartupStage)} style={inputStyle}>
                <option value="idea">Idea</option>
                <option value="waitlist">Waitlist</option>
                <option value="live">Live</option>
              </select>

              <div style={labelStyle}>Primary site goal</div>
              <select value={primaryGoal} onChange={(e) => setPrimaryGoal(e.target.value as PrimaryGoal)} style={inputStyle}>
                <option value="collect_emails">Collect emails</option>
                <option value="book_demos">Book demos</option>
                <option value="explain_product">Explain product</option>
              </select>

              <div style={{ marginTop: 16, display: "flex", gap: 10 }}>
                <button type="button" onClick={() => setStep(1)} style={{ ...btnGhost, width: 140 }}>
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  disabled={!canNextStep2}
                  style={{
                    ...btnPrimary,
                    opacity: canNextStep2 ? 1 : 0.5,
                    cursor: canNextStep2 ? "pointer" : "not-allowed",
                    flex: 1,
                  }}
                >
                  Continue
                </button>
              </div>
            </div>
          ) : null}

          {/* STEP 3 */}
          {step === 3 ? (
            <div style={{ marginTop: 16 }}>
              <div style={{ fontWeight: 950, fontSize: 14 }}>Style</div>

              <div style={{ marginTop: 10, fontSize: 13, opacity: 0.75, lineHeight: 1.4 }}>
                Choose one of five curated presentation variants. (For now, we record your selection as “Variant 1–5”.)
              </div>

              <div style={labelStyle}>Style variant</div>
              <select value={styleChoice} onChange={(e) => setStyleChoice(e.target.value as StyleChoice)} style={inputStyle}>
                <option value="1">Variant 1</option>
                <option value="2">Variant 2</option>
                <option value="3">Variant 3</option>
                <option value="4">Variant 4</option>
                <option value="5">Variant 5</option>
              </select>

              <div style={{ marginTop: 16, display: "flex", gap: 10 }}>
                <button type="button" onClick={() => setStep(2)} disabled={submitting} style={{ ...btnGhost, width: 140 }}>
                  Back
                </button>

                <button
                  type="submit"
                  disabled={submitting || startupName.trim().length < 2 || oneLiner.trim().length < 4 || targetAudience.trim().length < 2}
                  style={{
                    ...btnPrimary,
                    flex: 1,
                    opacity:
                      submitting || startupName.trim().length < 2 || oneLiner.trim().length < 4 || targetAudience.trim().length < 2 ? 0.6 : 1,
                    cursor:
                      submitting || startupName.trim().length < 2 || oneLiner.trim().length < 4 || targetAudience.trim().length < 2
                        ? "not-allowed"
                        : "pointer",
                  }}
                >
                  {submitting ? "Creating..." : "Create site"}
                </button>
              </div>

              <div style={{ marginTop: 12, fontSize: 12, opacity: 0.7, lineHeight: 1.45 }}>
                We’ll generate your site with the standard page set (Home, Product, About, Contact) and either Pricing or Waitlist depending on your goal/stage.
              </div>
            </div>
          ) : null}
        </form>
      </div>
    </div>
  );
}
