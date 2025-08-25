"use client";

import React, { useState, useEffect, useRef } from "react";

const teams = [
  "LEADERSHIP",
  "LOGISTICS",
  "FINANCE",
  "ENGINEERING",
  "DESIGN",
  "SPONSORSHIP",
  "MARKETING",
] as const;

const members: Record<(typeof teams)[number], string[]> = {
  LEADERSHIP: ["Kshama Patel", "Malvika Patel"],
  LOGISTICS: [
    "Jansi Shah",
    "Mincy Yang",
    "Yifan (Grace) Wang",
    "Catherine Sue",
    "Sreeja Gangapuram",
    "Anuhya Yalla",
  ],
  FINANCE: ["Samantha La", "Jennifer Shi", "Zoe Su", "Isabella Rossi"],
  ENGINEERING: [
    "Ashley Ge",
    "Lindsay Zhang",
    "Mia Isakovic",
    "Kim Guo",
    "Angela Xu",
  ],
  DESIGN: [
    "Aethar Marhon",
    "Mai Nguyen",
    "Elyssa Qi",
    "Jessica Chen",
    "Jessica Liu",
    "Khloe Ramdhan",
    "Sum Liu",
    "Jasleen Badwal",
    "Chavi Sharma",
  ],
  SPONSORSHIP: [
    "Sharon He",
    "Mairah Hashmi",
    "Akshita Choudhury",
    "Celine Tian",
    "Serena Xu",
    "Shalott Tam",
  ],
  MARKETING: ["Smridhi Bawa", "Khushi Adukia", "Meghana Yarlagadda"],
};

const teamColours: Record<string, string> = {
  LEADERSHIP: "text-[#CD5769]",
  LOGISTICS: "text-[#5B5BA9]",
  FINANCE: "text-[#9B7148]",
  ENGINEERING: "text-[#3D3D75]",
  DESIGN: "text-[#4A9388]",
  SPONSORSHIP: "text-[#CD5757]",
  MARKETING: "text-[#72A848]",
};

function capitalizeFirstLetter(text: string) {
  if (!text) return text;
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

interface MemberProps {
  name: string;
}

const Member: React.FC<MemberProps> = ({ name }) => {
  const [imgSrc, setImgSrc] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, []);

  const memberName = `${name
    .replace(/\s+/g, "_")
    .replace(/[()]/g, "")
    .toLowerCase()}`;

  useEffect(() => {
    if (isVisible) {
      setImgSrc(`/themed_assets/team/${memberName}_1.svg`);
    }
  }, [isVisible, name]);

  const handleHover = () => {
    if (isVisible) {
      setImgSrc(`/themed_assets/team/${memberName}_2.svg`);
    }
  };

  const handleUnhover = () => {
    if (isVisible) {
      setImgSrc(`/themed_assets/team/${memberName}_1.svg`);
    }
  };

  return (
    <div className="flex flex-col items-center w-32 md:w-48 z-10">
      <div className="w-28 h-28 md:w-44 md:h-44">
        {imgSrc ? (
          <img
            ref={imgRef}
            onMouseOver={handleHover}
            onMouseOut={handleUnhover}
            src={imgSrc}
            alt={name}
          />
        ) : (
          <div ref={imgRef} />
        )}
      </div>
      <p className="text-sm text-center text-textPrimary">{name}</p>
    </div>
  );
};

function Team() {
  return (
    <div>
      <section
        id="meet-the-team"
        className="scroll-mt-16 px-10 md:px-24 py-12 md:py-16 h-full relative w-full text-left"
      >
        <div className="absolute inset-0 lg:top-auto z-0 pointer-events-none">
          <img
            src="/themed_assets/meet-the-team-bg.svg"
            alt="Paths"
            className="object-cover w-full hidden lg:block [@media(min-width:3000px)]:hidden"
          />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-textPrimary">
          Meet the Team
        </h1>

        {teams.map((team) => (
          <div key={`${team}`}>
            <div className="flex items-center gap-2">
              <img
                src={`/themed_assets/team/flowers/${team.toLowerCase()}_flower.svg`}
                alt="flower"
                className="mt-4 w-8 h-8 md:w-18 md:h-18 z-10"
              />
              <h2
                className={`text-2xl md:text-3xl mt-10 mb-4 z-10 ${teamColours[team]}`}
              >
                {capitalizeFirstLetter(team.toLowerCase())}
              </h2>
            </div>

            <div className="flex flex-wrap gap-4">
              {members[team].map((memberName) => (
                <Member
                  key={`${team}-${memberName
                    .replace(/\s+/g, "-")
                    .replace(/[()]/g, "")
                    .toLowerCase()}}`}
                  name={memberName}
                />
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

export default Team;
