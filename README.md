# Value Vehicles Showroom V17 Inspect Pills

## V17 fixes
- Removed old inspect silhouette/orb/hotspot system from the real user flow.
- Added premium Inspect Vehicle video pills.
- Clicking an inspect pill switches the main landscape player to that section clip.
- If a clip is missing from inspectVideos, that pill does not show.
- Added reusable PremiumVideo component for stable autoplay.
- Homepage videos retry playback on pageshow, visibilitychange and focus.
- Removed fake poster/ghost car loading layers.
- Removed native video controls.
- Homepage portrait cards are cleaner: title, price, enter showroom only.
- Correct Value Vehicles phone number: 01206 413177.
- Correct WhatsApp number: 07939885608.
- Mobile has quick shortcut icons: Inspect, Details, Ask, Call.
- Mobile landscape video uses blurred cinematic background + sharp landscape foreground.

## Cloudinary
Replace local video paths in data/cars.js with Cloudinary URLs.
