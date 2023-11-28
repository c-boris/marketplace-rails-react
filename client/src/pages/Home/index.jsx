import Hero from "../../components/Hero";
import About from "../../components/About";
import Logo from "../../components/Logo";
import Blog from "../../components/Blog";
import Team from "../../components/Team";
import ReadProperties from "../../components/Properties/properties";

export default function Home() {
  return (
    <div id="home">
      <Hero />
      <ReadProperties />
      <Team />
    </div>
  );
}
