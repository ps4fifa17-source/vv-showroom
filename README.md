# Value Vehicles Showroom V9

## Fixes from V8
- Front page fades down into stock again.
- Car page has been fully refreshed.
- No Jump To section.
- Overlay writing/details sits over the video.
- Clean Video button hides the interface properly.
- Inspect renamed to Choose Viewing Area / Open Viewer.
- Inspection graphic is larger.
- Hotspots simplified and repositioned.
- Logo area still waits for your real VV logo.

## Run

npm install
npm run dev

## Add logo

Put your logo in:
public/images/value-logo.png

Then in data/cars.js change:
logo: ""

to:
logo: "/images/value-logo.png"
