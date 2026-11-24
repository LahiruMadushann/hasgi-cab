import sigiriyaImg from "../assets/destinations/sigiriya.jpg";
import ellaImg from "../assets/destinations/ella.jpg";
import galleImg from "../assets/destinations/galle.jpg";
import yalaImg from "../assets/destinations/yala.jpg";
import kandyImg from "../assets/destinations/kandy.jpg";
import arugamImg from "../assets/destinations/arugam.jpg";

// Sri Lankan locations with coordinates
export const LOCATIONS = [
  { name: "Colombo", lat: 6.9271, lng: 79.8612, region: "West", description: "Commercial capital" },
  { name: "Katunayake Airport", lat: 7.181, lng: 79.884, region: "West", description: "Bandaranaike Intl. (CMB)" },
  { name: "Mattala Airport", lat: 6.284, lng: 81.123, region: "South", description: "Mattala Intl. (HRI)" },
  { name: "Negombo", lat: 7.2008, lng: 79.8358, region: "West", description: "Beach town" },
  { name: "Mount Lavinia", lat: 6.8386, lng: 79.8636, region: "West", description: "Beach town" },
  { name: "Kalutara", lat: 6.5854, lng: 79.9607, region: "West", description: "River city" },
  { name: "Kalpitiya", lat: 8.2322, lng: 79.7725, region: "North West", description: "Kite surfing" },
  { name: "Kandy", lat: 7.2906, lng: 80.6337, region: "Hills", description: "Cultural capital" },
  { name: "Nuwara Eliya", lat: 6.9497, lng: 80.7891, region: "Hills", description: "Tea country" },
  { name: "Ella", lat: 6.8667, lng: 81.0467, region: "Hills", description: "Nine Arch Bridge" },
  { name: "Haputale", lat: 6.7679, lng: 80.9598, region: "Hills", description: "Mountain views" },
  { name: "Bandarawela", lat: 6.8322, lng: 80.9847, region: "Hills", description: "Hill station" },
  { name: "Badulla", lat: 6.9934, lng: 81.055, region: "Hills", description: "Hill city" },
  { name: "Lipton's Seat", lat: 6.7833, lng: 80.9667, region: "Hills", description: "Tea viewpoint" },
  { name: "Ravana Falls", lat: 6.8333, lng: 81.05, region: "Hills", description: "Waterfall" },
  { name: "Kitulgala", lat: 6.989, lng: 80.4177, region: "Hills", description: "White-water rafting" },
  { name: "Ratnapura", lat: 6.6828, lng: 80.4036, region: "Hills", description: "City of gems" },
  { name: "Sigiriya", lat: 7.957, lng: 80.7603, region: "Cultural", description: "Lion Rock fortress" },
  { name: "Pidurangala", lat: 7.9667, lng: 80.75, region: "Cultural", description: "Sunrise rock" },
  { name: "Dambulla", lat: 7.8606, lng: 80.6518, region: "Cultural", description: "Cave temples" },
  { name: "Polonnaruwa", lat: 7.9403, lng: 81.0188, region: "Cultural", description: "Ancient city" },
  { name: "Anuradhapura", lat: 8.3114, lng: 80.4037, region: "Cultural", description: "Ancient kingdom" },
  { name: "Mihintale", lat: 8.3506, lng: 80.5072, region: "Cultural", description: "Sacred mountain" },
  { name: "Aukana", lat: 8.0333, lng: 80.5167, region: "Cultural", description: "Buddha statue" },
  { name: "Wilpattu", lat: 8.4787, lng: 80.0278, region: "North West", description: "National park" },
  { name: "Galle", lat: 6.0535, lng: 80.221, region: "South", description: "Dutch fort" },
  { name: "Unawatuna", lat: 6.0104, lng: 80.2489, region: "South", description: "Bay beach" },
  { name: "Hikkaduwa", lat: 6.1408, lng: 80.1031, region: "South", description: "Surf & coral" },
  { name: "Bentota", lat: 6.4257, lng: 79.9951, region: "South", description: "Beach resort" },
  { name: "Ahangama", lat: 5.9667, lng: 80.3667, region: "South", description: "Surf coast" },
  { name: "Weligama", lat: 5.9742, lng: 80.4297, region: "South", description: "Surf bay" },
  { name: "Mirissa", lat: 5.9467, lng: 80.4686, region: "South", description: "Whale watching" },
  { name: "Matara", lat: 5.9485, lng: 80.5353, region: "South", description: "Southern coast" },
  { name: "Hiriketiya", lat: 5.9667, lng: 80.6833, region: "South", description: "Hidden surf bay" },
  { name: "Tangalle", lat: 6.0236, lng: 80.7969, region: "South", description: "Quiet beaches" },
  { name: "Yala", lat: 6.3724, lng: 81.5198, region: "South", description: "Leopard safari" },
  { name: "Arugam Bay", lat: 6.8414, lng: 81.8361, region: "East", description: "Surf point" },
  { name: "Batticaloa", lat: 7.731, lng: 81.6747, region: "East", description: "Lagoon city" },
  { name: "Pasikuda", lat: 7.9261, lng: 81.5579, region: "East", description: "Calm shallow sea" },
  { name: "Trincomalee", lat: 8.5874, lng: 81.2152, region: "East", description: "Harbour & beaches" },
  { name: "Jaffna", lat: 9.6615, lng: 80.0255, region: "North", description: "Northern heritage" },
];

