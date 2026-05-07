# Value Vehicles Showroom V13 Premium

## V13 fixes
- Removed the Interactive Walkaround pill completely.
- Clean View now hides header, side panels, overlay, gradients and bottom dock.
- Clean View leaves only small Show Details + Inspect controls.
- Desktop side panel now has max-height and scroll so it fits on Mac.
- Mobile car page now has Details / Ask / Inspect below the video, so users can scroll to them.
- Inspect button now uses a clear search/magnifier icon, not an unclear orb.
- Homepage keeps purple Value Vehicles gradient atmosphere.
- Inspect car image remains neutral and universal.

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
