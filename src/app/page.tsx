import supabase from "@/config/supabaseClient";
import SponsorUsSection from "@/components/landing-page/sponsorUs";
import HeroAbout from "@/components/landing-page/hero-about";
import ContactUs from "@/components/landing-page/contact-us";

export default async function Home() {
  console.dir(supabase, { depth: 1 });

  return (
    <div>
      <HeroAbout />
      <SponsorUsSection />
      <ContactUs />
    </div>
  );
}
