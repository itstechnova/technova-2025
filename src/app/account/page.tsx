import React from "react";
import Image from "next/image";

function LoginPage() {
  return (
    <div className="min-h-screen bg-navPrimary relative overflow-hidden">
      <div className="pt-20 md:pt-52 p-10 md:p-24 flex flex-col md:h-full bg-navPrimary relative md:w-3/5">
        <h1 className="z-10 text-5xl md:text-8xl font-bold md:font-semibold text-textPrimary">
          Welcome to <br />
          Tech
          <span className="bg-gradient-to-r from-textGradientPurple to-textGradientRed inline-block text-transparent bg-clip-text">
            Nova
          </span>
          ,
        </h1>
        <h1 className="z-10 pt-2 text-3xl md:text-7xl font-semibold text-textPrimary">
          Let's get started!
        </h1>
        <p className="text-base md:text-2xl py-10 text-textPrimary font-normal">
          Sign in or create an account to apply, build your team, and experience
          the hackathon of the year.
        </p>
        <div className="flex flex-col gap-4">
          <div className="px-8 py-3 bg-textPrimary text-white font-semibold text-base md:text-xl rounded-lg shadow-md hover:bg-[#2A2346] transition-colors w-fit">
            <a href="/account/create">Create an Account</a>
          </div>
          <div className="text-base md:text-lg text-textPrimary">
            Already have an account?{" "}
            <a href="/account/login" className="underline">
              Log in here!
            </a>
          </div>
        </div>
      </div>
      <Image
        className="hidden md:block absolute bottom-0 right-[-200px] z-10 w-3/5 pointer-events-none"
        src="/themed_assets/goose.svg"
        alt="goose"
        width={800}
        height={800}
      />
      <Image
        className="hidden md:block absolute top-[-100px] left-[-100px] z-0 w-1/3 pointer-events-none"
        src="/themed_assets/flower-buttercup.svg"
        alt="Buttercup flower"
        width={800}
        height={800}
      />
    </div>
  );
}

export default LoginPage;
