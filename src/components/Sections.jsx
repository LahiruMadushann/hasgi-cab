import { ArrowUpRight, Check, Users, Briefcase, MapPinned, Send, CarFront } from "lucide-react";
import SectionHead from "./SectionHead";
import { VEHICLES, DESTINATIONS, findLocation, toDMS } from "../data/travel";
import { whatsappLink } from "../data/site";

const TICKER = ["Airport transfers", "Sigiriya", "Kandy", "Ella", "Yala safari", "Galle Fort", "Mirissa", "Arugam Bay", "Nuwara Eliya", "Trincomalee", "Day tours", "Rent a car"];

export function Ticker() {
  const row = [...TICKER, ...TICKER];
  return (
    <div className="relative -rotate-1 border-y border-neon/30 bg-neon py-4 text-white">
      <div className="flex w-max animate-marquee gap-10 whitespace-nowrap">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-10 text-2xl font-semibold tracking-tight">
            {i % 3 === 1 ? <em className="font-serif font-normal">{t}</em> : t}
            <span className="text-white/60">✳</span>
          </span>
        ))}
      </div>
    </div>
  );
}

const STEPS = [
  { icon: MapPinned, title: "Draw your route", text: "Pick stops on the map or start from a ready-made tour. See distance and fare instantly." },
  { icon: Send, title: "Send it on WhatsApp", text: "One tap sends your full trip to us — route, time, vehicle and price — no forms lost in email." },
  { icon: CarFront, title: "Meet your driver", text: "We confirm your driver and vehicle. They meet you at pick-up, on time, ready to roll." },
];

