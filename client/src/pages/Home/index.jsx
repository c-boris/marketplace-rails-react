import Hero from "../../components/Hero";
import About from "../../components/About";
import Logo from "../../components/Logo";
import Blog from "../../components/Blog";
import Team from "../../components/Team";


export default function Home() {

  return (
    <div id='home'>
      <Hero/>
      <About/>
      <Logo/>
      <Blog/>
      <Team/>
    </div>
  )
}
