import { useCallback } from "react";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Problem from "./components/Problem";
import HowItWorks from "./components/HowItWorks";
import Demo from "./components/Demo";
import Impact from "./components/Impact";
import WhyNow from "./components/WhyNow";
import Judges from "./components/Judges";
import Footer from "./components/Footer";

function App() {
  const scrollTo = useCallback((id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen bg-neutral-50">
      <Nav />
      <Hero
        onTryDemo={() => scrollTo("demo")}
        onSeeImpact={() => scrollTo("impact")}
      />
      <Problem />
      <HowItWorks />
      <Demo />
      <Impact />
      <WhyNow />
      <Judges />
      <Footer />
    </div>
  );
}

export default App;
