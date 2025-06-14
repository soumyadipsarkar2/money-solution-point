import HeroSection from "@/components/hero-section"
import ServicesGrid from "@/components/services-grid"
import EmiCalculator from "@/components/emi-calculator"
import VideoShowcase from "@/components/video-showcase"
import Statistics from "@/components/statistics"
import Testimonials from "@/components/testimonials"
import BenefitsSection from "@/components/benefits-section"
import FaqSection from "@/components/faq-section"
import CtaSection from "@/components/cta-section"

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <HeroSection />
      <ServicesGrid />
      <EmiCalculator />
      <VideoShowcase />
      <Statistics />
      <Testimonials />
      <BenefitsSection />
      <FaqSection />
      <CtaSection />
    </div>
  )
}
