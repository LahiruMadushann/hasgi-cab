import { findLocation, roadDistance, VEHICLES } from "./travel";

// Popular transfer routes — fares calculated from the same per-km rates as the booking planner.
const ROUTE_PAIRS = [
  ["Katunayake Airport", "Colombo"],
  ["Katunayake Airport", "Negombo"],
  ["Katunayake Airport", "Kandy"],
  ["Katunayake Airport", "Sigiriya"],
  ["Katunayake Airport", "Galle"],
  ["Katunayake Airport", "Bentota"],
  ["Katunayake Airport", "Ella"],
  ["Katunayake Airport", "Mirissa"],
  ["Colombo", "Kandy"],
  ["Kandy", "Sigiriya"],
  ["Kandy", "Nuwara Eliya"],
  ["Kandy", "Ella"],
  ["Ella", "Yala"],
  ["Ella", "Arugam Bay"],
  ["Galle", "Mirissa"],
  ["Colombo", "Galle"],
];

const sedan = VEHICLES.find((v) => v.id === "sedan");
const van = VEHICLES.find((v) => v.id === "van");

export const POPULAR_ROUTES = ROUTE_PAIRS.map(([a, b]) => {
  const km = roadDistance(findLocation(a), findLocation(b));
  return {
    from: a,
    to: b,
    km,
    hours: km / 45,
    sedan: Math.round(km * sedan.pricePerKm),
    van: Math.round(km * van.pricePerKm),
  };
});

const rateList = VEHICLES.map((v) => `${v.name} $${v.pricePerKm}/km`).join(", ");
const airportKandy = POPULAR_ROUTES.find((r) => r.from === "Katunayake Airport" && r.to === "Kandy");

export const FAQS = [
  {
    q: "How much does a taxi cost in Sri Lanka with Hashi Cab?",
    a: `Our fares are charged per kilometre: ${rateList}. For example, Colombo Airport to Kandy (about ${airportKandy.km} km) is roughly $${airportKandy.sedan} by sedan. The booking planner on this page shows your estimate instantly, and we confirm the final fare before your trip.`,
  },
  {
    q: "Do you offer airport taxi pick-ups from Colombo Bandaranaike Airport (CMB)?",
    a: "Yes. We provide airport transfers from Bandaranaike International Airport in Katunayake to anywhere in Sri Lanka — Colombo, Negombo, Kandy, Sigiriya, Galle, Ella and the south coast. Use the “Airport pick-up” button in the planner and add your flight number.",
  },
  {
    q: "Can I hire a car with a driver for a Sri Lanka round tour?",
    a: "Yes. You can plan a multi-stop tour such as the Cultural Triangle (Sigiriya, Polonnaruwa, Kandy), the hill country (Nuwara Eliya, Ella) or the south coast (Galle, Mirissa). Add all your stops in the planner and send the route to us on WhatsApp.",
  },
  {
    q: "How do I book a cab or vehicle in Sri Lanka?",
    a: "Build your route in the planner, choose a sedan, luxury car, SUV or van, then enter your date and pick-up time. Your full booking is sent to us on WhatsApp or Telegram in one tap and we reply to confirm your driver.",
  },
  {
    q: "Do I have to pay online in advance?",
    a: "No. No payment is taken on this website. We confirm the fare and payment details with you directly when we confirm your booking.",
  },
  {
    q: "Which vehicle should I choose for my group?",
    a: `${VEHICLES.map((v) => `${v.name}: ${v.seats} passengers`).join("; ")}. For families, groups or lots of luggage we recommend the SUV or van.`,
  },
  {
    q: "Which areas of Sri Lanka do you cover?",
    a: "The whole island — Colombo, Negombo, Kandy, Sigiriya, Dambulla, Anuradhapura, Nuwara Eliya, Ella, Yala, Galle, Mirissa, Bentota, Arugam Bay, Trincomalee, Jaffna and more than 40 other towns and attractions.",
  },
];
