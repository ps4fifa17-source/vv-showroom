import "./globals.css";

export const metadata = {
  title: "Value Vehicles | Digital Showroom",
  description: "Premium video-first showroom.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
