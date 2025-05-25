import React from 'react';
import Image from 'next/image';

function HackerLandingForm() {
  return (
    <div className="p-24 flex flex-col h-full bg-navPrimary relative">
      <div className="absolute top-0 left-0 w-full h-1/4 pointer-events-none z-0 bg-gradient-to-b from-backgroundSecondary to-navPrimary" />
      <div className="pb-5 border-b-2 border-textPrimary relative z-10">
        <div className="flex gap-2 items-center">
          <h1 className="text-5xl font-semibold text-textSecondary">
            TechNova 2025 Hacker Application
          </h1>
          <Image
            src="/themed_assets/grass2.png"
            alt="grass"
            width={30}
            height={30}
          />
        </div>
        <div className="pt-12 text-textPrimary">
          <h3 className="text-xl">
            Thanks for your interest in attending the University of Waterloo's
            Women+ in Tech Hackathon!
          </h3>
          <br />
          <p>
            Our in-person event is open to all women and non-binary identifying
            students. Student attendees can be enrolled at university level of
            study, or non-traditional institution (code bootcamp, home school,
            online, etc.). You do not need any coding experience to apply as a
            hacker!
          </p>
          <br />
          <p>
            Fri. Sept 27, 2025 - Sun. Sept 29, 2025 <br />
            → 36-hour in person hackathon to bring your ideas to life! <br />→
            Build your project, get mentorship, and demo your submission!
          </p>
          <br />
          <p>
            You can save your progress at any time and come back. You can also
            edit even after you submit, so don't worry! We'll be reviewing
            applications on a rolling basis, so make sure to apply early!
          </p>
          <br />
          <p className="font-bold">
            🚨 Hacker Application Deadline: July 4, 2025 @ 11:59 PM EST 🚨
          </p>
          <br />
          <p>
            If you require any accommodations or have any questions please email
            us at:{' '}
            <a className="underline" href="mailto:hello@itstechnova.org">
              hello@itstechnova.org
            </a>
            . <br />
            For more information and FAQ, visit{' '}
            <a className="underline" href="https://itstechnova.org/">
              itstechnova.org
            </a>
            .
          </p>
        </div>
      </div>
      <div className="py-32 text-left w-1/2 md:w-3/5 relative z-10">
        <form>
          <div className="flex flex-col gap-24 text-textPrimary">
            <div className="flex flex-col gap-5">
              <label className="text-base font-bold">Email</label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-buttonSecondary shadow-xs shadow-navSecondary"
                placeholder="ex. janesmith@gmail.com"
              />
            </div>
            <div className="flex flex-col gap-5">
              <label className="text-base font-bold">
                How old will you be as of September 27, 2025?
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-buttonSecondary shadow-xs shadow-navSecondary"
                placeholder="ex. 21"
              />
            </div>
          </div>
          <button className="bg-buttonPrimary px-8 py-2 mt-24 text-white text-2xl rounded-xl w-auto shadow-xs shadow-navSecondary">
            →
          </button>
        </form>
      </div>
      <Image
        className="absolute bottom-0 right-0 z-10"
        src="/themed_assets/bunnywithflower.svg"
        alt="flower bunny"
        width={800}
        height={800}
      />
    </div>
  );
}

export default HackerLandingForm;
