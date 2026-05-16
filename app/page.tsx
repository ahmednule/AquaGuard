import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import StatsBar from "@/components/landing/StatsBar";
import FeaturesSection from "@/components/landing/FeaturesSection";
import HowItWorks from "@/components/landing/HowItWorks";
import SensorShowcase from "@/components/landing/SensorShowcase";
import CTASection from "@/components/landing/CTASection";
import Footer from "@/components/landing/Footer";
import AuthModal from "@/components/auth/AuthModal";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar />
      <HeroSection />
      <StatsBar />
      <FeaturesSection />
      <HowItWorks />
      <SensorShowcase />
      <CTASection />
      <Footer />
      {/* Auth modal is rendered globally — triggered by nav buttons */}
      <AuthModal />
    </main>
  );
}
