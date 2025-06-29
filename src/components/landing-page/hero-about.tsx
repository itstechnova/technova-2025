"use client";
import React, { useState } from "react";
import InterestInputBox from "../interestinputbox";
import supabase from "@/config/supabaseClient";

function HeroAbout() {
  const [email, setEmail] = useState("");
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");

  const [gateLoaded, setGateLoaded] = useState(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async () => {
    const { data, error } = await supabase
      .from("interest_form")
      .insert({ email });
    if (error) {
      setFormError(error.message);
      setFormSuccess("");
    } else {
      setFormSuccess("Email added to interest form");
      setFormError("");
    }
  };

  return (
    <div className="bg-background flex flex-col">
      {/* Hero Section */}
      <div className="relative px-24 pt-32 pb-12 flex flex-col">
        <img
          src="/themed_assets/clouds-desktop.svg"
          alt="Clouds background"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />
        <div className="relative z-10 flex flex-row justify-between max-md:flex-col gap-6">
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
        </div>
      </div>

      {/* Gate to About Section */}
      <div className="relative w-full flex flex-col">
        {/* Reserve space to avoid layout shift */}
        <div className="relative w-full min-h-[600px]">
          {/* Mobile Image */}
          <img
            src="/themed_assets/gate-to-path-mobile.svg"
            alt="Gate to Path Mobile"
            onLoad={() => setGateLoaded(true)}
            className="w-full h-auto block sm:hidden"
          />
          {/* Desktop Image */}
          <img
            src="/themed_assets/gate-to-path-desktop.svg"
            alt="Gate to Path Desktop"
            onLoad={() => setGateLoaded(true)}
            className="w-full h-auto hidden sm:block"
          />

          {/* Overlay Content, no absolute positioning */}
          {gateLoaded && (
            <div className="relative flex justify-start px-6 sm:px-24 py-12 -mt-16 sm:-mt-40 transition-all duration-300 ease-in-out">
              <div className="rounded-3xl w-full sm:w-3/4 md:w-1/2 p-8 flex flex-col gap-4">
                <h2 id="about" className="text-3xl font-bold">
                  About Us
                </h2>
                <p>
                  TechNova’s mission is to create safe, inclusive and empowering
                  spaces for women and non-binary individuals to start, grow,
                  and thrive in the technology industry. We value fostering an
                  inclusive community, connecting students with career
                  opportunities, and empowering hackers to create.
                </p>
                <p>
                  TechNova aims to provide hackers with an end-to-end experience
                  to help accelerate students’ journeys in tech, whether they
                  are a beginner just starting off or a seasoned hacker looking
                  for new challenges.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default HeroAbout;
