// Central business details — edit here and the whole site updates.
export const SITE = {
  name: "Hashi Cab",
  phoneDisplay: "+94 77 942 4151",
  phoneIntl: "94779424151",
  email: "hasithadlkandambi@gmail.com",
  city: "Colombo, Sri Lanka",
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
