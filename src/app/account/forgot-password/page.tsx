'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import ShortAnswerQuestion from '@/components/shortanswerq';
import SubmitButton from '@/components/submitButton';
import supabase from '@/config/supabaseClient';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError('');
    setFormSuccess('');
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/account/update-password`,
    });
    if (error) {
      setFormError(error.message);
    } else {
      setFormSuccess('Password reset email sent! Please check your inbox.');
    }
  };

  return (
    <div className="min-h-screen bg-navPrimary flex flex-col justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg mx-auto bg-white/80 rounded-xl shadow-md px-8 py-12 mt-24"
      >
        <h1 className="text-3xl font-bold text-textPrimary mb-6">
          Forgot Your Password?
        </h1>
        <p className="text-base text-textPrimary mb-8">
          Enter your email address and we'll send you a link to reset your
          password.
        </p>
        <ShortAnswerQuestion
          question="Email Address"
          name="email"
          id="email"
          type="email"
          placeholder="ex. jane.smith@domain.com"
          value={email}
          onChange={handleChange}
          required
        />
        <SubmitButton className="bg-textPrimary hover:bg-buttonSecondary px-8 py-3 text-xl font-semibold rounded-lg shadow-md w-full mt-8 text-white transition-all duration-300">
          Send Reset Link
        </SubmitButton>
        {formError && <div className="text-red-500 mt-4">{formError}</div>}
        {formSuccess && (
          <div className="text-green-500 mt-4">{formSuccess}</div>
        )}
        <div className="mt-8 text-base text-textPrimary text-center">
          <Link
            href="/account/login"
            className="underline text-textPrimary hover:text-buttonSecondary"
          >
            Back to Login
          </Link>
        </div>
      </form>
    </div>
  );
}
