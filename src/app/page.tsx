// import { Banners } from "@/components/shared";
// import FAQ from "@/components/pages/landing/sections/faq";
// import WhyCP from "@/components/pages/landing/sections/whyCp";
// import Footer from "@/components/pages/landing/sections/footer";
// import Stories from "@/components/pages/landing/sections/stories";
// import Broker1 from "@/components/pages/landing/sections/broker1";
// import Broker2 from "@/components/pages/landing/sections/broker2";
// import Broker3 from "@/components/pages/landing/sections/broker3";
// import HeroSection from "@/components/pages/landing/sections/hero";
import CommingSoon from "@/components/pages/comming-soon/commingSoon";
// import HowCpWorks from "../components/pages/landing/sections/howCpWorks";
// import TrackEngagement from "@/components/pages/landing/sections/trackEngagement";

const styles = {
  container: "bg-white",
};

export default function LandingPage() {
  return (
    <div className={styles.container}>
      <CommingSoon />

      {/* Landing Page (Commented for now) */}
      {/* <HeroSection />
      <Broker1 />
      <WhyCP />
      <TrackEngagement />
      <Broker2 />
      <HowCpWorks />
      <Stories />
      <FAQ />
      <Broker3 />
      <Footer /> */}

      {/* Banners (Commented for now) */}
      {/* <Banners /> */}
    </div>
  );
}
