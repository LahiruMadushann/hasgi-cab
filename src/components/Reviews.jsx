import { useRef } from "react";
import { Star, ArrowLeft, ArrowRight, ArrowUpRight, PenLine, MapPin, Quote } from "lucide-react";
import SectionHead from "./SectionHead";
import { GoogleG } from "./Hero";
import { GOOGLE } from "../data/site";

function Stars({ value = 5, size = 16 }) {
  return (
    <span className="flex gap-0.5" aria-label={`${value} out of 5 stars`}>
      {[...Array(5)].map((_, i) => (
        <Star key={i} size={size} className={i < Math.round(value) ? "fill-[#fbbc04] text-[#fbbc04]" : "text-white/20"} />
      ))}
    </span>
  );
}

export default function Reviews({ data }) {
  const track = useRef(null);
  const { rating, total, reviews } = data;
  const scroll = (dir) => {
    const el = track.current;
    if (el) el.scrollBy({ left: dir * Math.min(el.clientWidth * 0.85, 420), behavior: "smooth" });
  };

  return (
    <section id="reviews" className="relative overflow-hidden py-24">
      <div className="pointer-events-none absolute top-1/3 -left-40 h-[500px] w-[500px] rounded-full bg-neon/10 blur-[120px]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHead index="05" kicker="What riders say" title={<>Rated by <em className="font-serif font-normal text-neon">real</em> passengers.</>} />

        <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
          {/* Google summary card */}
          <div className="reveal flex flex-col rounded-[1.75rem] border border-line bg-asphalt p-7">
            <div className="flex items-center gap-3">
              <GoogleG className="h-11 w-11 rounded-full bg-white p-2" />
              <div>
                <div className="font-semibold">Google Reviews</div>
                <div className="font-mono text-[11px] tracking-widest text-mute uppercase">Hashi Cab · Sri Lanka</div>
              </div>
            </div>

            {rating ? (
              <div className="mt-8 flex items-end gap-4">
                <span className="text-7xl leading-none font-bold tracking-tight">{rating.toFixed(1)}</span>
                <div className="pb-1.5">
                  <Stars value={rating} size={18} />
                  {total && <div className="mt-1.5 text-sm text-mute">Based on {total} reviews</div>}
                </div>
              </div>
            ) : (
              <p className="mt-8 text-2xl leading-snug font-semibold tracking-tight">
                Every review is from a real rider, <span className="text-mute">posted on Google.</span>
              </p>
            )}

            <div className="mt-auto space-y-2 pt-8">
              <a href={GOOGLE.reviewsUrl} target="_blank" rel="noreferrer" className="flex items-center justify-between rounded-2xl bg-chalk px-5 py-3.5 font-semibold text-ink transition hover:bg-white">
                See all reviews on Google <ArrowUpRight size={18} />
              </a>
              <a href={GOOGLE.writeReviewUrl} target="_blank" rel="noreferrer" className="flex items-center justify-between rounded-2xl border border-line px-5 py-3.5 font-semibold transition hover:border-neon">
                Write a review <PenLine size={17} className="text-neon" />
              </a>
              <a href={GOOGLE.mapsUrl} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 pt-2 text-sm text-mute hover:text-chalk">
                <MapPin size={14} /> Find us on Google Maps
              </a>
            </div>
          </div>

          {/* Review carousel */}
          <div className="reveal relative min-w-0">
            {reviews.length > 0 ? (
              <>
                <div ref={track} className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2">
                  {reviews.map((r, i) => (
                    <a
                      key={i}
                      href={r.url || GOOGLE.reviewsUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex w-[85%] shrink-0 snap-start flex-col rounded-[1.75rem] border border-line bg-asphalt p-7 transition hover:border-neon/40 sm:w-[380px]"
                    >
                      <div className="flex items-center justify-between">
                        <Stars value={r.rating} />
                        <GoogleG className="h-5 w-5 opacity-70" />
                      </div>
                      <p className="mt-5 line-clamp-[8] flex-1 text-[17px] leading-relaxed text-chalk/85">“{r.text}”</p>
                      <div className="mt-6 flex items-center gap-3 border-t border-line pt-5">
                        {r.photo ? (
                          <img src={r.photo} alt="" referrerPolicy="no-referrer" className="h-10 w-10 rounded-full object-cover" />
                        ) : (
                          <span className="grid h-10 w-10 place-items-center rounded-full bg-neon/15 font-semibold text-neon">{r.name?.[0] || "G"}</span>
                        )}
                        <div className="min-w-0">
                          <div className="truncate font-semibold">{r.name}</div>
                          {r.date && <div className="font-mono text-[11px] text-mute">{r.date}</div>}
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
                <div className="mt-5 flex items-center justify-between">
                  <span className="font-mono text-[11px] tracking-widest text-mute uppercase">
                    {data.source === "google" ? "Live from Google" : "From our Google profile"}
                  </span>
                  <div className="flex gap-2">
                    <button onClick={() => scroll(-1)} aria-label="Previous reviews" className="grid h-12 w-12 place-items-center rounded-full border border-line transition hover:border-neon hover:text-neon"><ArrowLeft size={18} /></button>
                    <button onClick={() => scroll(1)} aria-label="Next reviews" className="grid h-12 w-12 place-items-center rounded-full bg-neon text-white transition hover:bg-neon-deep"><ArrowRight size={18} /></button>
                  </div>
                </div>
              </>
            ) : (
              <a
                href={GOOGLE.reviewsUrl}
                target="_blank"
                rel="noreferrer"
                className="group relative flex h-full min-h-[340px] flex-col justify-between overflow-hidden rounded-[1.75rem] border border-line bg-gradient-to-br from-tarmac to-asphalt p-8 sm:p-10"
              >
                <Quote size={120} className="absolute -top-4 -right-4 rotate-180 text-white/[0.04]" />
                <div className="font-mono text-xs tracking-[0.25em] text-mute uppercase">Straight from Google</div>
                <p className="max-w-xl text-3xl leading-tight font-semibold tracking-tight sm:text-4xl">
                  Don't take our word for it — read honest reviews from travellers who've <em className="font-serif font-normal text-neon">ridden with us.</em>
                </p>
                <span className="inline-flex items-center gap-2 font-semibold text-neon">
                  Open Hashi Cab reviews <ArrowUpRight size={18} className="transition group-hover:translate-x-1 group-hover:-translate-y-1" />
                </span>
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
