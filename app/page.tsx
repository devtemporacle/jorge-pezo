import Contact from "@/components/sections/Contact";
import Intro from "@/components/sections/Intro";
import OutsideOfWork from "@/components/sections/OutsideOfWork";
import Projects from "@/components/sections/Projects";
import WhatIDo from "@/components/sections/WhatIDo";

export default function Home() {
  return (
    <main className="page">
      <Intro />
      <WhatIDo />
      <Projects />
      <OutsideOfWork />
      <Contact />
    </main>
  );
}
