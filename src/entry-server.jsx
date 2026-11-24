/* eslint-disable react-refresh/only-export-components -- build-time entry, not a component module */
// Used only at build time to prerender the page to static HTML (for Google & social previews).
import { renderToString } from "react-dom/server";
import App from "./App";
import { SITE, SEO, GOOGLE } from "./data/site";
import { FAQS } from "./data/seo-content";
import { VEHICLES } from "./data/travel";
import logo from "./assets/logo.jpg";

export { SITE };

export function render() {
  return renderToString(<App />);
}

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

export function head() {
  const base = SITE.url.replace(/\/$/, "");
  const abs = (p) => (base ? base + p : p);

  const business = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "TravelAgency"],
    "@id": abs("/#business"),
    name: SITE.name,
    alternateName: ["Hashi Cab & Rent a Car", "Hashi Cab Sri Lanka"],
    description: SEO.description,
    image: abs(logo),
    logo: abs(logo),
    telephone: `+${SITE.phoneIntl}`,
    email: SITE.email,
    priceRange: `$${Math.min(...VEHICLES.map((v) => v.pricePerKm))}–$${Math.max(...VEHICLES.map((v) => v.pricePerKm))} per km`,
    currenciesAccepted: "USD, LKR",
    address: { "@type": "PostalAddress", addressLocality: "Colombo", addressCountry: "LK" },
    areaServed: { "@type": "Country", name: "Sri Lanka" },
    hasMap: GOOGLE.mapsUrl,
    sameAs: [GOOGLE.mapsUrl],
    ...(base && { url: base + "/" }),
    makesOffer: VEHICLES.map((v) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "TaxiService",
        name: `${v.name} taxi with driver in Sri Lanka`,
        areaServed: "Sri Lanka",
        provider: { "@id": abs("/#business") },
      },
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: v.pricePerKm,
        priceCurrency: "USD",
        unitText: "per kilometre",
      },
    })),
  };

  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  const tags = [
    `<title>${esc(SEO.title)}</title>`,
    `<meta name="description" content="${esc(SEO.description)}" />`,
    `<meta name="keywords" content="${esc(SEO.keywords)}" />`,
    `<meta name="robots" content="index, follow, max-image-preview:large" />`,
    `<meta name="geo.region" content="LK" />`,
    `<meta name="geo.placename" content="Colombo, Sri Lanka" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${esc(SITE.name)}" />`,
    `<meta property="og:title" content="${esc(SEO.title)}" />`,
    `<meta property="og:description" content="${esc(SEO.description)}" />`,
    `<meta property="og:locale" content="en_US" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(SEO.title)}" />`,
    `<meta name="twitter:description" content="${esc(SEO.description)}" />`,
  ];
  if (base) {
    tags.push(
      `<link rel="canonical" href="${base}/" />`,
      `<meta property="og:url" content="${base}/" />`,
      `<meta property="og:image" content="${base}${SEO.ogImage}" />`,
      `<meta name="twitter:image" content="${base}${SEO.ogImage}" />`
    );
  }
  tags.push(
    `<script type="application/ld+json">${JSON.stringify(business).replace(/</g, "\\u003c")}</script>`,
    `<script type="application/ld+json">${JSON.stringify(faq).replace(/</g, "\\u003c")}</script>`
  );
  return tags.join("\n    ");
}
