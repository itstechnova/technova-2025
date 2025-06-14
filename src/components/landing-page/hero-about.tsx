import React from "react";
import Image from "next/image";
import { Button } from "../base-ui/button";

function HeroAbout() {
  return (
    <div className="bg-background">
      {/* Hero before gate */}
      <div className="p-24 flex flex-col h-full relative">
        {/* Background SVG graphic */}
        <div className="absolute inset-0 z-7 pointer-events-none">
          <img
            src="/themed_assets/clouds-desktop.svg"
            alt="Technova landing page clouds graphic asset"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute top-0 left-0 w-full h-1/4 pointer-events-none z-5 from-backgroundSecondary to-navPrimary" />
        <div className="pb-5 relative z-10">
          <div className="flex flex-row justify-between items-center max-sm:flex-col gap-6">
            <div className="flex flex-col gap-4 max-sm:items-center">
              <h1 className="text-7xl max-sm:text-3xl font-bold">
                <span>Tech</span><span className="bg-gradient-to-r from-[#06402B] to-[#648E61] text-transparent bg-clip-text">Nova</span>
              </h1>
              <h2 className="text-3xl max-sm:text-xl font-bold">
                Hack With Us
              </h2>
              <p className="text-base max-sm:text-sm">
                University of Waterloo’s Women+ in Tech Hackathon
              </p>
              <small className="text-sm max-sm:text-xs font-semibold">
                Sept 22–24, 2025
              </small>
            </div>
            <div className="flex flex-col gap-4">
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
      {/* Hero gate + about section */}
      <div className="relative">
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
        <div className="absolute top-0 left-0 w-full h-full flex items-center z-10">
          <div className="flex flex-col gap-4 items-start px-10 sm:px-24 rounded-lg w-4/5 sm:w-1/2 absolute bottom-2/5 sm:bottom-1/4">
            <h2 className="text-3xl font-bold">About Us</h2>
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
