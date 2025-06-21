"use client";
import Link from "next/link";

export default function ThankYouPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[rgba(255,196,188,0.5)] to-[#FFFAF3] px-20 sm:px-20 py-20 relative overflow-hidden text-left text-sm sm:text-base text-[#171717]">
      <h1 className="text-3xl sm:text-4xl font-bold text-green-900 mb-6">
        Thanks for Applying!{" "}
        <span role="img" aria-label="rocket">
          🚀
        </span>
      </h1>

      <p className="mb-4">
        <br></br>
        <br></br>
        Congratulations on finishing the form, we’re so stoked to read your
        application ✨!
      </p>
      <p className="mb-4">
        We will be reviewing applications on a rolling basis, so make sure to
        keep an eye on your inbox and check the{" "}
        <a href="https://example.com" className="underline text-inherit">
          application portal
        </a>
        ! Expect to hear back in August 👀
      </p>
      <p className="mb-4">
        In the meantime, follow our socials (
        <a
          href="https://itstechnova.carrd.co"
          className="underline text-inherit"
        >
          itstechnova.carrd.co
        </a>
        ) and tell your friends to apply! 😊
      </p>
      <p className="mb-4">
        If you have any questions or concerns, contact us at{" "}
        <a
          href="mailto:hello@itstechnova.org"
          className="underline text-inherit"
        >
          hello@itstechnova.org
        </a>
      </p>
      <p className="mb-10">
        Thank you for applying to TechNova’s Hack with Us &lt;3
      </p>

      {/* 🔥 Fully centered button across full page */}
      <div className="flex justify-center">
        <Link href="/">
          <button className="bg-gradient-to-l from-[#FAC4BD] to-[#CD5769] text-white px-6 py-3 rounded-xl font-semibold">
            Go Back Home!
          </button>
        </Link>
      </div>

      <img
        src="/bunny.png"
        alt="Cute bunny"
        className="absolute bottom-0 right-0 w-[520px] sm:w-[600px] pointer-events-none select-none"
      />
    </main>
  );
}
