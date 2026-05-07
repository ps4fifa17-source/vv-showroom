import Header from "../../../components/Header";
import Showroom from "../../../components/Showroom";
import { cars, getCar } from "../../../data/cars";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return cars.map((car) => ({ slug: car.slug }));
}

export default function CarPage({ params }) {
  const car = getCar(params.slug);
  if (!car) notFound();
  return <><Header /><Showroom car={car} /></>;
}
