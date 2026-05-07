import Header from "../components/Header";
import PortraitCard from "../components/PortraitCard";
import PremiumVideo from "../components/PremiumVideo";
import { cars, dealership } from "../data/cars";

export default function Home() {
  const heroVideo = cars[0]?.teaserVideo || "/videos/sample-portrait.mp4";
  return (
    <>
      <Header />
      <main style={{ "--accent": dealership.accent, "--accent2": dealership.accent2 }}>
        <section className="home-hero">
          <PremiumVideo src={heroVideo} className="home-video" />
          <div className="home-fade" />
          <div className="home-copy">
            <h1>{dealership.tagline}</h1>
            <p>Portrait previews, full walkarounds and interactive vehicle inspection.</p>
            <a href="#stock">View stock</a>
          </div>
        </section>
        <section id="stock" className="stock">
          <div className="stock-head"><h2>Video stock</h2><p>{cars.length} shown</p></div>
          <div className="stock-grid">{cars.map((car) => <PortraitCard key={car.slug} car={car} />)}</div>
        </section>
      </main>
    </>
  );
}
