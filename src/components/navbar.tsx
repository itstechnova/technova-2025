"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faX } from "@fortawesome/free-solid-svg-icons";
import { Button } from "./base-ui/button";
import { useAccount } from "./AccountContext";
import { useRouter, usePathname } from "next/navigation";

const navLinks = [
  { label: "About", href: "/#about" },
  { label: "Sponsors", href: "/#sponsors" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact Us", href: "/#contact-us" },
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const { user, logout } = useAccount();
  const router = useRouter();

  return (
    <div className="sticky top-0 z-50 w-full border-b-2 border-navSecondary bg-navPrimary px-6 lg:px-24 py-3">
      <div className="flex flex-row justify-between min-gap-4 items-center">
        <div className="flex justify-between w-full">
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
            <div className="lg:flex flex-row hidden items-center gap-6 text-textPrimary">
              {navLinks.map(({ label, href }) => (
                <Link key={label} href={href}>
                  {label}
                </Link>
              ))}
            </div>
          </div>
          <div className="hidden lg:flex flex-row gap-4 items-center">
            <Button
              variant="default"
              onClick={() => {
                if (user) {
                  logout();
                  router.push("/");
                } else {
                  router.push("/account/login");
                }
              }}
            >
              {user ? "Logout" : "Login"}
            </Button>
            {user && (
              <Button
                variant="default"
                onClick={() => {
                  router.push("/apply/dashboard");
                }}
              >
                Dashboard
              </Button>
            )}
          </div>
        </div>

        {/* Mobile hamburger */}
        <div className="pr-4">
          <Button
            onClick={toggleMenu}
            className="lg:hidden text-white focus:outline-none"
            size="icon"
            variant="link"
          >
            {menuOpen ? (
              <FontAwesomeIcon icon={faX} className="text-navSecondary" />
            ) : (
              <FontAwesomeIcon
                icon={faBars}
                className="text-navSecondary w-5 h-5"
              />
            )}
          </Button>
        </div>

        {/* MLH Trust Badge */}
        {usePathname() === "/" && (
          <div className="pr-20 lg:pr-24">
            <a
              id="mlh-trust-badge"
              href="https://mlh.io/na?utm_source=na-hackathon&utm_medium=TrustBadge&utm_campaign=2026-season&utm_content=white"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "block",
                maxWidth: "120px",
                minWidth: "80px",
                position: "absolute", // change to "absolute" since you want it to scroll with the page
                top: "0",
                width: "10%",
                zIndex: 10000,
              }}
            >
              <img
                src="https://s3.amazonaws.com/logged-assets/trust-badge/2026/mlh-trust-badge-2026-white.svg"
                alt="Major League Hacking 2026 Hackathon Season"
                style={{ width: "100%" }}
              />
            </a>
          </div>
        )}
      </div>

      {/* Mobile menu content */}
      {menuOpen && (
        <div className="lg:hidden mt-4 space-y-4 flex flex-col items-center text-textPrimary">
          {navLinks.map(({ label, href }) => (
            <Link key={label} href={href}>
              {label}
            </Link>
          ))}

          <Button
            variant="default"
            onClick={() => {
              if (user) {
                logout();
                router.push("/");
              } else {
                router.push("/account/login");
              }
            }}
          >
            {user ? "Logout" : "Login"}
          </Button>
          {user && (
            <Button
              variant="default"
              onClick={() => {
                router.push("/apply/dashboard");
              }}
            >
              Dashboard
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

export default Navbar;
