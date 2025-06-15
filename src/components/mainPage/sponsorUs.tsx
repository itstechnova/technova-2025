import React from "react";

const SponsorUsSection: React.FC = () => {
  return (
    <section className="py-16 px-24 text-left">
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
          className="bg-buttonSecondary text-white font-semibold px-6 py-3 rounded-md shadow-md hover:scale-105 transition-transform"
        >
          Become a Sponsor
        </a>
        <a
          href="https://itstechnova.org/pdfs/sponsorship_package.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white border-2 border-buttonSecondary text-buttonSecondary font-semibold px-6 py-3 rounded-md shadow-md hover:bg-backgroundTertiary transition-colors"
        >
          Sponsorship Package
        </a>
      </div>
    </section>
  );
};

export default SponsorUsSection;
