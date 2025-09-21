import HeroAbout from "@/components/landing-page/hero-about";
import supabase from "@/config/supabaseClient";
import FAQ from "@/components/landing-page/faq";
import Team from "@/components/landing-page/meet-the-team";
import SponsorUsSection from "@/components/landing-page/sponsorUs";
import OurSponsors from "@/components/landing-page/sponsors";
import ContactUs from "@/components/landing-page/contact-us";

export default async function Home() {
  return (
    <div>
      <HeroAbout />
      <OurSponsors />
      <SponsorUsSection />
      <FAQ />
      <Team />
      <ContactUs />
    </div>
  );
}
