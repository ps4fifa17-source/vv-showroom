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
          <PremiumVideo src={heroVideo} wrapperClassName="home-video-wrap" />
          <div className="container">
            <div className="hero-content">
              <h1 className="home-title">{dealership.tagline}</h1>
              <p className="home-sub">Portrait previews, full walkarounds and interactive vehicle inspection.</p>
              <div className="home-actions">
                <a className="btn btn-accent" href="#stock">View stock</a>
                <a className="btn btn-glass" href={`tel:${dealership.phone.replaceAll(" ", "")}`}>{dealership.phone}</a>
              </div>
            </div>
          </div>
        </section>
        <section id="stock" className="feed-zone">
          <div className="container">
            <div className="feed-head">
              <div><h2>Video stock</h2><p className="muted">Tap a portrait space to enter the showroom.</p></div>
              <p className="muted">{cars.length} shown</p>
            </div>
            <div className="portrait-rail">{cars.map((car) => <PortraitCard key={car.slug} car={car} />)}</div>
          </div>
        </section>
      </main>
    </>
  );
}
