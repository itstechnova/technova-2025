import React from 'react';
import Image from 'next/image';

function HackerLandingForm() {
  return (
    <div className="p-24 flex flex-col items-center h-screen bg-navPrimary">
      <div className="pb-5 border-b-2 border-textPrimary">
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
      <div className="py-32 ">
        {/* TODO: refactor form  */}
        <form>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border
                                       border-gray-300 rounded-md
                                       focus:outline-none focus:ring-2
                                       focus:ring-indigo-500"
              placeholder=""
            />
          </div>
          <button className="bg-buttonPrimary px-8 py-2 text-white rounded-md">
            →
          </button>
        </form>
      </div>
    </div>
  );
}

export default HackerLandingForm;
