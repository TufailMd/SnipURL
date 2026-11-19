import LandingNavbar from "../components/landing/LandingNavbar";
import { AnalyticsShowcase, FeaturesSection, FinalCTA, Footer, HeroSection, HowItWorks, QRShowcase, TrustedBrands } from "../components/landing/LandingSections";

export default function LandingPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#fff8f6] font-body text-[#251914]">
      <LandingNavbar />
      <HeroSection />
      <TrustedBrands />
      <FeaturesSection />
      <HowItWorks />
      <AnalyticsShowcase />
      <QRShowcase />
      <FinalCTA />
      <Footer />
    </div>
  );
}
