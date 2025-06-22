import HeroAbout from "@/components/landing-page/hero-about";
import supabase from "@/config/supabaseClient";
// import FAQ from "@/components/landing-page/faq";
import SponsorUsSection from "@/components/landing-page/sponsorUs";

import ContactUs from "@/components/landing-page/contact-us";

export default async function Home() {
  console.dir(supabase, { depth: 1 });

  return (
    <div>
      <HeroAbout />
      <SponsorUsSection />

      {/* <div className="pb-24">
        <FAQ />
      </div> */}
      <ContactUs />

    </div>
  );
}
