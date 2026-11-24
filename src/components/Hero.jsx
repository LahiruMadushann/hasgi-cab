import { ArrowUpRight, ArrowDown, Star } from "lucide-react";
import IslandMap from "./IslandMap";
import { findLocation, LOCATIONS, roadDistance } from "../data/travel";
import { GOOGLE } from "../data/site";

const DEMO_ROUTE = ["Katunayake Airport", "Sigiriya", "Kandy", "Ella", "Mirissa"].map(findLocation);
const DEMO_KM = DEMO_ROUTE.slice(1).reduce((km, s, i) => km + roadDistance(DEMO_ROUTE[i], s), 0);
const GHOSTS =LOCATIONS.filter((l) => ["Jaffna", "Trincomalee", "Arugam Bay", "Yala", "Galle", "Anuradhapura", "Nuwara Eliya", "Batticaloa"].includes(l.name));

export default function Hero({ rating }) {
  return (
    <section id="top" className="relative overflow-hidden pt-28 pb-10 sm:pt-32">
      {/* Headlight beams */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[700px] w-[1100px] -translate-x-1/2 bg-[radial-gradient(closest-side,rgba(255,46,77,0.16),transparent)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[1.25fr_1fr]">
        <div>
          <div className="reveal mb-7 inline-flex items-center gap-3 rounded-full border border-line bg-white/[0.03] py-1.5 pr-4 pl-1.5 text-xs">
            <span className="rounded-full bg-neon px-2.5 py-1 font-mono font-semibold tracking-wider text-white">LK</span>
            <span className="text-chalk/70">Private drivers · Airport transfers · Island tours</span>
          </div>

          <h1 className="reveal">
            <span className="mb-5 block font-mono text-xs font-normal tracking-[0.2em] text-chalk/60 uppercase">
              Sri Lanka taxi & cab service · Airport transfers · Private driver tours
            </span>
            <span className="block text-[13vw] leading-[0.88] font-bold tracking-[-0.045em] sm:text-7xl lg:text-[6.6rem]">
            Sri Lanka,
            <br />
            <span className="font-serif font-normal tracking-[-0.02em] text-neon italic">after dark</span>
            <br />
            &amp; after dawn.
            </span>
          </h1>

          <p className="reveal mt-7 max-w-xl text-lg leading-relaxed text-chalk/65">
            Build your own route across the island, see the fare before you go, and send it to a
            local driver on WhatsApp in one tap. From <span className="font-mono text-chalk">$0.29/km</span>, no hidden extras.
          </p>

          <div className="reveal mt-9 flex flex-wrap items-center gap-3">
            <a href="#booking" className="group inline-flex items-center gap-2 rounded-full bg-neon px-7 py-4 font-semibold text-white shadow-[0_0_40px_-8px_#ff2e4d] transition hover:bg-neon-deep">
              Plan your journey
              <ArrowUpRight size={18} className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a href="#destinations" className="inline-flex items-center gap-2 rounded-full border border-line px-7 py-4 font-semibold transition hover:border-chalk/40">
              Explore the island
            </a>
          </div>

          <a href={GOOGLE.reviewsUrl} target="_blank" rel="noreferrer" className="reveal mt-10 inline-flex items-center gap-4 text-sm text-chalk/60 hover:text-chalk">
            <GoogleG className="h-8 w-8 rounded-full bg-white p-1.5" />
            <span>
              {rating ? (
                <span className="flex items-center gap-1 text-chalk">
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} className={i < Math.round(rating) ? "fill-[#fbbc04] text-[#fbbc04]" : "text-white/20"} />)}
                  <span className="ml-1.5 font-semibold">{rating.toFixed(1)}</span>
                </span>
              ) : (
                <span className="block font-semibold text-chalk">Reviewed on Google</span>
              )}
              Read what riders say on Google →
            </span>
          </a>
        </div>

        {/* Map card */}
        <div className="reveal relative mx-auto w-full max-w-md">
          <div className="absolute -inset-px rounded-[2rem] bg-gradient-to-b from-neon/40 via-line to-transparent" />
          <div className="relative rounded-[2rem] bg-asphalt p-5">
            <div className="flex items-center justify-between font-mono text-[11px] tracking-widest text-mute uppercase">
              <span>Live route · demo</span>
              <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-neon" />On air</span>
            </div>
            <IslandMap stops={DEMO_ROUTE} ghost={GHOSTS} className="mx-auto mt-2 h-[380px] w-full sm:h-[440px]" />
            <div className="grid grid-cols-3 divide-x divide-line rounded-2xl border border-line text-center">
              {[[DEMO_ROUTE.length, "stops"], [`~${DEMO_KM}`, "km"], [`$${(DEMO_KM * 0.29).toFixed(0)}`, "by sedan"]].map(([v, l]) => (
                <div key={l} className="py-3">
                  <div className="text-xl font-bold">{v}</div>
                  <div className="font-mono text-[10px] tracking-widest text-mute uppercase">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="relative mx-auto mt-14 flex max-w-7xl items-center justify-between px-4 font-mono text-[11px] tracking-[0.2em] text-mute uppercase sm:px-6">
        <span>06°55′ N — 79°51′ E</span>
        <a href="#booking" className="flex items-center gap-2 hover:text-chalk">
          Scroll to drive <ArrowDown size={14} className="animate-bounce" />
        </a>
        <span className="hidden sm:inline">ආයුබෝවන් · Welcome</span>
      </div>
    </section>
  );
}

export function GoogleG({ className = "" }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z" />
    </svg>
  );
}
