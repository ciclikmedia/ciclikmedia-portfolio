import Hero from "@/sections/Hero/Hero";
import SelectedWork from "@/sections/Work/SelectedWork";
import SelectedBrands from "@/sections/Clients/SelectedBrands";
import About from "@/sections/About/About";
import Contact from "@/sections/Contact/Contact";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <SelectedWork />
      <SelectedBrands />
      <About />
      <Contact />
    </main>
  );
}