export function HowItWorks() {
  return (
    <section id="how" className="relative py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHead index="02" kicker="Easy as 1, 2, 3" title={<>Three taps from <em className="font-serif font-normal text-neon">kerb</em> to coast.</>} />
        <div className="relative grid gap-4 md:grid-cols-3">
          {STEPS.map((step, i) => (
            <div key={step.title} className="reveal group relative rounded-[1.75rem] border border-line bg-asphalt p-7 transition hover:border-neon/40" style={{ transitionDelay: `${i * 90}ms` }}>
              <div className="flex items-start justify-between">
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-neon/10 text-neon transition group-hover:bg-neon group-hover:text-white">
                  <step.icon size={24} />
                </span>
                <span className="font-serif text-7xl leading-none text-white/[0.07] italic">0{i + 1}</span>
              </div>
              <h3 className="mt-10 text-2xl font-semibold tracking-tight">{step.title}</h3>
              <p className="mt-3 text-chalk/60">{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CarSilhouette({ kind }) {
  // Minimal line-art side profiles, echoing the logo's outline style
  const bodies = {
    sedan: "M20 62 L34 46 Q44 36 62 34 L120 32 Q140 32 154 44 L170 54 Q196 56 204 64 L204 74 L20 74 Z",
    luxury: "M16 62 L36 44 Q48 34 70 32 L126 31 Q146 32 160 44 L176 54 Q202 56 208 64 L208 74 L16 74 Z",
    suv: "M18 60 L28 36 Q32 28 48 28 L140 28 Q156 28 166 40 L176 52 Q200 54 204 62 L204 76 L18 76 Z",
    van: "M18 72 L18 34 Q18 22 32 22 L150 22 Q166 22 176 36 L196 56 Q204 60 204 66 L204 76 L18 76 Z",
  };
  return (
    <svg viewBox="0 0 224 96" className="h-24 w-full" aria-hidden="true">
      <path d={bodies[kind]} fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <circle cx="58" cy="76" r="11" fill="#08080a" stroke="#ff2e4d" strokeWidth="2.5" />
      <circle cx="168" cy="76" r="11" fill="#08080a" stroke="#ff2e4d" strokeWidth="2.5" />
      <path d="M2 88 H222" stroke="rgba(255,255,255,.15)" strokeDasharray="10 8" />
    </svg>
  );
}

export function Fleet() {
  return (
    <section id="fleet" className="relative py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHead index="03" kicker="Cars, SUVs & vans with driver" title={<>Room for every <em className="font-serif font-normal text-neon">kind</em> of adventure.</>} />
          <p className="reveal mb-12 max-w-xs font-mono text-xs leading-relaxed text-mute">
            FAIR, TRANSPARENT PER-KM RATES. NO HIDDEN COSTS — YOUR FULL FARE IS SHOWN BEFORE YOU BOOK.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {VEHICLES.map((v, i) => (
            <article key={v.id} className="reveal group relative flex flex-col overflow-hidden rounded-[1.75rem] border border-line bg-asphalt p-6 transition hover:-translate-y-1 hover:border-neon/40" style={{ transitionDelay: `${i * 80}ms` }}>
              <div className="flex items-center justify-between">
                <span className="rounded-full border border-line px-3 py-1 font-mono text-[10px] tracking-widest text-mute uppercase">{v.tag}</span>
                <span className="font-mono text-xs text-mute">0{i + 1}</span>
              </div>
              <div className="my-6 text-chalk/80 transition group-hover:text-chalk">
                <CarSilhouette kind={v.id} />
              </div>
              <h3 className="text-2xl font-semibold tracking-tight">{v.name}</h3>
              <p className="mt-2 flex-1 text-sm text-chalk/55">{v.note}</p>
              <div className="mt-5 flex gap-4 font-mono text-xs text-chalk/70">
                <span className="flex items-center gap-1.5"><Users size={13} className="text-neon" />{v.seats}</span>
                <span className="flex items-center gap-1.5"><Briefcase size={13} className="text-neon" />{v.bags} bags</span>
                              </div>
              <div className="mt-6 flex items-end justify-between border-t border-line pt-5">
                <div>
                  <span className="text-4xl font-bold tracking-tight">${v.pricePerKm}</span>
                  <span className="ml-1 font-mono text-xs text-mute">/ km</span>
                </div>
                <a href="#booking" aria-label={`Book a ${v.name}`} className="grid h-11 w-11 place-items-center rounded-full bg-white/5 transition group-hover:bg-neon">
                  <ArrowUpRight size={18} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Destinations() {
  return (
    <section id="destinations" className="relative py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHead index="04" kicker="A little island, a lot to see" title={<>Sri Lanka, <em className="font-serif font-normal text-neon">beautifully.</em></>}>
          Rock fortresses before breakfast, tea hills by lunch, a beach for sunset. Here's where our drivers take people most.
        </SectionHead>

        <div className="grid auto-rows-[220px] gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {DESTINATIONS.map((d, i) => {
            const loc = findLocation(d.name);
            const big = i === 0 || i === 3;
            return (
              <article
                key={d.name}
                className={`reveal group relative overflow-hidden rounded-[1.75rem] border border-line bg-tarmac ${big ? "lg:col-span-2 lg:row-span-2" : ""}`}
              >
                <img
                  src={d.img}
                  alt={`${d.name}, Sri Lanka`}
                  loading="lazy"
                  decoding="async"
                  style={{ objectPosition: d.focus || "center" }}
                  className="absolute inset-0 h-full w-full object-cover transition duration-[1.2s] ease-out group-hover:scale-105"
                />
                {/* Shade for legible text */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/45" />
                <div className="absolute inset-0 bg-neon/0 mix-blend-multiply transition duration-500 group-hover:bg-neon/25" />

                {/* Whole card opens WhatsApp */}
                <a
                  href={whatsappLink(`Hi Hashi Cab, I'd like a ride to ${d.name}.`)}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Book a ride to ${d.name}`}
                  className="absolute inset-0 z-10"
                />

                <div className="pointer-events-none relative flex h-full flex-col justify-between p-6">
                  <div className="flex items-center justify-between font-mono text-[11px] tracking-widest text-white/80">
                    <span>{toDMS(loc.lat, "N", "S")} · {toDMS(loc.lng, "E", "W")}</span>
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-neon text-white opacity-0 transition group-hover:opacity-100">
                      <ArrowUpRight size={16} />
                    </span>
                  </div>
                  <div>
                    <h3 className={`font-semibold tracking-tight text-white ${big ? "text-5xl" : "text-3xl"}`}>{d.name}</h3>
                    <p className="mt-2 max-w-xs text-white/80">{d.line}</p>
                  </div>
                </div>

                <a
                  href={d.credit.url}
                  target="_blank"
                  rel="noreferrer"
                  className="absolute right-3 bottom-2 z-20 font-mono text-[9px] text-white/45 hover:text-white"
                >
                  Photo: {d.credit.by} · {d.credit.license}
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function About() {
  const points = [
    "Transparent per-km fares shown upfront — no hidden costs",
    "Professional local drivers who know Sri Lanka inside out",
    "Fully insured vehicles and quick booking on WhatsApp",
  ];
  return (
    <section id="about" className="relative py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2">
        <div>
          <SectionHead index="07" kicker="A local way to go" title={<>It's not just getting there. It's the <em className="font-serif font-normal text-neon">drive.</em></>}>
            With 5+ years on Sri Lankan roads, Hashi Cab is about a simple promise: honest prices and drivers you'd trust with your family —
            whether you're visiting ancient temples, pristine beaches or the misty hill country.
          </SectionHead>
          <ul className="reveal space-y-3">
            {points.map((p) => (
              <li key={p} className="flex items-start gap-3 text-chalk/80">
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-neon/15 text-neon"><Check size={14} /></span>
                {p}
              </li>
            ))}
          </ul>
          <a href="#booking" className="reveal mt-9 inline-flex items-center gap-2 font-semibold text-neon hover:underline">
            Let's plan your trip <ArrowUpRight size={18} />
          </a>
        </div>

        <div className="reveal grid grid-cols-2 gap-4">
          {[["5+", "Years on the road"], ["40+", "Places we drive"], ["4", "Vehicle classes"], ["$0", "Booking fee"]].map(([n, l], i) => (
            <div key={l} className={`rounded-[1.75rem] border border-line p-7 ${i === 1 ? "bg-neon text-white" : "bg-asphalt"}`}>
              <div className="text-5xl font-bold tracking-tight sm:text-6xl">{n}</div>
              <div className={`mt-3 font-mono text-xs tracking-widest uppercase ${i === 1 ? "text-white/80" : "text-mute"}`}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FinalCTA() {
  return (
    <section className="px-4 py-16 sm:px-6">
      <div className="reveal relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-neon/30 bg-gradient-to-br from-neon-deep via-neon to-[#ff6a3d] px-6 py-20 text-center sm:px-12">
        <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent_0_46%,rgba(255,255,255,0.18)_46%_54%,transparent_54%_100%)] bg-[size:120px_6px] bg-center bg-no-repeat opacity-60 [background-position-y:50%]" />
        <p className="relative font-mono text-xs tracking-[0.3em] text-white/80 uppercase">Ready when you are</p>
        <h2 className="relative mx-auto mt-5 max-w-3xl text-5xl leading-[0.95] font-bold tracking-[-0.04em] sm:text-7xl">
          Your island story starts <em className="font-serif font-normal">on the road.</em>
        </h2>
        <div className="relative mt-10 flex flex-wrap justify-center gap-3">
          <a href="#booking" className="inline-flex items-center gap-2 rounded-full bg-ink px-7 py-4 font-semibold text-white transition hover:bg-black">
            Plan your journey <ArrowUpRight size={18} />
          </a>
          <a href={whatsappLink()} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/50 px-7 py-4 font-semibold text-white transition hover:bg-white/10">
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
