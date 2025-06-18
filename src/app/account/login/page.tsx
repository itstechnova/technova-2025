'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import ShortAnswerQuestion from '@/components/shortanswerq';
import SubmitButton from '@/components/submitButton';
import Image from 'next/image';
import supabase from '@/config/supabaseClient';

export default function SignUpPage() {
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });

  const [loginFormError, setLoginFormError] = useState('');
  const [loginFormSuccess, setLoginFormSuccess] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginForm((prev) => ({ ...prev, [name]: value }));
  };

  async function signInWithEmail() {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: loginForm.email,
      password: loginForm.password,
    });
    if (data) {
      setLoginFormError('');
      setLoginFormSuccess('Login successful');
    } else {
      setLoginFormError('Login failed');
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signInWithEmail();
  };

  return (
    <div className="min-h-screen bg-navPrimary relative">
      <div className="flex flex-col md:flex-row w-full h-full justify-between items-center">
        <form
          onSubmit={handleSubmit}
          className="flex-1 w-full mx-auto bg-transparent pt-24 p-24 rounded-xl shadow-none z-10"
        >
          <h1 className="text-5xl font-bold text-textPrimary mb-2 flex items-center gap-2">
            Log In 🚀
          </h1>
          <p className="text-xl font-semibold text-textPrimary mb-10">
            Log in to access and manage your application.
          </p>
          <div className="flex flex-col gap-8 mb-4 w-3/5">
            <ShortAnswerQuestion
              question="Email Address*"
              name="email"
              id="email"
              type="email"
              value={loginForm.email}
              onChange={handleChange}
              required
            />
            <ShortAnswerQuestion
              question="Password*"
              name="password"
              id="password"
              type="password"
              value={loginForm.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="my-6 flex flex-col gap-8">
            <Link href="#" className="underline text-textPrimary text-base">
              Forgot your password?
            </Link>

            <SubmitButton
              type="submit"
              className="bg-textPrimary text-white px-8 py-3 text-xl font-semibold rounded-lg shadow-md w-32 mb-4"
            >
              Log In
            </SubmitButton>
            <div className=" text-base text-textPrimary">
              Don't have an account yet?{' '}
              <Link
                href="/account/create"
                className="underline text-textPrimary"
              >
                Create one here!
              </Link>
            </div>
          </div>
          {loginFormError && (
            <div className="text-red-500">{loginFormError}</div>
          )}
          {loginFormSuccess && (
            <div className="text-green-500">{loginFormSuccess}</div>
          )}
        </form>
      </div>
      <Image
        className="absolute bottom-0 right-0 z-10 pointer-events-none"
        src="/themed_assets/bunnywithflower.svg"
        alt="flower bunny"
        width={800}
        height={800}
      />
    </div>
  );
}
