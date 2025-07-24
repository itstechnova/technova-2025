"use client";
import React, { useState } from "react";
import InterestInputBox from "../interestinputbox";
import supabase from "@/config/supabaseClient";
import { Button } from "../base-ui/button";
import { useRouter } from "next/navigation";
import { useAccount } from "../AccountContext";

function HeroAbout() {
  const [email, setEmail] = useState("");
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");

  const { user, logout } = useAccount();
  const router = useRouter();

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
      <div className="relative px-10 md:px-24 pt-32 pb-16 flex flex-col">
        <img
          src="/themed_assets/clouds-desktop.svg"
          alt="Clouds background"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />
        <div className="relative z-10 flex [@media(min-width:1400px)]:flex-row justify-between flex-col gap-6">
          <div className="flex flex-col gap-12 text-textPrimary">
            <div className="flex flex-col gap-4 max-md:items-center">
              <h1 className="text-6xl md:text-9xl font-bold">
                <span>Tech</span>
                <span className="bg-gradient-to-r from-[#06402B] to-[#648E61] text-transparent bg-clip-text">
                  Nova
                </span>
              </h1>
              <h2 className="text-3xl md:text-6xl font-bold">Hack With Us</h2>
              <p className="text-xl md:text-2xl max-md:text-center">
                University of Waterloo&apos;s Women+ in Tech Hackathon
              </p>
              <small className="text-xl max-sm:text-lg font-semibold">
                Sept 26–28, 2025
              </small>
            </div>
            <div className="flex flex-col gap-2 hidden">
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
          <div className="flex flex-col gap-4 justify-center items-center [@media(min-width:1400px)]:mr-32">
            <Button
              variant="default"
              size="lg"
              onClick={() => {
                if (user) {
                  router.push("/apply/dashboard");
                } else {
                  router.push("/account/login");
                }
              }}
            >
              Hack with us!
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => {
                if (user) {
                  router.push("/apply/dashboard");
                } else {
                  router.push("/account/login");
                }
              }}
            >
              Mentor with us!
            </Button>
          </div>
        </div>
      </div>

      {/* Gate to About Section */}
      <div className="relative w-full flex flex-col">
        {/* Reserve space to avoid layout shift */}
        <div className="relative w-full">
          {/* Mobile Image */}
          <img
            src="/themed_assets/gate-mobile.svg"
            alt="Gate with Goose"
            className="w-full h-auto block sm:hidden"
          />
          {/* Desktop Image */}
          <img
            src="/themed_assets/gate-desktop.svg"
            alt="Gate with Goose"
            className="w-full h-auto hidden sm:block"
          />
        </div>

        <div
          id="about"
          className="relative md:grid md:grid-cols-2 px-10 md:px-24 pb-12 md:pb-16 pt-24 md:pt-28 text-textPrimary"
        >
          <div className="rounded-3xl w-full">
            <h2 className="text-3xl md:text-4xl font-bold mb-10">About Us</h2>
            <p className="text-base md:text-lg mb-5">
              TechNova&apos;s mission is to create safe, inclusive and
              empowering spaces for women and non-binary individuals to start,
              grow, and thrive in the technology industry. We value fostering an
              inclusive community, connecting students with career
              opportunities, and empowering hackers to create.
            </p>
            <p className="text-base md:text-lg">
              TechNova aims to provide hackers with an end-to-end experience to
              help accelerate students&apos; journeys in tech, whether they are
              a beginner just starting off or a seasoned hacker looking for new
              challenges.
            </p>
          </div>
          <div className="hidden md:flex justify-center">
            <img
              src="/themed_assets/frog.svg"
              alt="Frog"
              width={300}
              className="ml-24 mt-4"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroAbout;
