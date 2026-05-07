export const dealership = {
  name: "Value Vehicles",
  phone: "01621 928100",
  whatsapp: "01621928100",
  logo: "/images/value-logo.png",
  accent: "#732b97",
  accent2: "#b85cff",
  tagline: "Step inside the car before you visit.",
};

export const defaultHotspots = [
  { label: "Front", time: 0, x: 17, y: 56 },
  { label: "Wheels", time: 18, x: 33, y: 58 },
  { label: "Interior", time: 35, x: 50, y: 47 },
  { label: "Rear", time: 65, x: 82, y: 56 },
  { label: "Condition", time: 95, x: 61, y: 56 }
];

export const cars = [
  {
    slug: "hyundai-tucson",
    title: "Hyundai Tucson",
    price: "£POA",
    mileage: "Mileage TBC",
    fuel: "Fuel TBC",
    gearbox: "Gearbox TBC",
    body: "SUV",
    status: "Available",
    teaserVideo: "https://res.cloudinary.com/ddtyeuc0u/video/upload/q_auto/f_auto/v1778163604/sample-portrait_f0w6hk.mp4",
    walkaroundVideo: "https://res.cloudinary.com/ddtyeuc0u/video/upload/q_auto/f_auto/v1778163742/lanscape-sample_gk4fqy.mp4",
    poster: "/images/sample-poster.svg",
    details: [["Mileage","TBC"],["Fuel","TBC"],["Gearbox","TBC"],["Body","SUV"]],
    hotspots: defaultHotspots
  },
  {
    slug: "subaru-impreza",
    title: "Subaru Impreza",
    price: "£POA",
    mileage: "Mileage TBC",
    fuel: "Petrol",
    gearbox: "TBC",
    body: "Hatchback",
    status: "Available",
    teaserVideo: "/videos/sample-portrait.mp4",
    walkaroundVideo: "/videos/sample-landscape.mp4",
    poster: "/images/sample-poster.svg",
    details: [["Mileage","TBC"],["Fuel","Petrol"],["Gearbox","TBC"],["Body","Hatchback"]],
    hotspots: defaultHotspots
  }
];

export function getCar(slug) {
  return cars.find((car) => car.slug === slug);
}
