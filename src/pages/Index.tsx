import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import UpcomingMatches from "@/components/UpcomingMatches";
import ReelsSection from "@/components/ReelsSection";
import SponsorsBanner from "@/components/SponsorsBanner";
import AdvertisementBanner from "@/components/AdvertisementBanner";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <UpcomingMatches />
        <ReelsSection />
        <SponsorsBanner />
        <AdvertisementBanner />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
