import HeroAbout from "@/components/landing-page/hero-about";
import FAQ from "@/components/landing-page/faq";
import supabase from "@/config/supabaseClient";

export default async function Home() {
  console.dir(supabase, { depth: 1 });

  return (
    <div>
      <HeroAbout />
      <div className="pb-24">
        <FAQ />
      </div>
    </div>
  );
}
