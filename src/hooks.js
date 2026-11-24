import { useEffect, useRef, useState } from "react";
import { googleReviews } from "./data/reviews";

// Adds `is-in` to every `.reveal` element once it scrolls into view.
export function useRevealOnScroll() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal:not(.is-in)");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  });
}

export function useScrolled(offset = 24) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > offset);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, [offset]);
  return scrolled;
}

// Reviews: live from Google Places API (New) when env keys exist, else the local file.
export function useGoogleReviews() {
  const [data, setData] = useState({ ...googleReviews, source: "local" });
  const done = useRef(false);

  useEffect(() => {
    const key = import.meta.env.VITE_GOOGLE_PLACES_KEY;
    const placeId = import.meta.env.VITE_GOOGLE_PLACE_ID;
    if (!key || !placeId || done.current) return;
    done.current = true;

    fetch(
      `https://places.googleapis.com/v1/places/${placeId}?fields=rating,userRatingCount,reviews&key=${key}`
    )
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((p) => {
        const live = (p.reviews || []).map((r) => ({
          name: r.authorAttribution?.displayName || "Google user",
          photo: r.authorAttribution?.photoUri,
          url: r.authorAttribution?.uri,
          rating: r.rating,
          date: r.relativePublishTimeDescription,
          text: r.text?.text || r.originalText?.text || "",
        }));
        setData({
          rating: p.rating ?? googleReviews.rating,
          total: p.userRatingCount ?? googleReviews.total,
          reviews: live.length ? live : googleReviews.reviews,
          source: "google",
        });
      })
      .catch(() => {});
  }, []);

  return data;
}
