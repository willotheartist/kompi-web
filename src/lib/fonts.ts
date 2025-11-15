import { Inter_Tight, Instrument_Serif, Onest } from "next/font/google";

export const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-primary",
  display: "swap",
});

export const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["italic"],
  variable: "--font-accent",
  display: "swap",
});

export const onest = Onest({
  subsets: ["latin"],
  weight: ["500", "600"],
  display: "swap",
});
