import React from "react";
import { Button } from "../base-ui/button";

const SponsorUsSection: React.FC = () => {
  return (
    <section
      id="sponsors"
      className="scroll-mt-16 px-24 py-32 flex flex-col h-full relative w-full text-left"
    >
      <h2 className="text-4xl font-bold text-textPrimary mb-16">Sponsor Us</h2>
      <p className="max-w-4xl text-lg text-textPrimary mb-12">
        Support more than 300+ young women in the next step of their journey by
        sponsoring the next generation of leaders. Interested in sponsoring?
        Email us at{" "}
        <a
          href="mailto:sponsors@itstechnova.org"
          className="text-buttonSecondary underline"
        >
          sponsors@itstechnova.org
        </a>
        .
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <a
          href="mailto:sponsors@itstechnova.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button variant="default" size="lg">
            Become a Sponsor
          </Button>
        </a>
        <a
          href="https://itstechnova.org/pdfs/sponsorship_package.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button variant="outline" size="lg">
            Sponsorship Package
          </Button>
        </a>
      </div>
      {/* technically missing a carousel but we dont have sponsor info yet */}
    </section>
  );
};

export default SponsorUsSection;
