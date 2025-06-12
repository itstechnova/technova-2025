import React from 'react';
import Link from 'next/link';

export default function CreateAccountPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-navPrimary">
      <h1 className="text-4xl font-bold mb-8 text-textPrimary">
        Create an Account
      </h1>
      {/* TODO: Add sign-up form here */}
      <div className="mt-4">
        <Link
          href="/login"
          className="text-[#1A1536] underline hover:text-[#2A2346]"
        >
          Back to Login
        </Link>
      </div>
    </div>
  );
}
