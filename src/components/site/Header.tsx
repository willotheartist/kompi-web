"use client";
export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <div className="mt-4 flex h-12 items-center justify-between rounded-full border border-white/20 bg-black/30 px-4 text-white backdrop-blur">
          <div className="font-semibold">Kompi</div>
          <nav className="hidden gap-4 sm:flex">
            <a href="#product" className="opacity-90 hover:opacity-100">
              Product
            </a>
            <a href="#pricing" className="opacity-90 hover:opacity-100">
              Pricing
            </a>
            <a
              href="#waitlist"
              className="rounded-full bg-white px-3 py-1 text-black hover:opacity-90"
            >
              Join
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
