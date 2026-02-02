import React, { useState, useEffect, useRef } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Users,
  Calendar,
  Car,
  MessageCircle,
  Plus,
  X,
  GripVertical,
  Search,
  DollarSign,
  Clock,
  ChevronRight,
  CheckCircle,
  Star,
  Award,
  Shield,
  Zap,
  Navigation,
  Send,
} from "lucide-react";
import logo from "./assets/logo.jpg";

// Comprehensive list of Sri Lankan locations with coordinates
const sriLankaLocations = [
  // Major Cities
  { name: "Colombo", lat: 6.9271, lng: 79.8612, type: "city", description: "Commercial Capital", image: "🏙️" },
  { name: "Kandy", lat: 7.2906, lng: 80.6337, type: "city", description: "Cultural Capital", image: "🏛️" },
  { name: "Galle", lat: 6.0535, lng: 80.2210, type: "city", description: "Historic Fort City", image: "🏰" },
  { name: "Jaffna", lat: 9.6615, lng: 80.0255, type: "city", description: "Northern Heritage", image: "🕌" },
  { name: "Katunayake Airport", lat: 7.1810, lng: 79.8840, type: "city", description: "International Airport", image: "✈️" },
  { name: "Mattala Airport", lat: 6.2840, lng: 81.1230, type: "city", description: "International Airport", image: "�" },

  // Tourist Destinations
  { name: "Sigiriya", lat: 7.9570, lng: 80.7603, type: "attraction", description: "Ancient Rock Fortress", image: "⛰️" },
  { name: "Ella", lat: 6.8667, lng: 81.0467, type: "town", description: "Hill Country Paradise", image: "🌄" },
  { name: "Nuwara Eliya", lat: 6.9497, lng: 80.7891, type: "city", description: "Tea Country", image: "🍃" },
  { name: "Anuradhapura", lat: 8.3114, lng: 80.4037, type: "city", description: "Ancient Kingdom", image: "🛕" },
  { name: "Trincomalee", lat: 8.5874, lng: 81.2152, type: "city", description: "Beach Paradise", image: "🏖️" },
  { name: "Yala", lat: 6.3724, lng: 81.5198, type: "park", description: "Wildlife Safari", image: "🐘" },

  // Southern Coast
  { name: "Matara", lat: 5.9485, lng: 80.5353, type: "city", description: "Southern Coast", image: "🌊" },
  { name: "Mirissa", lat: 5.9467, lng: 80.4686, type: "beach", description: "Whale Watching", image: "🐋" },
  { name: "Bentota", lat: 6.4257, lng: 79.9951, type: "beach", description: "Beach Resort", image: "🏝️" },
  { name: "Unawatuna", lat: 6.0104, lng: 80.2489, type: "beach", description: "Beach Paradise", image: "🏖️" },
  { name: "Hikkaduwa", lat: 6.1408, lng: 80.1031, type: "beach", description: "Surf & Coral", image: "🏄" },
  { name: "Tangalle", lat: 6.0236, lng: 80.7969, type: "beach", description: "Pristine Beaches", image: "🌴" },
  { name: "Hiriketiya", lat: 5.9667, lng: 80.6833, type: "beach", description: "Hidden Surf Paradise", image: "🏄" },
  { name: "Weligama", lat: 5.9742, lng: 80.4297, type: "beach", description: "Bay of Sand", image: "🏖️" },
  { name: "Ahangama", lat: 5.9667, lng: 80.3667, type: "beach", description: "Coastal Charm", image: "🌊" },

  // East Coast
  { name: "Arugam Bay", lat: 6.8414, lng: 81.8361, type: "beach", description: "Surf Paradise", image: "🏄" },
  { name: "Batticaloa", lat: 7.7310, lng: 81.6747, type: "city", description: "Eastern Gateway", image: "🌊" },
  { name: "Pasikuda", lat: 7.9261, lng: 81.5579, type: "beach", description: "Calm Waters", image: "🏖️" },

  // Hill Country
  { name: "Badulla", lat: 6.9934, lng: 81.0550, type: "city", description: "Hill City", image: "⛰️" },
  { name: "Haputale", lat: 6.7679, lng: 80.9598, type: "town", description: "Mountain Views", image: "🏔️" },
  { name: "Bandarawela", lat: 6.8322, lng: 80.9847, type: "town", description: "Hill Station", image: "🌄" },
  { name: "Lipton's Seat", lat: 6.7833, lng: 80.9667, type: "viewpoint", description: "Panoramic Tea Views", image: "🍃" },
  { name: "Ravana Falls", lat: 6.8333, lng: 81.0500, type: "waterfall", description: "Scenic Waterfall", image: "💧" },

  // Cultural Triangle
  { name: "Polonnaruwa", lat: 7.9403, lng: 81.0188, type: "city", description: "Ancient City", image: "🏛️" },
  { name: "Dambulla", lat: 7.8606, lng: 80.6518, type: "town", description: "Cave Temples", image: "🛕" },
  { name: "Mihintale", lat: 8.3506, lng: 80.5072, type: "site", description: "Sacred Mountain", image: "⛰️" },
  { name: "Pidurangala", lat: 7.9667, lng: 80.7500, type: "rock", description: "Alternative to Sigiriya", image: "⛰️" },

  // Western Province
  { name: "Negombo", lat: 7.2008, lng: 79.8358, type: "city", description: "Beach Town", image: "🏖️" },
  { name: "Kalutara", lat: 6.5854, lng: 79.9607, type: "city", description: "River City", image: "🌊" },
  { name: "Kalpitiya", lat: 8.2322, lng: 79.7725, type: "town", description: "Kite Surfing", image: "🪁" },
  { name: "Mount Lavinia", lat: 6.8386, lng: 79.8636, type: "beach", description: "Beach Town", image: "🌅" },

  // Central Province
  { name: "Kitulgala", lat: 6.9890, lng: 80.4177, type: "town", description: "White Water Rafting", image: "🚣" },
  { name: "Ratnapura", lat: 6.6828, lng: 80.4036, type: "city", description: "Gem City", image: "💎" },

  // North Central
  { name: "Wilpattu", lat: 8.4787, lng: 80.0278, type: "park", description: "National Park", image: "🦁" },
  { name: "Aukana", lat: 8.0333, lng: 80.5167, type: "site", description: "Buddha Statue", image: "🗿" },
];

