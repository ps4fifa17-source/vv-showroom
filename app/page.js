import Header from "../components/Header";
import PortraitCard from "../components/PortraitCard";
import { cars, dealership } from "../data/cars";

export default function Home() {
  const heroVideo = cars[0]?.teaserVideo || "/videos/sample-portrait.mp4";

  return (
    <>
      <Header />
      <main>
        <section className="home-hero">
          <video className="home-hero-video" src={heroVideo} autoPlay muted loop playsInline preload="metadata" />
          <div className="container">
            <div className="hero-content">
              <span className="kicker"><span className="live-dot" /> {dealership.location} video showroom</span>
              <h1 className="home-title">{dealership.tagline}</h1>
              <p className="home-sub">Portrait previews, full walkarounds and interactive viewing areas. Built for mobile-first vehicle viewing.</p>
              <div className="home-actions">
                <a className="btn btn-purple" href="#stock">View stock</a>
                <a className="btn btn-glass" href={`tel:${dealership.phone.replaceAll(" ", "")}`}>{dealership.phone}</a>
              </div>
            </div>
          </div>
        </section>

        <section id="stock" className="feed-zone">
          <div className="container">
            <div className="feed-head">
              <div>
                <h2>Video stock</h2>
                <p className="muted">Tap a portrait space to enter the showroom.</p>
              </div>
              <p className="muted">{cars.length} shown</p>
            </div>
            <div className="portrait-rail">
              {cars.map((car) => <PortraitCard key={car.slug} car={car} />)}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
