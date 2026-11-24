import { useState } from "react";
import { ArrowUpRight, Plus, Minus, Clock } from "lucide-react";
import SectionHead from "./SectionHead";
import { POPULAR_ROUTES, FAQS } from "../data/seo-content";
import { whatsappLink } from "../data/site";

const label = (n) => (n === "Katunayake Airport" ? "Colombo Airport (CMB)" : n);
const hrs = (h) => `${Math.floor(h)}h ${String(Math.round((h % 1) * 60)).padStart(2, "0")}m`;

export function PopularRoutes() {
  return (
    <section id="routes" className="relative py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHead
          index="05"
          kicker="Popular taxi routes & fares"
          title={<>Airport transfers & <em className="font-serif font-normal text-neon">island</em> rides.</>}
        >
          Estimated one-way taxi fares across Sri Lanka, calculated from our per-km rates. Tap any route to book it on WhatsApp.
        </SectionHead>

        <div className="reveal overflow-hidden rounded-[1.75rem] border border-line bg-asphalt">
          <div className="hidden grid-cols-[1.6fr_0.6fr_0.7fr_0.7fr_0.7fr_auto] gap-4 border-b border-line px-6 py-4 font-mono text-[11px] tracking-widest text-mute uppercase md:grid">
            <span>Route</span><span>Distance</span><span>Drive</span><span>Sedan</span><span>Van</span><span className="w-9" />
          </div>
          <ul>
            {POPULAR_ROUTES.map((r) => (
              <li key={r.from + r.to} className="border-b border-line last:border-0">
                <a
                  href={whatsappLink(`Hi Hashi Cab, I'd like a taxi from ${label(r.from)} to ${r.to}.`)}
                  target="_blank"
                  rel="noreferrer"
                  className="group grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-1 px-5 py-4 transition hover:bg-white/[0.03] md:grid-cols-[1.6fr_0.6fr_0.7fr_0.7fr_0.7fr_auto] md:px-6"
                >
                  <h3 className="font-semibold">
                    {label(r.from)} <span className="text-neon">→</span> {r.to} <span className="sr-only">taxi</span>
                  </h3>
                  <span className="font-mono text-sm text-chalk/70 max-md:hidden">~{r.km} km</span>
                  <span className="flex items-center gap-1.5 font-mono text-sm text-chalk/70 max-md:hidden"><Clock size={13} />{hrs(r.hours)}</span>
                  <span className="font-mono font-semibold md:text-base">
                    <span className="mr-1 text-xs font-normal text-mute md:hidden">from</span>${r.sedan}
                  </span>
                  <span className="font-mono text-sm text-chalk/70 max-md:hidden">${r.van}</span>
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-white/5 transition group-hover:bg-neon max-md:hidden">
                    <ArrowUpRight size={16} />
                  </span>
                  <span className="col-span-2 font-mono text-xs text-mute md:hidden">~{r.km} km · {hrs(r.hours)} · van ${r.van}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-4 font-mono text-xs text-mute">Prices in USD, estimated from straight-line distance × road factor. Final fare confirmed when you book.</p>
      </div>
    </section>
  );
}

export function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="relative py-24">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionHead index="08" kicker="Good to know" title={<>Questions, <em className="font-serif font-normal text-neon">answered.</em></>}>
          Everything travellers ask before booking a taxi or private driver in Sri Lanka.
        </SectionHead>
        <div className="reveal divide-y divide-line rounded-[1.75rem] border border-line bg-asphalt">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q}>
                <h3>
                  <button
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left text-lg font-semibold tracking-tight hover:text-neon"
                  >
                    {f.q}
                    <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full transition ${isOpen ? "bg-neon text-white" : "bg-white/5"}`}>
                      {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                    </span>
                  </button>
                </h3>
                {/* Kept in the HTML when closed so search engines can read every answer */}
                <div className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                  <p className="overflow-hidden px-6 text-chalk/65">
                    <span className="block pb-6">{f.a}</span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