export const findLocation = (name) => LOCATIONS.find((l) => l.name === name);

export const VEHICLES = [
  { id: "sedan", name: "Sedan", seats: "1–3", bags: 2, pricePerKm: 0.29, tag: "Smart choice", note: "Comfortable and economical — perfect for couples and airport runs." },
  { id: "luxury", name: "Luxury Car", seats: "1–3", bags: 3, pricePerKm: 0.32, tag: "Comfort", note: "A step up in comfort and style for long island drives." },
  { id: "suv", name: "SUV", seats: "4–6", bags: 4, pricePerKm: 0.42, tag: "Hill ready", note: "High clearance and space — made for the hill country." },
  { id: "van", name: "Van", seats: "6–8", bags: 8, pricePerKm: 0.48, tag: "Groups", note: "Space for families, groups and plenty of luggage." },
];

export const PACKAGES = [
  { name: "Cultural Triangle", days: "3–4 days", stops: ["Colombo", "Sigiriya", "Polonnaruwa", "Kandy"] },
  { name: "Tea & Hills", days: "3 days", stops: ["Kandy", "Nuwara Eliya", "Ella"] },
  { name: "South Coast Loop", days: "2–3 days", stops: ["Colombo", "Bentota", "Galle", "Mirissa"] },
  { name: "Wild East", days: "4 days", stops: ["Ella", "Yala", "Arugam Bay"] },
];

// Photos: Wikimedia Commons, credited on each card as their licences require.
const C = "https://commons.wikimedia.org/wiki/File:";
export const DESTINATIONS = [
  { name: "Sigiriya", line: "Climb a 5th-century palace in the sky.", img: sigiriyaImg,
    credit: { by: "Wrobell", license: "CC BY-SA 3.0", url: C + "Sigiriya_(141688197).jpeg" } },
  { name: "Ella", line: "Trains, tea and the Nine Arch Bridge.", img: ellaImg,
    credit: { by: "MichaelJames2468", license: "CC BY-SA 4.0", url: C + "The_Nine_Arches_Bridge.jpg" } },
  { name: "Galle", line: "Sunset walks on a 400-year-old fort.", img: galleImg,
    credit: { by: "Rovin Shanila", license: "CC BY-SA 4.0", url: C + "Galle_Fort.jpg" } },
  { name: "Yala", line: "Leopards, elephants, open jeeps.", img: yalaImg, focus: "50% 30%",
    credit: { by: "Charles J. Sharp", license: "CC BY-SA 4.0", url: C + "Sri_Lankan_leopard_(Panthera_pardus_kotiya)_female_5.jpg" } },
  { name: "Kandy", line: "The Temple of the Tooth by the lake.", img: kandyImg,
    credit: { by: "A.Savin", license: "FAL", url: C + "SL_Kandy_asv2020-01_img33_Sacred_Tooth_Temple.jpg" } },
  { name: "Arugam Bay", line: "Right-hand point breaks on the east coast.", img: arugamImg,
    credit: { by: "Dennis Sylvester Hurd", license: "CC0", url: C + "Beach_of_Arugam_Bay.jpg" } },
];

// Haversine distance × 1.3 road factor, in km
export function roadDistance(a, b) {
  const R = 6371;
  const toRad = (d) => (d * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return Math.round(R * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h)) * 1.3);
}

export const toDMS = (v, pos, neg) => {
  const abs = Math.abs(v);
  const d = Math.floor(abs);
  const m = Math.round((abs - d) * 60);
  return `${String(d).padStart(2, "0")}°${String(m).padStart(2, "0")}′ ${v >= 0 ? pos : neg}`;
};
