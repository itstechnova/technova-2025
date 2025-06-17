import React from 'react';

function LoginPage() {
  return (
    <div className="min-h-screen bg-navPrimary">
      <div className="pt-52 p-24 flex flex-col h-full bg-navPrimary relative">
        <h1 className="text-8xl font-semibold text-textPrimary">
          Welcome to <br />
          Tech
          <span className="bg-gradient-to-r from-textGradientPurple to-textGradientRed inline-block text-transparent bg-clip-text">
            Nova
          </span>
          ,
        </h1>
        <h1 className="pt-2 text-7xl font-semibold text-textPrimary">
          Let's get started!
        </h1>
        <p className="text-2xl py-10 text-textPrimary font-normal">
          Sign in or create an account to apply, build your team, and experience
          the hackathon of the year.
        </p>
        <div className="flex flex-col gap-4">
          <div className="px-8 py-3 bg-textPrimary text-white font-semibold text-xl rounded-lg shadow-md hover:bg-[#2A2346] transition-colors w-fit">
            <a href="/account/create">Create an Account</a>
          </div>
          <div className="text-lg text-textPrimary">
            Already have an account?{' '}
            <a href="/account/login" className="underline">
              Log in here!
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
