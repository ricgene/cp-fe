import HeroSection from "@/components/pages/merchant-marketing/sections/hero";

const styles = {
  container: "bg-white",
};

export default function MerchantMarketingPage() {
  return (
    <div className={styles.container}>
      <HeroSection />
    </div>
  );
}
