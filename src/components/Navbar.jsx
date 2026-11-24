import { useState } from "react";
import { Menu, X, Phone, ArrowUpRight } from "lucide-react";
import logo from "../assets/logo.jpg";
import { SITE } from "../data/site";
import { useScrolled } from "../hooks";

const LINKS = [
  ["How it works", "#how"],
  ["Fleet", "#fleet"],
  ["Destinations", "#destinations"],
  ["Reviews", "#reviews"],
  ["About", "#about"],
];

export default function Navbar() {
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5">
      <nav
        className={`mx-auto flex max-w-7xl items-center justify-between rounded-2xl border px-3 py-2 transition-all duration-500 sm:px-4 ${
          scrolled || open
            ? "border-line bg-ink/80 shadow-2xl shadow-black/50 backdrop-blur-xl"
            : "border-transparent bg-transparent"
        }`}
      >
        <a href="#top" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <img src={logo} alt="Hashi Cab" className="h-10 w-12 rounded-lg object-cover" />
          <span className="leading-none">
            <span className="block text-[15px] font-bold tracking-tight">HASHI CAB</span>
            <span className="block font-mono text-[10px] tracking-[0.2em] text-mute">& RENT A CAR</span>
          </span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {LINKS.map(([label, href]) => (
            <li key={href}>
              <a href={href} className="rounded-full px-4 py-2 text-sm text-chalk/70 transition hover:bg-white/5 hover:text-chalk">
                {label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a href={`tel:+${SITE.phoneIntl}`} className="hidden items-center gap-2 px-3 text-sm text-chalk/70 hover:text-chalk md:flex">
            <Phone size={15} className="text-neon" />
            <span className="font-mono text-xs">{SITE.phoneDisplay}</span>
          </a>
          <a
            href="#booking"
            className="group hidden items-center gap-1.5 rounded-full bg-neon px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-neon-deep sm:inline-flex"
          >
            Plan your ride
            <ArrowUpRight size={16} className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <button
            className="grid h-10 w-10 place-items-center rounded-xl border border-line lg:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="mx-auto mt-2 max-w-7xl rounded-2xl border border-line bg-ink/95 p-3 backdrop-blur-xl lg:hidden">
          {LINKS.map(([label, href], i) => (
            <a
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="flex items-baseline gap-4 rounded-xl px-3 py-3 text-2xl font-semibold tracking-tight hover:bg-white/5"
            >
              <span className="font-mono text-xs text-neon">0{i + 1}</span>
              {label}
            </a>
          ))}
          <a href="#booking" onClick={() => setOpen(false)} className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-neon py-3 font-semibold">
            Plan your ride <ArrowUpRight size={16} />
          </a>
        </div>
      )}
    </header>
  );
}
