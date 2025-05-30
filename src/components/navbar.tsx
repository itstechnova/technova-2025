import React from "react";
import Image from "next/image";
import Link from "next/link";

function Navbar() {
  return (
    <div className="sticky top-0 z-50 flex justify-between items-center border-b-2 border-navSecondary bg-navPrimary px-24 py-3">
      <div className="flex items-center gap-8 ">
        <Image
          src="/Technova2024Logo512.png"
          alt="logo"
          width={40}
          height={40}
        />
        <a href="/" className="">
          About
        </a>
        <a href="/" className="">
          Sponsors
        </a>
        <a href="/" className="">
          Keynote
        </a>
        <a href="/" className="">
          FAQ
        </a>
        <a href="/" className="">
          Team
        </a>
        <a href="/" className="">
          Contact Us
        </a>
      </div>
      <Link href="/apply/mentor" className="flex items-center gap-2">
        <button className="relative flex items-center text-white px-4 py-2 rounded-md shadow-sm shadow-navSecondary bg-navSecondary group">
          <span className="relative font-semibold text-lg z-50">Mentor</span>
          <div className="opacity-0 group-hover:opacity-100 absolute inset-0 h-full w-full rounded-md transition duration-300 bg-gradient-to-r from-navSecondary to-buttonSecondary"></div>
        </button>
      </Link>

      <Link href="/apply/hacker" className="flex items-center gap-2">
        <button className="relative flex items-center text-white px-4 py-2 rounded-md shadow-sm shadow-navSecondary bg-navSecondary group">
          <span className="relative font-semibold text-lg z-50">
            Your Application
          </span>
          <div className="opacity-0 group-hover:opacity-100 absolute inset-0 h-full w-full rounded-md transition duration-300 bg-gradient-to-r from-navSecondary to-buttonSecondary"></div>
        </button>
      </Link>
    </div>
  );
}

export default Navbar;