const vehicleTypes = [
  { id: "sedan", name: "Sedan", capacity: "3-4", icon: "🚗", pricePerKm: 0.29 },
  { id: "van", name: "Van", capacity: "6-8", icon: "🚐", pricePerKm: 0.48 },
  { id: "luxury", name: "Luxury Car", capacity: "3-4", icon: "🚙", pricePerKm: 0.32 },
  { id: "suv", name: "SUV", capacity: "5-7", icon: "🚙", pricePerKm: 0.42 },
];

const popularPackages = [
  {
    name: "Cultural Triangle",
    locations: ["Colombo", "Sigiriya", "Kandy"],
    icon: "🏛️",
  },
  {
    name: "Hill Country Tour",
    locations: ["Kandy", "Nuwara Eliya", "Ella"],
    icon: "⛰️",
  },
  {
    name: "Coastal Adventure",
    locations: ["Colombo", "Galle", "Mirissa"],
    icon: "🏖️",
  },
];

function App() {
  const [step, setStep] = useState(1);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [customSearch, setCustomSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    passengers: "1",
    date: "",
    time: "",
    vehicle: "sedan",
    notes: "",
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState(null);

  // Calculate distance between two coordinates using Haversine formula
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return Math.round(distance * 1.3); // Multiply by 1.3 to account for road distance
  };

  // Search locations
  const handleCustomSearch = (value) => {
    setCustomSearch(value);
    if (value.length > 1) {
      const results = sriLankaLocations.filter(loc =>
        loc.name.toLowerCase().includes(value.toLowerCase()) ||
        loc.description.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 8);
      setSearchResults(results);
      setShowSearchResults(true);
    } else {
      setSearchResults([]);
      setShowSearchResults(false);
    }
  };

  const selectSearchResult = (location) => {
    if (!selectedLocations.some(loc => loc.name === location.name)) {
      setSelectedLocations([...selectedLocations, location]);
    }
    setCustomSearch("");
    setSearchResults([]);
    setShowSearchResults(false);
  };

  // Calculate total distance
  const calculateTotalDistance = () => {
    if (selectedLocations.length < 2) return 0;
    let total = 0;
    for (let i = 0; i < selectedLocations.length - 1; i++) {
      const from = selectedLocations[i];
      const to = selectedLocations[i + 1];
      total += calculateDistance(from.lat, from.lng, to.lat, to.lng);
    }
    return total;
  };

  const totalDistance = calculateTotalDistance();
  const selectedVehicle = vehicleTypes.find(v => v.id === formData.vehicle);
  const pricePerKm = selectedVehicle ? selectedVehicle.pricePerKm : 0.29;
  const totalPrice = (totalDistance * pricePerKm).toFixed(2);

  // Get distance breakdown
  const getRouteBreakdown = () => {
    if (selectedLocations.length < 2) return [];
    const breakdown = [];
    const currentVehicle = vehicleTypes.find(v => v.id === formData.vehicle) || vehicleTypes[0];
    const rate = currentVehicle.pricePerKm;

    for (let i = 0; i < selectedLocations.length - 1; i++) {
      const from = selectedLocations[i];
      const to = selectedLocations[i + 1];
      const distance = calculateDistance(from.lat, from.lng, to.lat, to.lng);
      breakdown.push({
        from: from.name,
        to: to.name,
        distance,
        price: (distance * rate).toFixed(2)
      });
    }
    return breakdown;
  };

  // Add location from preset list
  const addLocation = (locationName) => {
    const location = sriLankaLocations.find(loc => loc.name === locationName);
    if (location && !selectedLocations.some(loc => loc.name === location.name)) {
      setSelectedLocations([...selectedLocations, location]);
    }
  };

  // Remove location
  const removeLocation = (index) => {
    setSelectedLocations(selectedLocations.filter((_, i) => i !== index));
  };

  // Reorder locations (drag and drop)
  const handleDragStart = (index) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (dropIndex) => {
    if (draggedIndex === null) return;
    const newLocations = [...selectedLocations];
    const [removed] = newLocations.splice(draggedIndex, 1);
    newLocations.splice(dropIndex, 0, removed);
    setSelectedLocations(newLocations);
    setDraggedIndex(null);
  };

  // Apply popular package
  const applyPackage = (pkg) => {
    const locations = pkg.locations.map(name =>
      sriLankaLocations.find(loc => loc.name === name)
    ).filter(Boolean);
    setSelectedLocations(locations);
  };

  // Generate Booking Message
  const generateBookingMessage = () => {
    const breakdown = getRouteBreakdown();
    let message = `🚗 *HASHI CAB TOUR BOOKING*\n\n`;
    message += `👤 *Customer Details:*\n`;
    message += `Name: ${formData.name}\n`;
    message += `Phone: ${formData.phone}\n`;
    message += `Email: ${formData.email}\n`;
    message += `Passengers: ${formData.passengers}\n\n`;
    message += `📅 *Tour Details:*\n`;
    message += `Date: ${formData.date}\n`;
    message += `Time: ${formData.time}\n`;
    message += `Vehicle: ${vehicleTypes.find((v) => v.id === formData.vehicle)?.name
      }\n\n`;
    message += `📍 *Tour Route:*\n`;
    selectedLocations.forEach((loc, i) => {
      message += `${i + 1}. ${loc.name}\n`;
    });
    message += `\n💰 *Pricing Breakdown (Vehicle: ${vehicleTypes.find((v) => v.id === formData.vehicle)?.name} @ $${vehicleTypes.find((v) => v.id === formData.vehicle)?.pricePerKm}/km):*\n`;
    breakdown.forEach((item) => {
      message += `${item.from} → ${item.to}: ${item.distance}km = $${item.price}\n`;
    });
    message += `\n*Total Distance:* ${totalDistance}km\n`;
    message += `*Total Price:* $${totalPrice}\n`;
    if (formData.notes) {
      message += `\n📝 *Special Requests:*\n${formData.notes}`;
    }
    return encodeURIComponent(message);
  };

  const sendToWhatsApp = () => {
    const message = generateBookingMessage();
    const whatsappUrl = `https://wa.me/94779424151?text=${message}`;
    setShowSuccess(true);
    setTimeout(() => {
      window.open(whatsappUrl, "_blank");
      setShowSuccess(false);
    }, 2000);
  };

  const sendToTelegram = () => {
    const message = generateBookingMessage();
    // Using t.me link format. Standard format is https://t.me/<username>?text=...
    // Assuming the number is registered as a username or contactable. 
    // If phone number specific link is needed: https://t.me/+94779424151
    // Usually standard is: https://t.me/HashiCab or similar if known, but falling back to sharing via potential phone number link
    // However, text parameter is not standard supported on direct contact links as robustly as WA.
    // Better strategy for Telegram web share: https://t.me/share/url?url=<url>&text=<text>
    // But we don't have a specific URL to share, just text.
    // Correct format for sending message to specific user via link with prefilled text is tricky on TG.
    // Best effort: https://t.me/+94779424151 (might not prefill text) 
    // OR generic share: https://t.me/share/url?url=https://hashicab.lk&text=<message>

    // Let's try the direct wa.me equivalent for TG which is less standard but often t.me/<number> works.
    // For text prefill, it's generally only supported for channel sharing or saved messages.
    // Alternate: Copy to clipboard and open TG.

    // Changing strategy: Use the generic share link which preserves text, but user has to pick contact.
    // url parameter is required, so we can put the site URL.
    const telegramUrl = `https://t.me/share/url?url=https://hashicab.com&text=${message}`;

    setShowSuccess(true);
    setTimeout(() => {
      window.open(telegramUrl, "_blank");
      setShowSuccess(false);
    }, 2000);
  };

  const popularDestinations = sriLankaLocations.filter(loc =>
    ["Colombo", "Kandy", "Galle", "Sigiriya", "Ella", "Nuwara Eliya",
      "Anuradhapura", "Trincomalee", "Jaffna", "Yala", "Matara", "Mirissa",
      "Bentota", "Polonnaruwa", "Arugam Bay"].includes(loc.name)
  );

  const filteredDestinations = popularDestinations.filter((d) =>
    d.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const isFormValid = () => {
    return (
      formData.name &&
      formData.phone &&
      formData.email &&
      formData.date &&
      formData.time
    );
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <style>{`
        @keyframes bounce-x {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(10px); }
        }
        .animate-bounce-x {
          animation: bounce-x 2s infinite;
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #FFD700, #DAA520);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #FFE44D, #FFD700);
        }
      `}</style>

      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnptLTEyIDEyYzMuMzE0IDAgNiAyLjY4NiA2IDZzLTIuNjg2IDYtNiA2LTYtMi42ODYtNi02IDIuNjg2LTYgNi02eiIgZmlsbD0iIzAwRkZGRiIgb3BhY2l0eT0iLjA1Ii8+PC9nPjwvc3ZnPg==')] opacity-30"></div>

        <div className="relative z-10 text-center px-4 animate-fade-in">
          <div className="mb-8 transform hover:scale-105 transition-transform duration-300">
            <div className="inline-block relative">
              <div className="absolute inset-0 bg-[#FFD700]/20 blur-xl rounded-full"></div>
              <img src={logo} alt="Hashi Cab Logo" className="relative h-48 md:h-64 object-contain drop-shadow-2xl rounded-2xl" />
            </div>
          </div>

          <p className="text-2xl md:text-4xl mb-4 font-light">
            Explore Sri Lanka in Style
          </p>
          <p className="text-lg md:text-xl mb-12 text-gray-400 max-w-2xl mx-auto font-light">
            Create your perfect tour itinerary with our interactive booking
            system. Visit any destination in Sri Lanka starting at just $0.29 per kilometer.
          </p>

          <button
            onClick={() =>
              document
                .getElementById("booking")
                .scrollIntoView({ behavior: "smooth" })
            }
            className="bg-gradient-to-r from-[#DAA520] to-[#FFD700] text-black px-12 py-4 rounded-full text-xl font-bold hover:shadow-2xl hover:shadow-[#FFD700]/50 transform hover:scale-105 transition-all duration-300 inline-flex items-center gap-2"
          >
            Start Booking <ChevronRight className="animate-bounce-x" />
          </button>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 hover:border-[#FFD700]/50 transition-all duration-300">
              <Shield className="mx-auto mb-4 text-[#FFD700]" size={40} />
              <h3 className="font-bold text-lg mb-2">Safe & Reliable</h3>
              <p className="text-gray-400 text-sm">
                Professional drivers with years of experience
              </p>
            </div>
            <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 hover:border-[#FFD700]/50 transition-all duration-300">
              <Award className="mx-auto mb-4 text-[#FFA500]" size={40} />
              <h3 className="font-bold text-lg mb-2">Best Rates</h3>
              <p className="text-gray-400 text-sm">
                Transparent pricing starting at $0.29/km
              </p>
            </div>
            <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 hover:border-[#FFD700]/50 transition-all duration-300">
              <Zap className="mx-auto mb-4 text-[#FFD700]" size={40} />
              <h3 className="font-bold text-lg mb-2">Instant Booking</h3>
              <p className="text-gray-400 text-sm">
                Book via WhatsApp in seconds
              </p>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronRight className="rotate-90 text-[#FFD700]" size={32} />
        </div>
      </div>

      {/* Booking Section */}
      <div id="booking" className="container mx-auto px-4 py-20">
        {/* Progress Steps */}
        <div className="flex justify-center mb-16">
          <div className="flex items-center gap-4 bg-white/5 backdrop-blur-lg rounded-full px-8 py-4 border border-white/10">
            {[1, 2, 3].map((s) => (
              <React.Fragment key={s}>
                <div
                  className={`flex items-center gap-2 ${step >= s ? "text-[#FFD700]" : "text-gray-500"
                    }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${step >= s
                      ? "bg-gradient-to-r from-[#DAA520] to-[#FFD700] text-black scale-110"
                      : "bg-gray-800 border border-gray-700"
                      }`}
                  >
                    {step > s ? <CheckCircle size={20} /> : s}
                  </div>
                  <span className="hidden md:inline font-semibold">
                    {s === 1
                      ? "Select Route"
                      : s === 2
                        ? "Your Details"
                        : "Confirm"}
                  </span>
                </div>
                {s < 3 && <ChevronRight className="text-gray-600" />}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Step 1: Location Selection */}
        {step === 1 && (
          <div className="max-w-6xl mx-auto animate-fade-in">
            <h2 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-[#FFA500] to-[#FFD700] text-transparent bg-clip-text">
              Plan Your Journey
            </h2>

            {/* Popular Packages */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <span className="text-2xl">⚡</span> Quick Select Packages
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {popularPackages.map((pkg) => (
                  <button
                    key={pkg.name}
                    onClick={() => applyPackage(pkg)}
                    className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-4 hover:border-[#FFD700] transition-all duration-300 hover:scale-105 text-left group"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-3xl">{pkg.icon}</span>
                      <div className="font-bold text-lg">{pkg.name}</div>
                    </div>
                    <div className="text-sm text-gray-400">
                      {pkg.locations.join(" → ")}
                    </div>
                    <div className="mt-2 text-[#FFD700] text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                      Click to apply →
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left: Destination Picker */}
              <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <MapPin className="text-[#FFA500]" /> Select Destinations
                </h3>

                {/* Custom Location Search */}
                <div className="mb-6 relative">
                  <label className="block text-sm font-semibold mb-2 text-[#FFD700] flex items-center gap-2">
                    <Navigation size={16} /> Search Any Location in Sri Lanka
                  </label>
                  <input
                    type="text"
                    value={customSearch}
                    onChange={(e) => handleCustomSearch(e.target.value)}
                    onFocus={() => customSearch && setShowSearchResults(true)}
                    placeholder="Type: Matara, Mirissa, Hikkaduwa..."
                    className="w-full bg-white/10 border border-[#FFD700]/50 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFD700]/30 transition-all"
                  />
                  <p className="text-xs text-gray-400 mt-2">
                    ✨ 100% Free - No API key needed! Search from 40+ locations
                  </p>

                  {/* Search Results Dropdown */}
                  {showSearchResults && searchResults.length > 0 && (
                    <div className="absolute z-50 w-full mt-2 bg-gray-900 border border-[#FFD700]/30 rounded-lg shadow-2xl max-h-64 overflow-y-auto custom-scrollbar">
                      {searchResults.map((result, index) => (
                        <button
                          key={index}
                          onClick={() => selectSearchResult(result)}
                          className="w-full text-left px-4 py-3 hover:bg-yellow-900/30 transition-colors border-b border-white/10 last:border-b-0"
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{result.image}</span>
                            <div>
                              <div className="font-bold text-white">{result.name}</div>
                              <div className="text-sm text-gray-400">{result.description}</div>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Popular Destinations Quick Add */}
                <div className="mb-4">
                  <div className="relative">
                    <Search
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={20}
                    />
                    <input
                      type="text"
                      placeholder="Or filter popular destinations..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full bg-white/10 border border-white/20 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-[#FFD700] transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-96 overflow-y-auto custom-scrollbar pr-2">
                  {filteredDestinations.map((dest) => (
                    <button
                      key={dest.name}
                      onClick={() => addLocation(dest.name)}
                      disabled={selectedLocations.some(loc => loc.name === dest.name)}
                      className={`bg-white/10 backdrop-blur-lg rounded-xl p-4 text-left transition-all duration-300 border ${selectedLocations.some(loc => loc.name === dest.name)
                        ? "border-green-500 opacity-50 cursor-not-allowed"
                        : "border-white/20 hover:border-[#FFD700] hover:scale-105"
                        }`}
                    >
                      <div className="text-3xl mb-2">{dest.image}</div>
                      <div className="font-bold">{dest.name}</div>
                      <div className="text-sm text-gray-400">
                        {dest.description}
                      </div>
                      {selectedLocations.some(loc => loc.name === dest.name) && (
                        <div className="mt-2 text-[#FFD700] text-sm flex items-center gap-1">
                          <CheckCircle size={16} /> Added
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Right: Selected Route */}
              <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <MapPin className="text-[#FFD700]" /> Your Route
                </h3>

                {selectedLocations.length === 0 ? (
                  <div className="text-center py-12 text-gray-400">
                    <MapPin size={48} className="mx-auto mb-4 opacity-30" />
                    <p>Select destinations to build your route</p>
                    <p className="text-sm mt-2">
                      Use search above for any location
                    </p>
                    <p className="text-sm">or quick-select from popular destinations</p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-2 mb-6 max-h-64 overflow-y-auto custom-scrollbar pr-2">
                      {selectedLocations.map((loc, index) => (
                        <div
                          key={index}
                          draggable
                          onDragStart={() => handleDragStart(index)}
                          onDragOver={handleDragOver}
                          onDrop={() => handleDrop(index)}
                          className="bg-white/10 backdrop-blur-lg rounded-lg p-4 flex items-center gap-3 cursor-move hover:bg-white/15 transition-all border border-white/10 hover:border-[#FFD700]"
                        >
                          <GripVertical size={20} className="text-gray-400" />
                          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#DAA520] to-yellow-500 flex items-center justify-center font-bold flex-shrink-0">
                            {index + 1}
                          </div>
                          <div className="flex-1 font-semibold">{loc.name}</div>
                          <button
                            onClick={() => removeLocation(index)}
                            className="text-[#FFA500] hover:text-red-300 transition-colors flex-shrink-0"
                          >
                            <X size={20} />
                          </button>
                        </div>
                      ))}
                    </div>

                    {/* Price Calculation */}
                    {selectedLocations.length >= 2 && (
                      <div className="bg-gradient-to-r from-red-900/30 to-cyan-900/30 rounded-xl p-6 border border-[#FFD700]/30">
                        <h4 className="font-bold mb-3 flex items-center gap-2">
                          <DollarSign className="text-[#FFD700]" /> Price
                          Breakdown
                        </h4>
                        <div className="space-y-2 mb-4 text-sm max-h-40 overflow-y-auto custom-scrollbar">
                          {getRouteBreakdown().map((item, i) => (
                            <div
                              key={i}
                              className="flex justify-between items-center py-2 border-b border-white/10"
                            >
                              <span className="text-gray-300">
                                {item.from} → {item.to}
                              </span>
                              <span className="font-mono text-xs md:text-sm">
                                {item.distance}km × ${vehicleTypes.find(v => v.id === formData.vehicle)?.pricePerKm} ={" "}
                                <span className="text-[#FFD700] font-bold">
                                  ${item.price}
                                </span>
                              </span>
                            </div>
                          ))}
                        </div>
                        <div className="flex justify-between items-center pt-4 border-t border-white/20">
                          <div>
                            <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-[#FFD700]">
                              ${totalPrice}
                            </div>
                            <div className="text-sm text-gray-400">
                              {totalDistance}km total
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-2 text-gray-400 text-sm">
                              <Clock size={16} />~
                              {Math.round(totalDistance / 50)}h drive
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}

                {selectedLocations.length >= 2 && (
                  <button
                    onClick={() => setStep(2)}
                    className="w-full mt-6 bg-gradient-to-r from-[#DAA520] to-[#FFD700] text-black py-4 rounded-xl font-bold hover:shadow-2xl hover:shadow-[#FFD700]/50 transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    Continue to Details <ChevronRight />
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Step 2: User Details */}
        {step === 2 && (
          <div className="max-w-3xl mx-auto animate-fade-in">
            <h2 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-[#FFA500] to-[#FFD700] text-transparent bg-clip-text">
              Your Details
            </h2>

            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-300 flex items-center gap-2">
                    <Users size={16} /> Full Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#FFD700] transition-all"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-300 flex items-center gap-2">
                    <Phone size={16} /> Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#FFD700] transition-all"
                    placeholder="+94 123 456 789"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-300 flex items-center gap-2">
                    <Mail size={16} /> Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#FFD700] transition-all"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-300 flex items-center gap-2">
                    <Users size={16} /> Number of Passengers *
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={formData.passengers}
                    onChange={(e) =>
                      setFormData({ ...formData, passengers: e.target.value })
                    }
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#FFD700] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-300 flex items-center gap-2">
                    <Calendar size={16} /> Tour Date *
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#FFD700] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-300 flex items-center gap-2">
                    <Clock size={16} /> Start Time *
                  </label>
                  <input
                    type="time"
                    value={formData.time}
                    onChange={(e) =>
                      setFormData({ ...formData, time: e.target.value })
                    }
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#FFD700] transition-all"
                  />
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-semibold mb-3 text-gray-300 flex items-center gap-2">
                  <Car size={16} /> Vehicle Type
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {vehicleTypes.map((vehicle) => (
                    <button
                      key={vehicle.id}
                      onClick={() =>
                        setFormData({ ...formData, vehicle: vehicle.id })
                      }
                      className={`bg-white/10 backdrop-blur-lg rounded-xl p-4 text-center transition-all duration-300 border ${formData.vehicle === vehicle.id
                        ? "border-[#FFD700] scale-105 shadow-lg shadow-[#FFD700]/30 bg-yellow-900/20"
                        : "border-white/20 hover:border-[#FFD700]/50"
                        }`}
                    >
                      <div className="text-3xl mb-2">{vehicle.icon}</div>
                      <div className="font-bold text-sm text-yellow-100">{vehicle.name}</div>
                      <div className="text-xs text-[#FFD700] font-mono mt-1">${vehicle.pricePerKm}/km</div>
                      <div className="text-xs text-gray-400 mt-1">
                        {vehicle.capacity} seats
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-semibold mb-2 text-gray-300">
                  Special Requests (Optional)
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData({ ...formData, notes: e.target.value })
                  }
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#FFD700] transition-all resize-none custom-scrollbar"
                  rows="4"
                  placeholder="Any special requirements or preferences..."
                ></textarea>
              </div>

              <div className="flex gap-4 mt-8">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 bg-white/10 border border-white/20 text-white py-4 rounded-xl font-bold hover:bg-white/20 transition-all duration-300"
                >
                  ← Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  disabled={!isFormValid()}
                  className={`flex-1 py-4 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 ${isFormValid()
                    ? "bg-gradient-to-r from-[#DAA520] to-[#FFD700] text-black hover:shadow-2xl hover:shadow-[#FFD700]/50 transform hover:scale-105"
                    : "bg-gray-800 text-gray-500 cursor-not-allowed"
                    }`}
                >
                  Review Booking <ChevronRight />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Confirmation */}
        {step === 3 && (
          <div className="max-w-3xl mx-auto animate-fade-in">
            <h2 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-[#FFA500] to-[#FFD700] text-transparent bg-clip-text">
              Review Your Booking
            </h2>

            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 mb-6">
              {/* Customer Details */}
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-[#FFD700]">
                  <Users /> Customer Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white/5 rounded-xl p-6">
                  <div>
                    <div className="text-gray-400 text-sm mb-1">Name</div>
                    <div className="font-semibold">{formData.name}</div>
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm mb-1">Phone</div>
                    <div className="font-semibold">{formData.phone}</div>
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm mb-1">Email</div>
                    <div className="font-semibold">{formData.email}</div>
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm mb-1">Passengers</div>
                    <div className="font-semibold">
                      {formData.passengers} people
                    </div>
                  </div>
                </div>
              </div>

              {/* Tour Details */}
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-[#FFA500]">
                  <Calendar /> Tour Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white/5 rounded-xl p-6">
                  <div>
                    <div className="text-gray-400 text-sm mb-1">Date</div>
                    <div className="font-semibold">{formData.date}</div>
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm mb-1">Time</div>
                    <div className="font-semibold">{formData.time}</div>
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm mb-1">Vehicle</div>
                    <div className="font-semibold">
                      {
                        vehicleTypes.find((v) => v.id === formData.vehicle)
                          ?.name
                      }
                    </div>
                  </div>
                </div>
              </div>

              {/* Route */}
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-[#FFD700]">
                  <MapPin /> Your Route
                </h3>
                <div className="bg-white/5 rounded-xl p-6">
                  <div className="space-y-3">
                    {selectedLocations.map((loc, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#DAA520] to-[#FFA500] flex items-center justify-center font-bold flex-shrink-0">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <div className="font-bold">{loc.name}</div>
                          {index < selectedLocations.length - 1 && (
                            <div className="text-sm text-gray-400 mt-1">
                              ↓{" "}
                              {calculateDistance(
                                loc.lat,
                                loc.lng,
                                selectedLocations[index + 1].lat,
                                selectedLocations[index + 1].lng
                              )}
                              km to {selectedLocations[index + 1].name}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Pricing */}
              <div>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-[#FFD700]">
                  <DollarSign /> Pricing Summary
                </h3>
                <div className="bg-gradient-to-r from-[#DAA520]/10 to-black/30 rounded-xl p-6 border border-[#FFD700]/30">
                  <div className="space-y-2 mb-4">
                    {getRouteBreakdown().map((item, i) => (
                      <div
                        key={i}
                        className="flex justify-between items-center py-2 border-b border-white/10"
                      >
                        <span className="text-gray-300 text-sm">
                          {item.from} → {item.to}
                        </span>
                        <span className="font-mono text-sm">
                          {item.distance}km × ${vehicleTypes.find(v => v.id === formData.vehicle)?.pricePerKm} ={" "}
                          <span className="text-[#FFD700] font-bold">
                            ${item.price}
                          </span>
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t-2 border-white/30">
                    <div>
                      <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FFA500] to-[#FFD700]">
                        ${totalPrice}
                      </div>
                      <div className="text-sm text-gray-400">
                        {totalDistance}km total distance
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2 text-gray-400">
                        <Clock size={20} />
                        <span className="text-lg font-semibold">
                          ~{Math.round(totalDistance / 50)}h
                        </span>
                      </div>
                      <div className="text-sm text-gray-400">
                        estimated travel
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {formData.notes && (
                <div className="mt-6 bg-white/5 rounded-xl p-6">
                  <h4 className="font-bold mb-2 text-gray-300">
                    Special Requests:
                  </h4>
                  <p className="text-gray-400">{formData.notes}</p>
                </div>
              )}
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setStep(2)}
                className="flex-1 bg-white/10 border border-white/20 text-white py-4 rounded-xl font-bold hover:bg-white/20 transition-all duration-300"
              >
                ← Edit Details
              </button>
              <button
                onClick={sendToWhatsApp}
                className="flex-1 bg-gradient-to-r from-green-600 to-green-400 text-white py-4 rounded-xl font-bold hover:shadow-2xl hover:shadow-green-500/50 transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <MessageCircle /> WhatsApp
              </button>
              <button
                onClick={sendToTelegram}
                className="flex-1 bg-gradient-to-r from-blue-500 to-blue-400 text-white py-4 rounded-xl font-bold hover:shadow-2xl hover:shadow-blue-500/50 transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Send size={20} /> Telegram
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Popular Destinations Gallery */}
      <div className="bg-gradient-to-b from-black via-red-900/20 to-black py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-4 text-center bg-gradient-to-r from-[#FFA500] to-[#FFD700] text-transparent bg-clip-text">
            Popular Destinations
          </h2>
          <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
            Discover the beauty of Sri Lanka with our curated selection of
            must-visit destinations
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {popularDestinations.map((dest, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-[#FFD700] transition-all duration-300 hover:scale-105 text-center group cursor-pointer"
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                  {dest.image}
                </div>
                <h3 className="font-bold text-lg mb-1">{dest.name}</h3>
                <p className="text-gray-400 text-sm">{dest.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="bg-gradient-to-b from-black via-gray-900 to-black py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-[#FFA500] to-[#FFD700] text-transparent bg-clip-text">
              Why Choose HASHI CAB?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:border-[#FFD700]/50 transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-[#DAA520] to-[#FFD700] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star size={32} />
                </div>
                <h3 className="text-xl font-bold mb-3">5+ Years Experience</h3>
                <p className="text-gray-400">
                  Professional service with experienced drivers who know Sri
                  Lanka inside out
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:border-[#FFD700]/50 transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-[#DAA520] to-[#FFD700] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield size={32} />
                </div>
                <h3 className="text-xl font-bold mb-3">100% Safe</h3>
                <p className="text-gray-400">
                  Fully insured vehicles and verified drivers for your peace of
                  mind
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:border-[#FFD700]/50 transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-[#DAA520] to-[#FFD700] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award size={32} />
                </div>
                <h3 className="text-xl font-bold mb-3">Best Value</h3>
                <p className="text-gray-400">
                  Transparent pricing with no hidden costs. Starting from $0.29 per
                  kilometer
                </p>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
              <p className="text-lg text-gray-300 leading-relaxed">
                HASHI CAB is your trusted partner for exploring the beautiful
                island of Sri Lanka. With our easy-to-use booking system,
                competitive pricing, and commitment to excellence, we make your
                journey comfortable, safe, and memorable. Whether you're
                visiting ancient temples, pristine beaches, or scenic mountains,
                we'll get you there in style.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black border-t border-white/10 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-[#DAA520] to-[#FFD700] text-transparent bg-clip-text">
                HASHI CAB
              </h3>
              <p className="text-gray-400 mb-4">
                Your reliable partner for exploring Sri Lanka. Book your perfect
                tour today!
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-lg">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <button
                    onClick={() =>
                      document
                        .getElementById("booking")
                        .scrollIntoView({ behavior: "smooth" })
                    }
                    className="hover:text-[#FFD700] transition-colors"
                  >
                    Book Now
                  </button>
                </li>
                <li>
                  <a href="#" className="hover:text-[#FFD700] transition-colors">
                    Popular Routes
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#FFD700] transition-colors">
                    Destinations
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#FFD700] transition-colors">
                    About Us
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-lg">Contact Us</h4>
              <ul className="space-y-3 text-gray-400">
                <li className="flex items-center gap-3">
                  <Phone size={18} className="text-[#FFD700]" />
                  <span>+94 77 942 4151</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail size={18} className="text-[#FFD700]" />
                  <span>info@hashicab.lk</span>
                </li>
                <li className="flex items-center gap-3">
                  <MapPin size={18} className="text-[#FFD700]" />
                  <span>Colombo, Sri Lanka</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 text-center text-gray-400">
            <p>
              &copy; {new Date().getFullYear()} HASHI CAB. All rights reserved.
              Made with ❤️ in Sri Lanka
            </p>
          </div>
        </div>
      </footer>

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-gradient-to-br from-zinc-900 to-black rounded-2xl p-8 max-w-md mx-4 border border-[#FFD700] shadow-2xl shadow-[#FFD700]/50 transform scale-110">
            <div className="text-center">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                <CheckCircle size={40} />
              </div>
              <h3 className="text-2xl font-bold mb-2">Booking Confirmed!</h3>
              <p className="text-gray-300 mb-4">Redirecting to WhatsApp...</p>
              <div className="animate-pulse text-[#FFD700]">
                <MessageCircle size={32} className="mx-auto" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;