// Central business details — edit here and the whole site updates.
export const SITE = {
  name: "Hashi Cab",
  phoneDisplay: "+94 77 942 4151",
  phoneIntl: "94779424151",
  email: "hasithadlkandambi@gmail.com",
  city: "Colombo, Sri Lanka",

  // ⚠️ SET THIS to your live website address (no trailing slash), e.g. "https://www.hashicab.lk".
  // It is used for Google's canonical link, social previews and sitemap.xml.
  // While empty, those are skipped (the build prints a warning).
  url: "https://www.hashicab.com",
};

// Search-engine text — what Google shows in results.
export const SEO = {
  title: "Hashi Cab | Sri Lanka Taxi, Cab & Airport Transfer Service — Book Online",
  description:
    "Book a reliable taxi or private driver anywhere in Sri Lanka. Colombo airport (CMB) pick-ups, round tours to Kandy, Sigiriya, Ella, Galle & Yala. Cars, SUVs and vans from $0.29/km — instant fare, book on WhatsApp.",
  keywords:
    "Sri Lanka taxi, Sri Lanka cab service, taxi service Sri Lanka, airport taxi Colombo, Bandaranaike airport transfer, Sri Lanka private driver, car with driver Sri Lanka, Sri Lanka tour driver, van hire Sri Lanka, vehicle booking Sri Lanka, Kandy taxi, Ella taxi, Galle taxi, Hashi Cab",
  ogImage: "/og-image.jpg",
};

// Google Business listing (from your Google review link)
const LRD = "0x3ae13f1d9994fe51:0x6703c9d56954671c";
export const GOOGLE = {
  // Opens the Google reviews panel for Hashi Cab
  reviewsUrl: `https://www.google.com/search?q=hashi+cab#lrd=${LRD},1,,,,`,
  // Opens the "Write a review" dialog directly
  writeReviewUrl: `https://www.google.com/search?q=hashi+cab#lrd=${LRD},3,,,,`,
  // Opens the business on Google Maps
  mapsUrl: "https://maps.google.com/?cid=7422998529269065500",
};

export const whatsappLink = (text = "Hi Hashi Cab, I'd like to book a ride.") =>
  `https://wa.me/${SITE.phoneIntl}?text=${encodeURIComponent(text)}`;
