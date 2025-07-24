import { PrivacyMatters } from "@/components/whyPrivacyMatters";
import { HeroSection } from "@/components/heroSection";
import CtaSection from "@/components/CtaSection";
import { Features } from "@/components/features";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <PrivacyMatters />
      <Features />
      <CtaSection />
    </div>
  );
}
