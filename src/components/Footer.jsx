import { Phone, Mail, MapPin, MessageCircle, Star } from "lucide-react";
import logo from "../assets/logo.jpg";
import { SITE, GOOGLE, whatsappLink } from "../data/site";

export default function Footer() {
  return (
    <footer className="relative mt-10 overflow-hidden border-t border-line pt-20">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <img src={logo} alt="Hashi Cab & Rent a Car" className="h-24 rounded-2xl" />
          <p className="mt-5 max-w-sm text-chalk/60">Private drivers, airport transfers and island tours. Discover more, worry less — travel Sri Lanka with Hashi Cab.</p>
        </div>
        <div>
          <h4 className="mb-5 font-mono text-xs tracking-[0.25em] text-mute uppercase">Explore</h4>
          <ul className="space-y-3">
            {[["Plan your journey", "#booking"], ["How it works", "#how"], ["Our vehicles", "#fleet"], ["Destinations", "#destinations"], ["About us", "#about"]].map(([l, h]) => (
              <li key={h}><a href={h} className="text-chalk/75 hover:text-neon">{l}</a></li>
            ))}
            <li><a href={GOOGLE.reviewsUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-chalk/75 hover:text-neon"><Star size={14} /> Google reviews</a></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-5 font-mono text-xs tracking-[0.25em] text-mute uppercase">Contact</h4>
          <ul className="space-y-3 text-chalk/75">
            <li><a href={`tel:+${SITE.phoneIntl}`} className="flex items-center gap-3 hover:text-neon"><Phone size={16} className="text-neon" />{SITE.phoneDisplay}</a></li>
            <li><a href={whatsappLink()} target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-neon"><MessageCircle size={16} className="text-neon" />WhatsApp us</a></li>
            <li><a href={`mailto:${SITE.email}`} className="flex items-center gap-3 hover:text-neon"><Mail size={16} className="text-neon" />{SITE.email}</a></li>
            <li><a href={GOOGLE.mapsUrl} target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-neon"><MapPin size={16} className="text-neon" />{SITE.city}</a></li>
          </ul>
        </div>
      </div>

      <div className="pointer-events-none mt-16 px-4 text-center text-[22vw] leading-[0.8] font-bold tracking-[-0.06em] text-white/[0.04] select-none">
        HASHI<span className="text-neon/20">CAB</span>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-6 font-mono text-[11px] tracking-widest text-mute uppercase sm:px-6">
          <span>© {new Date().getFullYear()} Hashi Cab. All rights reserved.</span>
          <span>Made for the love of the road · Sri Lanka</span>
        </div>
      </div>
    </footer>
  );
}

export function FloatingWhatsApp() {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="group fixed right-4 bottom-4 z-50 flex items-center gap-2 rounded-full bg-[#25D366] p-3.5 text-ink shadow-2xl shadow-[#25D366]/30 transition hover:pr-5 sm:right-6 sm:bottom-6"
    >
      <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366]/40 [animation-duration:2.5s]" />
      <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor" aria-hidden="true">
        <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.4-1.48-.88-.79-1.48-1.76-1.66-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35M12.05 21.79h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.9-9.88a9.83 9.83 0 0 1 9.88 9.89c0 5.45-4.44 9.88-9.89 9.88m8.41-18.3A11.81 11.81 0 0 0 12.05 0C5.5 0 .16 5.33.16 11.89c0 2.1.55 4.14 1.59 5.94L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.89 0-3.18-1.24-6.16-3.48-8.42" />
      </svg>
      <span className="hidden max-w-0 overflow-hidden font-semibold whitespace-nowrap transition-all group-hover:max-w-40 sm:inline">Chat with us</span>
    </a>
  );
}
