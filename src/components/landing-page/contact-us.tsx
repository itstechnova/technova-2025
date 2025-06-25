"use client";

import Image from "next/image";
import Link from "next/link";

export default function ContactUs() {
  return (
    <div>
      {/* Contact Us Section */}
      <section
        id="contact-us"
        className="scroll-mt-16 px-24 py-20 h-full relative w-full text-left"
      >
        <h1 className="text-4xl font-bold text-textPrimary mb-16 md:mb-0">
          Contact Us
        </h1>

        <div className="grid md:grid-cols-5 max-w-4xl mx-auto items-center">
          <div className="md:col-span-4 rounded-xl bg-gradient-to-r from-navSecondary to-navSecondaryHover p-5">
            <div className="rounded-lg bg-background p-6 text-center">
              <p className="text-lg text-textPrimary">
                Reach out to us at{" "}
                <a
                  href="mailto:hello@itstechnova.org"
                  className="text-textPrimary underline"
                >
                  hello@itstechnova.org
                </a>
              </p>
            </div>
          </div>

          <div className="hidden md:block md:col-span-1">
            <Image
              src="/themed_assets/duck.svg"
              alt="Duck"
              width={160}
              height={160}
            />
          </div>
        </div>

        <div className="text-left pt-10">
          <Link href="http://mlh.io/code-of-conduct">
            <span className="underline text-base text-textPrimary">
              Code of Conduct
            </span>
          </Link>
        </div>
      </section>

      {/* Inclusivity Statement */}
      <section
        id="inclusivity-statement"
        className="scroll-mt-16 px-24 pb-32 h-full relative w-full text-left"
      >
        <h2 className="text-xl font-bold text-textPrimary mb-6 uppercase">
          Inclusivity Statement
        </h2>
        <p className="text-base text-textPrimary">
          TechNova&apos;s mission is to create safe, inclusive and empowering spaces
          for women and non-binary individuals to start, grow and thrive in the
          technology industry. We ensure that all members of the hackathon are
          respectful of our participants&apos; gender expression. The TechNova team
          would also like to acknowledge that “female” or “women” is not an
          accurate description for many people and it may make some feel
          unwelcome. We use the term Women+ to specifically and intentionally
          include cis and trans women, as well as non-binary, agender, or
          intersex people, and other gender minorities.
        </p>
      </section>
    </div>
  );
}
