import Link from "next/link";
import { dealership } from "../data/cars";

export default function Header() {
  return (
    <header className="header" style={{ "--accent": dealership.accent }}>
      <div className="container header-inner">
        <Link href="/" aria-label="Home">
          {dealership.logo ? <img src={dealership.logo} alt={dealership.name} className="logo-img" /> : <div className="logo-waiting">Add logo</div>}
        </Link>
        <div className="nav-actions">
          <a className="btn btn-glass desktop-only" href="/#stock">Stock</a>
          <a className="btn btn-white" href={`tel:${dealership.phone.replaceAll(" ", "")}`}>Call</a>
        </div>
      </div>
    </header>
  );
}
