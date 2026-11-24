import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Booking from "./components/Booking";
import Reviews from "./components/Reviews";
import { PopularRoutes, FAQ } from "./components/SeoSections";
import Footer, { FloatingWhatsApp } from "./components/Footer";
import { Ticker, HowItWorks, Fleet, Destinations, About, FinalCTA } from "./components/Sections";
import { useGoogleReviews, useRevealOnScroll } from "./hooks";

export default function App() {
  const reviews = useGoogleReviews();
  useRevealOnScroll();

  return (
    <div className="grain min-h-screen overflow-x-clip">
      <Navbar />
      <main>
        <Hero rating={reviews.rating} />
        <Ticker />
        <Booking />
        <HowItWorks />
        <Fleet />
        <Destinations />
        <PopularRoutes />
        <Reviews data={reviews} />
        <About />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
