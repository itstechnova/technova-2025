
'use client';
import React, { useState } from 'react';
// import { Button } from '../base-ui/button';
// import { useRouter } from 'next/navigation';
import InterestInputBox from '../interestinputbox';
import supabase from '@/config/supabaseClient';

function HeroAbout() {
//   const router = useRouter();
  const [email, setEmail] = useState('');
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async () => {
    console.log(email);
    const { data, error } = await supabase
      .from('interest_form')
      .insert({ email });
    if (error) {
      setFormError(error.message);
      setFormSuccess('');
    } else {
      setFormSuccess('Email added to interest form');
      setFormError('');
      console.log('data', data);
    }
  };

  return (
    <div className="bg-background">
      {/* Hero before gate */}
      <div className="px-24 pt-32 pb-6 flex flex-col h-full relative w-full">
        {/* Background SVG graphic */}
        <div className="absolute inset-0 z-7 pointer-events-none">
          <img
            src="/themed_assets/clouds-desktop.svg"
            alt="Technova landing page clouds graphic asset"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute top-0 left-0 w-full h-1/4 pointer-events-none z-5 from-backgroundSecondary to-navPrimary" />
        <div className="pb-5 relative z-10 max-md:w-full">
          <div className="flex flex-row justify-between items-center max-md:flex-col gap-6 max-md:w-full">
            <div className="flex flex-col gap-12">
              <div className="flex flex-col gap-4 max-md:items-center">
                <h1 className="text-9xl max-md:text-7xl font-bold">
                  <span>Tech</span>
                  <span className="bg-gradient-to-r from-[#06402B] to-[#648E61] text-transparent bg-clip-text">
                    Nova
                  </span>
                </h1>
                <h2 className="text-6xl max-sm:text-5xl font-bold">
                  Hack With Us
                </h2>
                <p className="text-2xl max-sm:text-xl max-md:text-center">
                  University of Waterloo’s Women+ in Tech Hackathon
                </p>
                <small className="text-xl max-sm:text-lg font-semibold">
                  Sept 26–28, 2025
                </small>
              </div>
              <div className="flex flex-col gap-2">
                <InterestInputBox
                  value={email}
                  onChange={handleEmailChange}
                  onSubmit={handleSubmit}
                />
                {formError && <div className="text-red-500">{formError}</div>}
                {formSuccess && (
                  <div className="text-green-500">{formSuccess}</div>
                )}
              </div>
            </div>
            {/* <div className="flex flex-col gap-4 max-md:w-full">
              <Button
                variant="default"
                size="lg"
                onClick={() => router.push("/apply/hacker")}
              >
                Hack with us!
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => router.push("/apply/mentor")}
              >
                Mentor with us!
              </Button>
            </div> */}
          </div>
        </div>
      </div>
      {/* Hero gate + about section */}
      <div className="relative w-full h-auto">
        {/* Background Image */}
        {/* Mobile ver */}
        <img
          src="/themed_assets/gate-to-path-mobile.svg"
          alt="Technova landing page clouds graphic asset (mobile)"
          className="w-full h-auto block sm:hidden"
        />
        {/* Desktop ver */}
        <img
          src="/themed_assets/gate-to-path-desktop.svg"
          alt="Technova landing page clouds graphic asset (desktop)"
          className="w-full h-auto hidden sm:block"
        />

        {/* Overlay Content */}
        <div className="absolute bottom-0 left-0 w-full h-full flex items-center z-10">
          <div className="flex flex-col gap-4 items-start px-10 md:px-24 py-6 rounded-3xl w-3/4 md:w-1/2 absolute sm:bottom-12 md:bottom-1/5 bg-navPrimary/50">
            <h2 id="about" className="text-3xl font-bold scroll-mt-28">
              About Us
            </h2>
            <p className="text-base">
              TechNova’s mission is to create safe, inclusive and empowering
              spaces for women and non-binary individuals to start, grow and
              thrive in the technology industry. We value fostering an inclusive
              community, connecting students with career opportunities, and
              empowering hackers to create.
            </p>
            <p className="text-base">
              TechNova aims to provide hackers with an end-to-end experience to
              help accelerate students’ journeys in tech, whether they are a
              beginner just starting off or a seasoned hacker looking for new
              challenges.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default HeroAbout;
