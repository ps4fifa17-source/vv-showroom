export const dealership = {
  name: "Value Vehicles",
  phone: "01621 928100",
  whatsapp: "01621928100",
  logo: "",
  accent: "#732b97",
  accent2: "#b85cff",
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
    details: [["Mileage","TBC"],["Fuel","TBC"],["Gearbox","TBC"],["Body","SUV"]],
    hotspots: [
      { label: "Front", time: 0, x: 16, y: 58 },
      { label: "Wheels", time: 18, x: 41, y: 73 },
      { label: "Interior", time: 35, x: 50, y: 42 },
      { label: "Rear", time: 65, x: 84, y: 58 },
      { label: "Condition", time: 95, x: 65, y: 52 }
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
    details: [["Mileage","TBC"],["Fuel","Petrol"],["Gearbox","TBC"],["Body","Hatchback"]],
    hotspots: [
      { label: "Front", time: 0, x: 16, y: 58 },
      { label: "Wheels", time: 18, x: 41, y: 73 },
      { label: "Interior", time: 35, x: 50, y: 42 },
      { label: "Rear", time: 65, x: 84, y: 58 },
      { label: "Condition", time: 95, x: 65, y: 52 }
    ]
  }
];

export function getCar(slug) {
  return cars.find((car) => car.slug === slug);
}
