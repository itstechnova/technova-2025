"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faX } from "@fortawesome/free-solid-svg-icons";
import { Button } from "./base-ui/button";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Sponsors", href: "#sponsors" },
  { label: "FAQ", href: "/" },
  { label: "Contact Us", href: "#contact-us" },
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div className="sticky top-0 z-50 w-full border-b-2 border-navSecondary bg-navPrimary px-6 md:px-24 py-3">
      <div className="flex flex-row justify-between min-gap-4 items-center">
        <div className="flex flex-row gap-6">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/">
              <Image
                src="/Technova2024Logo512.png"
                alt="logo"
                width={40}
                height={40}
              />
            </Link>
          </div>

          {/* Desktop links */}
          <div className="flex flex-row max-md:hidden items-center gap-6">
            {navLinks.map(({ label, href }) => (
              <Link key={label} href={href}>
                {label}
              </Link>
            ))}
          </div>
        </div>
        {/* <Link href="/apply/hacker" className="max-md:hidden">
          <Button variant="default">Sign In</Button>
        </Link> */}
        {/* Mobile hamburger */}
        <Button
          onClick={toggleMenu}
          className="md:hidden text-white focus:outline-none w-5 h-5"
          size="icon"
          variant="link"
        >
          {menuOpen ? (
            <FontAwesomeIcon icon={faX} className="text-navSecondary w-5 h-5" />
          ) : (
            <FontAwesomeIcon
              icon={faBars}
              className="text-navSecondary w-5 h-5"
            />
          )}
        </Button>
      </div>

      {/* Mobile menu content */}
      {menuOpen && (
        <div className="md:hidden mt-4 space-y-4 flex flex-col items-center">
          {navLinks.map(({ label, href }) => (
            <Link key={label} href={href}>
              {label}
            </Link>
          ))}
          {/* <Link href="/apply/hacker">
            <Button variant="default">Sign In</Button>
          </Link> */}
        </div>
      )}
    </div>
  );
}

export default Navbar;
