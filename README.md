# Value Vehicles Showroom V15 Clean Inspect

## V15 fixes
- Clean View now applies a body-level class, so it hides the whole interface including the header.
- Clean View removes native video controls while active.
- Clean View makes the video fixed fullscreen.
- Includes an auto-cleaned transparent inspect-car.png placeholder.
- Inspect frame no longer shows a black rectangle if the image has transparency.
- Calibration page remains at /calibrate for dot placement.

## Important
If you replace inspect-car.png with a normal image that has a black background, the black box will return.
You need a true transparent PNG: car only, transparent background.

## Calibrate hotspots
Open:
/calibrate

Drag dots and copy code into data/cars.js.

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
