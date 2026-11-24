import { useMemo, useRef, useState } from "react";
import {
  Search, X, GripVertical, ChevronUp, ChevronDown, Plane, Route, ArrowRight, ArrowLeft,
  Users, Calendar, Clock, Mail, Phone, User, MessageCircle, Send, CheckCircle2, Briefcase,
} from "lucide-react";
import IslandMap from "./IslandMap";
import SectionHead from "./SectionHead";
import { LOCATIONS, VEHICLES, PACKAGES, findLocation, roadDistance } from "../data/travel";
import { SITE, whatsappLink } from "../data/site";

const QUICK = ["Colombo", "Katunayake Airport", "Kandy", "Sigiriya", "Ella", "Galle", "Mirissa", "Yala", "Arugam Bay", "Trincomalee"];
const GHOSTS = LOCATIONS.filter((l) => QUICK.includes(l.name) || ["Jaffna", "Nuwara Eliya", "Anuradhapura", "Batticaloa", "Bentota"].includes(l.name));

const field =
  "w-full rounded-xl border border-line bg-white/[0.03] px-4 py-3.5 text-chalk placeholder:text-mute/70 transition focus:border-neon focus:bg-white/[0.05] focus:outline-none";

export default function Booking() {
  const [step, setStep] = useState(1);
  const [stops, setStops] = useState([]);
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const [vehicleId, setVehicleId] = useState("sedan");
  const [dragIndex, setDragIndex] = useState(null);
  const [sent, setSent] = useState(null);
  const [form, setForm] = useState({ name: "", phone: "", email: "", passengers: "2", date: "", time: "", flight: "", notes: "" });
  const sectionRef = useRef(null);

  const vehicle = VEHICLES.find((v) => v.id === vehicleId);

  const legs = useMemo(
    () => stops.slice(1).map((s, i) => ({ from: stops[i].name, to: s.name, km: roadDistance(stops[i], s) })),
    [stops]
  );
  const km = legs.reduce((t, l) => t + l.km, 0);
  const total = km * vehicle.pricePerKm;
  const hours = km / 45;

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const pool = LOCATIONS.filter((l) => !stops.some((s) => s.name === l.name));
    if (!q) return pool.slice(0, 6);
    return pool
      .filter((l) => l.name.toLowerCase().includes(q) || l.description.toLowerCase().includes(q) || l.region.toLowerCase().includes(q))
      .slice(0, 8);
  }, [query, stops]);

  const addStop = (loc) => {
    if (!loc || stops.some((s) => s.name === loc.name)) return;
    setStops((s) => [...s, loc]);
    setQuery("");
  };
  const removeStop = (i) => setStops((s) => s.filter((_, j) => j !== i));
  const move = (from, to) => {
    if (to < 0 || to >= stops.length) return;
    setStops((s) => {
      const next = [...s];
      const [m] = next.splice(from, 1);
      next.splice(to, 0, m);
      return next;
    });
  };
  const applyPackage = (p) => setStops(p.stops.map(findLocation).filter(Boolean));
  const airportStart = () => {
    const ap = findLocation("Katunayake Airport");
    setStops((s) => [ap, ...s.filter((x) => x.name !== ap.name)]);
  };

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const detailsValid = form.name && form.phone && form.date && form.time;

  const goTo = (n) => {
    setStep(n);
    sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const message = () => {
    let m = `*HASHI CAB — RIDE REQUEST*\n\n`;
    m += `*Name:* ${form.name}\n*Phone:* ${form.phone}\n`;
    if (form.email) m += `*Email:* ${form.email}\n`;
    m += `*Passengers:* ${form.passengers}\n*Date:* ${form.date}  *Time:* ${form.time}\n`;
    if (form.flight) m += `*Flight:* ${form.flight}\n`;
    m += `*Vehicle:* ${vehicle.name} ($${vehicle.pricePerKm}/km)\n\n*Route:*\n`;
    stops.forEach((s, i) => (m += `${i + 1}. ${s.name}\n`));
    m += `\n*Legs:*\n`;
    legs.forEach((l) => (m += `${l.from} → ${l.to}: ${l.km} km = $${(l.km * vehicle.pricePerKm).toFixed(2)}\n`));
    m += `\n*Total:* ${km} km · approx. $${total.toFixed(2)}\n`;
    if (form.notes) m += `\n*Notes:* ${form.notes}\n`;
    return m;
  };

  const send = (channel) => {
    const text = message();
    const url =
      channel === "whatsapp"
        ? whatsappLink(text)
        : `https://t.me/share/url?url=${encodeURIComponent("https://wa.me/" + SITE.phoneIntl)}&text=${encodeURIComponent(text)}`;
    setSent(channel);
    window.open(url, "_blank", "noopener");
  };

  return (
    <section id="booking" ref={sectionRef} className="relative scroll-mt-24 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHead index="01" kicker="Your ride, your way" title={<>Where to <em className="font-serif font-normal text-neon">next?</em></>}>
          Book a taxi, airport transfer or private driver anywhere in Sri Lanka. Tap places on the map or search below — your fare updates live and nothing is charged online.
        </SectionHead>

        {/* Stepper */}
        <div className="reveal mb-8 flex items-center gap-3 font-mono text-xs tracking-widest uppercase">
          {["Route & vehicle", "Your details"].map((label, i) => (
            <div key={label} className="flex items-center gap-3">
              <span className={`flex items-center gap-2 rounded-full border px-4 py-2 transition ${step === i + 1 ? "border-neon bg-neon/10 text-chalk" : step > i + 1 ? "border-line text-chalk/70" : "border-line text-mute"}`}>
                {step > i + 1 ? <CheckCircle2 size={14} className="text-neon" /> : <span className="text-neon">0{i + 1}</span>}
                {label}
              </span>
              {i === 0 && <span className="h-px w-8 bg-line" />}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
          {/* LEFT */}
          <div className="reveal min-w-0 rounded-[1.75rem] border border-line bg-asphalt p-5 sm:p-7">
            {step === 1 ? (
              <>
                {/* Packages */}
                <Label>Ready-made routes</Label>
                <div className="no-scrollbar -mx-1 mb-7 flex gap-2 overflow-x-auto px-1 pb-1">
                  <button onClick={airportStart} className="flex shrink-0 items-center gap-2 rounded-full border border-neon/40 bg-neon/10 px-4 py-2 text-sm hover:bg-neon/20">
                    <Plane size={15} className="text-neon" /> Airport pick-up
                  </button>
                  {PACKAGES.map((p) => (
                    <button key={p.name} onClick={() => applyPackage(p)} className="shrink-0 rounded-full border border-line px-4 py-2 text-sm transition hover:border-chalk/40">
                      {p.name} <span className="ml-1 font-mono text-[11px] text-mute">{p.days}</span>
                    </button>
                  ))}
                </div>

                {/* Search */}
                <Label>Add a stop</Label>
                <div className="relative mb-4">
                  <Search size={18} className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-mute" />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setTimeout(() => setFocused(false), 150)}
                    onKeyDown={(e) => e.key === "Enter" && results[0] && addStop(results[0])}
                    placeholder={stops.length ? "Add another stop…" : "Pick-up — try Colombo, Airport, Ella…"}
                    className={`${field} pl-11`}
                  />
                  {focused && results.length > 0 && (
                    <ul className="thin-scroll absolute z-30 mt-2 max-h-72 w-full overflow-y-auto rounded-2xl border border-line bg-tarmac p-1.5 shadow-2xl shadow-black">
                      {results.map((r) => (
                        <li key={r.name}>
                          <button onMouseDown={(e) => e.preventDefault()} onClick={() => addStop(r)} className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left hover:bg-white/5">
                            <span>
                              <span className="font-medium">{r.name}</span>
                              <span className="ml-2 text-sm text-mute">{r.description}</span>
                            </span>
                            <span className="font-mono text-[10px] tracking-widest text-mute uppercase">{r.region}</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className="mb-7 flex flex-wrap gap-1.5">
                  {QUICK.map((n) => {
                    const on = stops.some((s) => s.name === n);
                    return (
                      <button key={n} disabled={on} onClick={() => addStop(findLocation(n))} className={`rounded-lg px-3 py-1.5 text-xs transition ${on ? "bg-neon/15 text-neon" : "bg-white/[0.04] text-chalk/70 hover:bg-white/10 hover:text-chalk"}`}>
                        {on ? "✓ " : "+ "}{n}
                      </button>
                    );
                  })}
                </div>

                {/* Stops */}
                <Label>Your route {stops.length > 0 && <span className="text-mute">· drag to reorder</span>}</Label>
                {stops.length === 0 ? (
                  <div className="grid place-items-center rounded-2xl border border-dashed border-line py-10 text-center text-sm text-mute">
                    <Route className="mb-3 text-neon" />
                    Add at least two stops to see your fare.
                  </div>
                ) : (
                  <ol className="relative space-y-2">
                    {stops.map((s, i) => (
                      <li
                        key={s.name}
                        draggable
                        onDragStart={() => setDragIndex(i)}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={() => { if (dragIndex !== null) move(dragIndex, i); setDragIndex(null); }}
                        className={`group flex items-center gap-3 rounded-2xl border bg-ink/60 p-2.5 pr-3 transition ${dragIndex === i ? "border-neon opacity-60" : "border-line hover:border-chalk/25"}`}
                      >
                        <GripVertical size={16} className="hidden shrink-0 cursor-grab text-mute sm:block" />
                        <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full font-mono text-xs font-bold ${i === 0 || i === stops.length - 1 ? "bg-neon text-white" : "border border-neon/60 text-neon"}`}>{i + 1}</span>
                        <div className="min-w-0 flex-1">
                          <div className="truncate font-medium">{s.name}</div>
                          <div className="font-mono text-[11px] text-mute">
                            {i === 0 ? "Pick-up" : `+${legs[i - 1]?.km} km`}
                            {i === stops.length - 1 && i > 0 ? " · Drop-off" : ""}
                          </div>
                        </div>
                        <div className="flex items-center">
                          <IconBtn label="Move up" onClick={() => move(i, i - 1)} disabled={i === 0}><ChevronUp size={16} /></IconBtn>
                          <IconBtn label="Move down" onClick={() => move(i, i + 1)} disabled={i === stops.length - 1}><ChevronDown size={16} /></IconBtn>
                          <IconBtn label="Remove" onClick={() => removeStop(i)}><X size={16} /></IconBtn>
                        </div>
                      </li>
                    ))}
                  </ol>
                )}

                {/* Vehicle */}
                <div className="mt-8">
                  <Label>Choose your ride</Label>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {VEHICLES.map((v) => (
                      <button
                        key={v.id}
                        onClick={() => setVehicleId(v.id)}
                        className={`rounded-2xl border p-3.5 text-left transition ${vehicleId === v.id ? "border-neon bg-neon/10" : "border-line hover:border-chalk/30"}`}
                      >
                        <div className="text-sm font-semibold">{v.name}</div>
                        <div className="mt-2 font-mono text-lg font-semibold">${v.pricePerKm}<span className="text-xs text-mute">/km</span></div>
                        <div className="mt-1 flex items-center gap-3 font-mono text-[11px] text-mute">
                          <span className="flex items-center gap-1"><Users size={11} />{v.seats}</span>
                          <span className="flex items-center gap-1"><Briefcase size={11} />{v.bags}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  disabled={stops.length < 2}
                  onClick={() => goTo(2)}
                  className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl bg-neon py-4 font-semibold text-white transition hover:bg-neon-deep disabled:cursor-not-allowed disabled:bg-white/5 disabled:text-mute"
                >
                  {stops.length < 2 ? "Add at least 2 stops" : "Continue to your details"} <ArrowRight size={18} />
                </button>
              </>
            ) : (
              <>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field icon={User} label="Full name *"><input className={field} value={form.name} onChange={set("name")} placeholder="Your name" autoComplete="name" /></Field>
                  <Field icon={Phone} label="WhatsApp / phone *"><input type="tel" className={field} value={form.phone} onChange={set("phone")} placeholder="+44 7700 900123" autoComplete="tel" /></Field>
                  <Field icon={Mail} label="Email"><input type="email" className={field} value={form.email} onChange={set("email")} placeholder="you@example.com" autoComplete="email" /></Field>
                  <Field icon={Users} label="Passengers">
                    <select className={field} value={form.passengers} onChange={set("passengers")}>
                      {[...Array(12)].map((_, i) => <option key={i} value={i + 1} className="bg-ink">{i + 1}</option>)}
                    </select>
                  </Field>
                  <Field icon={Calendar} label="Pick-up date *"><input type="date" className={field} value={form.date} onChange={set("date")} min={new Date().toISOString().split("T")[0]} /></Field>
                  <Field icon={Clock} label="Pick-up time *"><input type="time" className={field} value={form.time} onChange={set("time")} /></Field>
                  <Field icon={Plane} label="Flight number (optional)"><input className={field} value={form.flight} onChange={set("flight")} placeholder="e.g. UL 504" /></Field>
                  <Field label="Notes (optional)" className="sm:col-span-2">
                    <textarea rows={3} className={`${field} resize-none`} value={form.notes} onChange={set("notes")} placeholder="Child seat, extra luggage, hotel names…" />
                  </Field>
                </div>

                <div className="mt-7 grid gap-2 sm:grid-cols-[auto_1fr_1fr]">
                  <button onClick={() => goTo(1)} className="flex items-center justify-center gap-2 rounded-2xl border border-line px-5 py-4 font-semibold hover:border-chalk/40">
                    <ArrowLeft size={18} /> Route
                  </button>
                  <button disabled={!detailsValid} onClick={() => send("whatsapp")} className="flex items-center justify-center gap-2 rounded-2xl bg-[#25D366] py-4 font-semibold text-ink transition hover:brightness-110 disabled:cursor-not-allowed disabled:bg-white/5 disabled:text-mute">
                    <MessageCircle size={18} /> Send on WhatsApp
                  </button>
                  <button disabled={!detailsValid} onClick={() => send("telegram")} className="flex items-center justify-center gap-2 rounded-2xl bg-[#229ED9] py-4 font-semibold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:bg-white/5 disabled:text-mute">
                    <Send size={18} /> Telegram
                  </button>
                </div>
                <p className="mt-3 text-center text-xs text-mute">{detailsValid ? "Your request opens pre-filled — just hit send." : "Fill in name, phone, date and time to continue."} No payment is taken now.</p>
              </>
            )}
          </div>

          {/* RIGHT: map + meter */}
          <div className="reveal min-w-0 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-[1.75rem] border border-line bg-asphalt p-5">
              <div className="flex items-center justify-between font-mono text-[11px] tracking-widest text-mute uppercase">
                <span>Live route</span>
                <span>{step === 1 ? "Tap a dot to add" : `${stops.length} stops`}</span>
              </div>
              <IslandMap stops={stops} ghost={step === 1 ? GHOSTS : []} onPick={step === 1 ? addStop : undefined} className="mx-auto h-[340px] w-full sm:h-[400px]" />

              {/* Fare meter */}
              <div className="rounded-2xl bg-ink p-5">
                <div className="grid grid-cols-3 gap-2 text-center">
                  <Meter value={km} label="km" />
                  <Meter value={hours ? `${Math.floor(hours)}h${String(Math.round((hours % 1) * 60)).padStart(2, "0")}` : "0h00"} label="drive" />
                  <Meter value={`$${vehicle.pricePerKm}`} label="per km" />
                </div>
                {legs.length > 0 && (
                  <ul className="thin-scroll mt-4 max-h-36 space-y-1 overflow-y-auto border-t border-line pt-3 font-mono text-xs">
                    {legs.map((l) => (
                      <li key={l.from + l.to} className="flex justify-between gap-3 text-chalk/70">
                        <span className="truncate">{l.from} → {l.to}</span>
                        <span className="shrink-0">{l.km} km · <span className="text-chalk">${(l.km * vehicle.pricePerKm).toFixed(2)}</span></span>
                      </li>
                    ))}
                  </ul>
                )}
                <div className="mt-4 flex items-end justify-between border-t border-line pt-4">
                  <div>
                    <div className="font-mono text-[11px] tracking-widest text-mute uppercase">Estimated fare · {vehicle.name}</div>
                    <div className="mt-1 text-5xl font-bold tracking-tight tabular-nums">
                      <span className="text-neon">$</span>{total.toFixed(2)}
                    </div>
                  </div>
                  <div className="text-right font-mono text-[11px] text-mute">Estimate · final<br />fare confirmed</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {sent && (
        <div className="fixed inset-0 z-[70] grid place-items-center bg-black/80 p-4 backdrop-blur-sm" onClick={() => setSent(null)}>
          <div className="w-full max-w-sm rounded-3xl border border-line bg-asphalt p-8 text-center" onClick={(e) => e.stopPropagation()}>
            <div className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-full bg-neon/15">
              <CheckCircle2 size={34} className="text-neon" />
            </div>
            <h3 className="text-2xl font-bold">Request ready!</h3>
            <p className="mt-2 text-chalk/65">
              We opened {sent === "whatsapp" ? "WhatsApp" : "Telegram"} with your trip filled in. Press send and we'll confirm your driver shortly.
            </p>
            <button onClick={() => setSent(null)} className="mt-6 w-full rounded-2xl bg-neon py-3.5 font-semibold">Done</button>
          </div>
        </div>
      )}
    </section>
  );
}

function Label({ children }) {
  return <div className="mb-3 font-mono text-[11px] tracking-[0.2em] text-chalk/80 uppercase">{children}</div>;
}

function Field({ label, icon: Icon, children, className = "" }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-2 flex items-center gap-1.5 font-mono text-[11px] tracking-[0.15em] text-mute uppercase">
        {Icon && <Icon size={12} className="text-neon" />} {label}
      </span>
      {children}
    </label>
  );
}

function IconBtn({ children, label, ...props }) {
  return (
    <button aria-label={label} title={label} className="grid h-8 w-8 place-items-center rounded-lg text-mute transition hover:bg-white/10 hover:text-chalk disabled:opacity-25 disabled:hover:bg-transparent" {...props}>
      {children}
    </button>
  );
}

function Meter({ value, label }) {
  return (
    <div className="rounded-xl border border-line py-2.5">
      <div className="font-mono text-lg font-semibold tabular-nums">{value}</div>
      <div className="font-mono text-[10px] tracking-widest text-mute uppercase">{label}</div>
    </div>
  );
}
