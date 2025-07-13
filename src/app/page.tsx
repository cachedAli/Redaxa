import { Features } from "@/components/features";
import { HeroSection } from "@/components/heroSection";
import { PrivacyMatters } from "@/components/whyPrivacyMatters";

export default function Home() {
  return (
    <div className="">
      <HeroSection />
      <PrivacyMatters />
      <Features/>
    </div>
  );
}
