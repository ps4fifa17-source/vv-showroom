export const dealership = {
  name: "Value Vehicles",
  phone: "01206 413177",
  whatsapp: "07939885608",
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
    details: [["Mileage","TBC"],["Fuel","TBC"],["Gearbox","TBC"],["Body","SUV"]],
    inspectVideos: [
      { label: "Interior", icon: "seat", video: "/videos/sample-landscape.mp4", preview: "/videos/sample-portrait.mp4" },
      { label: "Wheels", icon: "wheel", video: "/videos/sample-landscape.mp4", preview: "/videos/sample-portrait.mp4" },
      { label: "Front", icon: "front", video: "/videos/sample-landscape.mp4", preview: "/videos/sample-portrait.mp4" },
      { label: "Rear", icon: "rear", video: "/videos/sample-landscape.mp4", preview: "/videos/sample-portrait.mp4" },
      { label: "Condition", icon: "shield", video: "/videos/sample-landscape.mp4", preview: "/videos/sample-portrait.mp4" }
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
    details: [["Mileage","TBC"],["Fuel","Petrol"],["Gearbox","TBC"],["Body","Hatchback"]],
    inspectVideos: [
      { label: "Interior", icon: "seat", video: "/videos/sample-landscape.mp4", preview: "/videos/sample-portrait.mp4" },
      { label: "Wheels", icon: "wheel", video: "/videos/sample-landscape.mp4", preview: "/videos/sample-portrait.mp4" },
      { label: "Front", icon: "front", video: "/videos/sample-landscape.mp4", preview: "/videos/sample-portrait.mp4" },
      { label: "Rear", icon: "rear", video: "/videos/sample-landscape.mp4", preview: "/videos/sample-portrait.mp4" },
      { label: "Condition", icon: "shield", video: "/videos/sample-landscape.mp4", preview: "/videos/sample-portrait.mp4" }
    ]
  }
];

export function getCar(slug) {
  return cars.find((car) => car.slug === slug);
}
