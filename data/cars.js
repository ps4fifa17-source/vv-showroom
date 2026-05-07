export const dealership = {
  name: "Value Vehicles",
  phone: "01621 928100",
  whatsapp: "01621928100",
  location: "Essex",

  // Add your real logo file later:
  // public/images/value-logo.png
  // then set logo to "/images/value-logo.png"
  logo: "/images/value-logo.png",

  tagline: "Step inside the car before you visit.",
};

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
    teaserVideo: "/videos/sample-portrait.mp4",
    walkaroundVideo: "/videos/sample-landscape.mp4",
    poster: "/images/sample-poster.svg",
    oneLine: "Full walkaround ready to view.",
    details: [
      ["Mileage", "TBC"],
      ["Fuel", "TBC"],
      ["Gearbox", "TBC"],
      ["Body", "SUV"]
    ],
    hotspots: [
      { label: "Front", time: 0, x: 18, y: 59 },
      { label: "Wheels", time: 18, x: 47, y: 71 },
      { label: "Interior", time: 35, x: 58, y: 45 },
      { label: "Boot", time: 65, x: 81, y: 57 },
      { label: "Startup", time: 80, x: 53, y: 61 },
      { label: "Condition", time: 95, x: 35, y: 52 }
    ]
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
    oneLine: "Video-first showroom page.",
    details: [
      ["Mileage", "TBC"],
      ["Fuel", "Petrol"],
      ["Gearbox", "TBC"],
      ["Body", "Hatchback"]
    ],
    hotspots: [
      { label: "Front", time: 0, x: 18, y: 59 },
      { label: "Wheels", time: 18, x: 47, y: 71 },
      { label: "Interior", time: 35, x: 58, y: 45 },
      { label: "Boot", time: 65, x: 81, y: 57 },
      { label: "Startup", time: 80, x: 53, y: 61 },
      { label: "Condition", time: 95, x: 35, y: 52 }
    ]
  }
];

export function getCar(slug) {
  return cars.find((car) => car.slug === slug);
}
