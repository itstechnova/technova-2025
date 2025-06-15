import Image from "next/image";
import supabase from "@/config/supabaseClient";
import SponsorUsSection from "@/components/mainPage/sponsorUs";

export default async function Home() {
  console.dir(supabase, { depth: 1 });

  return (
    <div>
      <SponsorUsSection />
    </div>
  );
}
