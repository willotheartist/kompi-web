import { PSEOPageInput, PSEOSection } from "../types";

export function generateIntro(input: PSEOPageInput): PSEOSection {
  const kw = input.primaryKeyword.toLowerCase();
  const entity = input.entity.value;

  const lines: string[] = [];

  lines.push(
    `Businesses in ${entity} are increasingly using smarter tools to grow faster and track results more accurately.`
  );

  lines.push(
    `In this guide, we’ll break down practical, real-world ${kw}, explain what actually works, and show how to implement it with modern tools.`
  );

  lines.push(
    `What “good” looks like: a QR code or link that gives people a clear reason to act, at the exact moment they’re ready to decide.`
  );

  lines.push(
    `Quick wins you can apply today:`,
    `• Pick one primary action (menu, booking, review, signup, offer).`,
    `• Place it where people naturally pause (counter, table, entrance, packaging, receipt).`,
    `• Track performance per placement so you can improve what matters.`
  );

  lines.push(
    `If you do only one thing: make the destination match the context. A “Scan me” QR with no promise performs poorly. A QR that says “See today’s specials” performs far better.`
  );

  return {
    id: "intro",
    title: `What ${input.primaryKeyword} really means`,
    content: lines.join("\n\n"),
  };
}
