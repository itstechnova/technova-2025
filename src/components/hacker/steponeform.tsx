import React from 'react';
import Image from 'next/image';

interface HackerLandingFormProps {
  data: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

function HackerStepOneForm() {
  return (
    <div className="flex flex-col h-full bg-navPrimary relative">
      <div className="absolute top-0 left-0 w-full h-1/4 pointer-events-none z-0 bg-gradient-to-b from-backgroundSecondary to-navPrimary">
        <div className="p-24">
          <div className="flex gap-2 items-center pb-8">
            <h1 className="text-5xl font-semibold text-textSecondary z-1">
              Let's get to know you better!
            </h1>
            <Image
              src="/themed_assets/Sunflower.png"
              alt="grass"
              width={40}
              height={40}
            />
          </div>

          <form className="form">
            <div className="flex flex-col gap-24 text-textPrimary">
              <div className="flex gap-auto w-full">
                <div className="flex flex-col gap-5">
                  <label className="text-base font-bold">Email</label>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-buttonSecondary shadow-xs shadow-navSecondary"
                    placeholder="ex. janesmith@gmail.com"
                  />
                </div>
                <div className="flex flex-col gap-5">
                  <label className="text-base font-bold">Email</label>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-buttonSecondary shadow-xs shadow-navSecondary"
                    placeholder="ex. janesmith@gmail.com"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-5">
                <label className="text-base font-bold">
                  How old will you be as of September 27, 2025?
                </label>
                <input
                  type="text"
                  name="age2025"
                  id="age2025"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-buttonSecondary shadow-xs shadow-navSecondary"
                  placeholder="ex. 21"
                />
              </div>
            </div>
            <button
              type="submit"
              className="bg-buttonPrimary px-8 py-2 mt-24 text-white text-2xl rounded-xl w-auto shadow-xs shadow-navSecondary"
            >
              →
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default HackerStepOneForm;
