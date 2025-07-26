import HeroAbout from "@/components/landing-page/hero-about";
import supabase from "@/config/supabaseClient";
import FAQ from "@/components/landing-page/faq";
import SponsorUsSection from "@/components/landing-page/sponsorUs";

import ContactUs from "@/components/landing-page/contact-us";

export default async function Home() {
  return (
    <div>
      <HeroAbout />
      <SponsorUsSection />
      <FAQ />
      <ContactUs />
    </div>
  );
}
