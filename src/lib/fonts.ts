import { Instrument_Serif } from "next/font/google";
import { Onest } from "next/font/google";


export const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

export const onest = Onest({
  subsets: ["latin"],
  weight: ["500", "600"], // Medium + a touch heavier if needed
  display: "swap",
});