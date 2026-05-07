# Value Vehicles Showroom V14 Calibrated

## V14 fixes
- Added /calibrate page to accurately drag hotspot dots onto the inspect image.
- Inspect mode uses one fixed image wrapper, so dot coordinates behave consistently on Mac and phone.
- Inspect opens with car visible immediately on mobile. No scrolling to find it.
- Clean View is now a real page-level mode. It hides the header, overlays, gradients and bottom dock.
- Mobile still has Details / Ask / Inspect underneath the video page when not in clean mode.
- Desktop side panel scrolls if there is not enough height.

## Calibrate hotspots
Open:
/calibrate

Drag the dots onto the car.
Copy the code into data/cars.js.

## Replace inspect car
public/images/inspect-car.png

## Add logo
public/images/value-logo.png
Then in data/cars.js set:
logo: "/images/value-logo.png"

## Upload to GitHub
Upload:
app
components
data
public
package.json
next.config.js
README.md

Do not upload node_modules.
