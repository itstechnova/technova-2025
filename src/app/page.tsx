import HeroAbout from '@/components/landing-page/hero-about';
import supabase from '@/config/supabaseClient';

export default async function Home() {
  console.dir(supabase, { depth: 1 });

  return (
    <div>
      <HeroAbout />
    </div>
  );
}
