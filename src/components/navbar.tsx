import React from 'react';
import Image from 'next/image';

function Navbar() {
  return (
    <div className="flex justify-between items-center p-4 border-b-4 border-indigo-800">
      <div className="flex items-center gap-4">
        <Image src="/logo.png" alt="logo" width={32} height={32} />
        <h1 className="">About</h1>
        <h1 className="">Sponsors</h1>
        <h1 className="">Keynote</h1>
        <h1 className="">FAQ</h1>
        <h1 className="">Team</h1>
        <h1 className="">Contact Us</h1>
      </div>
      <button className="flex items-center gap-4 bg-indigo-800 text-white p-4">
        <h1 className="">Apply</h1>
      </button>
    </div>
  );
}

export default Navbar;
