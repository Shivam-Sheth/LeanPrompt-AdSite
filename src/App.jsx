import { useCallback } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Problem from "./components/Problem";
import HowItWorks from "./components/HowItWorks";
import Demo from "./components/Demo";
import Impact from "./components/Impact";
import WhyNow from "./components/WhyNow";
import Judges from "./components/Judges";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ResetPassword from "./pages/ResetPassword";
import Download from "./pages/Download";
import Privacy from "./pages/Privacy";
import Confirmed from "./pages/Confirmed";

function Landing() {
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

function AppRoutes() {
  const location = useLocation();
  const isAuthPage = ["/login", "/dashboard", "/reset-password", "/download"].includes(location.pathname);

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/download" element={<Download />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/confirmed" element={<Confirmed />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
