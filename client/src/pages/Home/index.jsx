import Hero from "../../components/Hero";
import About from "../../components/About";
import Logo from "../../components/Logo";
import Blog from "../../components/Blog";
import Team from "../../components/Team";
import Member from "../../components/Member";


export default function Home() {

  return (
    <div id='home'>
      <Hero/>
      <Member/>
      <About/>
      <Logo/>
      <Blog/>
      <Team/>
    </div>
  )
}
