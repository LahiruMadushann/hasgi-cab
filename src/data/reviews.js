/*
 * GOOGLE REVIEWS
 * ---------------------------------------------------------------
 * Option A — paste your real reviews (no setup needed):
 *   Open your Google review link, copy a few reviews and add them below.
 *   Also fill in `rating` and `total` with the numbers Google shows.
 *
 *   Example entry:
 *   {
 *     name: "Reviewer name",
 *     rating: 5,
 *     date: "2 weeks ago",
 *     text: "Review text exactly as written on Google.",
 *   },
 *
 * Option B — load them live from Google:
 *   Create a `.env` file in the project root with:
 *     VITE_GOOGLE_PLACES_KEY=your_google_places_api_key
 *     VITE_GOOGLE_PLACE_ID=your_place_id   (looks like ChIJ...)
 *   The site then loads rating, count and up to 5 latest reviews
 *   from the Google Places API, and falls back to this file if it fails.
 *   Restrict the key to your website's domain in Google Cloud Console.
 */
export const googleReviews = {
  rating: null, // e.g. 5.0
  total: null, // e.g. 48
  reviews: [],
};
