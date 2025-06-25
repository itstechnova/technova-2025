"use client";
import React, { useState } from "react";
import InterestInputBox from "../interestInputBox";
import supabase from "@/config/supabaseClient";

function HeroAbout() {
  const [email, setEmail] = useState("");
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");

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
      <div className="relative px-24 pt-32 flex flex-col">
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
            <div className="flex flex-col gap-4 max-md:w-full">
              <Button variant="default" size="lg">
                Hack with us!
              </Button>
              <Button variant="outline" size="lg">
                Mentor with us!
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Gate to About Section */}
      <div className="relative w-full">
        {/* Background Images */}
        <div className="w-full">
          <img
            src="/themed_assets/gate-to-path-mobile.svg"
            alt="Gate to Path Mobile"
            className="w-full h-auto block sm:hidden"
          />
          <img
            src="/themed_assets/gate-to-path-desktop.svg"
            alt="Gate to Path Desktop"
            className="w-full h-auto hidden sm:block"
          />
        </div>

        {/* Overlay Content */}
        <div className="absolute bottom-0 left-0 w-full h-full flex items-center z-10">
          <div className="flex flex-col gap-4 items-start px-10 md:px-24 py-6 rounded-3xl w-3/4 md:w-1/2 absolute sm:bottom-12 md:bottom-1/5 bg-navPrimary/50">
            <h2 className="text-3xl font-bold">About Us</h2>
            <p className="text-base">
              TechNova’s mission is to create safe, inclusive and empowering
              spaces for women and non-binary individuals to start, grow and
              thrive in the technology industry. We value fostering an inclusive
              community, connecting students with career opportunities, and
              empowering hackers to create.
            </p>

            <p>
              TechNova aims to provide hackers with an end-to-end experience to
              help accelerate students’ journeys in tech, whether they are
              beginners just starting off or seasoned hackers looking for new
              challenges.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroAbout;
