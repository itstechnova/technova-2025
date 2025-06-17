import supabase from "@/config/supabaseClient";
import SponsorUsSection from "@/components/landing-page/sponsorUs";
import HeroAbout from "@/components/landing-page/hero-about";

export default async function Home() {
  console.dir(supabase, { depth: 1 });

  return (
    <div>
      <HeroAbout />
      <SponsorUsSection />
    </div>
  );
}
