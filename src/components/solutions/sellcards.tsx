// src/components/solutions/sellcards.tsx

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { instrumentSerif } from "@/lib/fonts"; // 👈 use Instrument Serif

export default function SellCards() {
  return (
    <section
      className="w-full min-h-screen"
      style={{ backgroundColor: "#E6FF57" }} // lime background like your design
    >
      <div className="mx-auto flex h-full max-w-6xl flex-col items-center justify-center gap-16 px-4 py-16 md:px-6 lg:px-8">
        {/* Heading */}
        <header className="max-w-3xl text-center leading-tight">
          <p className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl lg:text-[2.8rem]">
            Designed to help your{" "}
            <span
              className={`align-baseline italic text-[#B38BFF] ${instrumentSerif.className}`}
            >
              audience
            </span>{" "}
            get where they need to go.
          </p>
        </header>

        {/* Cards */}
        <div className="grid w-full gap-8 md:grid-cols-3">
          {/* Card 1 */}
          <article
            className="flex flex-col justify-between rounded-[32px] p-8 shadow-[0_24px_60px_rgba(0,0,0,0.08)]"
            style={{ backgroundColor: "#AFA8FF" }} // lilac / purple-ish
          >
            <div>
              <div className="mb-6 rounded-[28px] bg-[#D9FF57] px-6 pt-6 pb-4">
                <Image
                  src="/cards48.png"
                  alt="Kompi links and K-Card preview"
                  width={520}
                  height={260}
                  className="h-auto w-full rounded-[24px]"
                />
              </div>

              <h2 className="text-xl font-semibold leading-tight text-slate-900 md:text-[1.4rem]">
                Run your business
                <br />
                <span className="font-normal italic">from Kompi.</span>
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-800/80">
                Kompi brings your links, pages and customer touchpoints into
                one workspace. Track performance, update journeys in seconds
                and keep every handle on brand.
              </p>
            </div>

            <div className="mt-6">
              <Button
                className="w-full rounded-full bg-[#D9FF57] px-6 py-5 text-sm font-semibold text-slate-900 hover:bg-[#d2f152]"
                size="lg"
              >
                Claim Your Handle
              </Button>
            </div>
          </article>

          {/* Card 2 */}
          <article
            className="flex flex-col justify-between rounded-[32px] p-8 shadow-[0_24px_60px_rgba(0,0,0,0.08)]"
            style={{ backgroundColor: "#195A20" }} // deep green
          >
            <div>
              <div className="mb-6 rounded-[28px] bg-white px-6 pt-6 pb-4">
                <Image
                  src="/cards49.png"
                  alt="Kompi QR code and profile preview"
                  width={520}
                  height={260}
                  className="h-auto w-full rounded-[24px]"
                />
              </div>

              <h2 className="text-xl font-semibold leading-tight text-[#E6FF57] md:text-[1.4rem]">
                Run your business
                <br />
                <span className="font-normal italic text-white">
                  from Kompi.
                </span>
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[#F5FFE4]">
                Turn every table, flyer and poster into a trackable QR touchpoint.
                Update destinations instantly and see which locations, offers and
                teams drive the most scans.
              </p>
            </div>

            <div className="mt-6">
              <Button
                className="w-full rounded-full bg-[#D9FF57] px-6 py-5 text-sm font-semibold text-slate-900 hover:bg-[#d2f152]"
                size="lg"
              >
                Claim Your Handle
              </Button>
            </div>
          </article>

          {/* Card 3 */}
          <article
            className="flex flex-col justify-between rounded-[32px] p-8 shadow-[0_24px_60px_rgba(0,0,0,0.08)]"
            style={{ backgroundColor: "#FF9EC3" }} // pink
          >
            <div>
              <div className="mb-6 rounded-[28px] bg-white px-6 pt-6 pb-4">
                <Image
                  src="/cards50.png"
                  alt="Kompi handles and link stack preview"
                  width={520}
                  height={260}
                  className="h-auto w-full rounded-[24px]"
                />
              </div>

              <h2 className="text-xl font-semibold leading-tight text-[#FF3B5C] md:text-[1.4rem]">
                Run your business
                <br />
                <span className="font-normal italic text-slate-900">
                  from Kompi.
                </span>
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-900/85">
                Give every product, profile and campaign its own memorable Kompi
                handle. Share once, update forever, and keep every route to your
                audience under control.
              </p>
            </div>

            <div className="mt-6">
              <Button
                className="w-full rounded-full bg-[#FF3B5C] px-6 py-5 text-sm font-semibold text-white hover:bg-[#f73758]"
                size="lg"
              >
                Claim Your Handle
              </Button>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
