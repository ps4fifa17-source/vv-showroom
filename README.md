# Value Vehicles Showroom V18 Mobile Fix

## V18 fixes
- Mobile bottom dock is now navigation: Cinema, Inspect, Details, Ask, Call.
- Inspect on mobile scrolls to the Inspect section.
- Clean View / Cinema hides the UI and keeps only Show Details + Inspect.
- In Clean View, Inspect opens a popup menu and keeps cinema view active after selecting a clip.
- Active inspect pill is tracked by label, not video URL.
- Mobile clean view uses contain video so landscape can be seen fully.
- Buttons use proper button type and higher z-index.
- Correct numbers remain: Call 01206 413177, WhatsApp 07939885608.

## Cloudinary
Replace local video paths in data/cars.js with Cloudinary URLs.
