import { Footer } from "@/components/footer";
import { GallerySection } from "@/components/gallery-section";
import { HeroSection } from "@/components/hero-section";
import { ItinerarySection } from "@/components/itinerary-section";
import { Navbar } from "@/components/navbar";
import { PersonalUpdateSection } from "@/components/personal-update-section";
import { PriceBreakdownSection } from "@/components/price-breakdown-section";
import { ReviewsSection } from "@/components/reviews-section";
import { StayDetailsSection } from "@/components/stay-details-section";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="safe-bottom">
        <HeroSection />
        <GallerySection />
        <PersonalUpdateSection />
        <StayDetailsSection />
        <ItinerarySection />
        <ReviewsSection />
        <PriceBreakdownSection />
      </main>
      <Footer />
    </>
  );
}
