import React from 'react';
import Image from 'next/image';

function Navbar() {
  return (
    <div className="flex justify-between items-center border-b-2 border-navSecondary bg-navPrimary px-24 py-3">
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
      <button className="flex items-center bg-navSecondary text-white px-4 py-2 rounded-md">
        <h1 className="">Your Application</h1>
      </button>
    </div>
  );
}

export default Navbar;
