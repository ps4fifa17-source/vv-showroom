import Link from "next/link";
import { dealership } from "../data/cars";

export default function Header() {
  return (
    <header className="header" style={{ "--accent": dealership.accent, "--accent2": dealership.accent2 }}>
      <div className="header-inner">
        <Link href="/" aria-label="Home">
          {dealership.logo ? <img src={dealership.logo} alt={dealership.name} className="logo-img" /> : <div className="logo-waiting">Add logo</div>}
        </Link>
        <a className="call-btn" href={`tel:${dealership.phone.replaceAll(" ", "")}`}>Call</a>
      </div>
    </header>
  );
}
