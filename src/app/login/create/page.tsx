'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import ShortAnswerQuestion from '@/components/shortanswerq';
import SubmitButton from '@/components/submitButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

export default function CreateAccountPage() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    codeOfConduct: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleCustomCheckbox = () => {
    setForm((prev) => ({ ...prev, codeOfConduct: !prev.codeOfConduct }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: handle sign up logic
  };

  return (
    <div className="min-h-screen bg-navPrimary flex flex-col justify-between">
      <form
        onSubmit={handleSubmit}
        className="w-full mx-auto bg-transparent pt-20 p-24 rounded-xl shadow-none"
      >
        <h1 className="text-5xl font-semibold text-textPrimary mb-6">
          Create Your TechNova Account
        </h1>
        <p className="text-xl font-semibold text-textPrimary mb-10">
          Let's get you set up to join the fun.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <ShortAnswerQuestion
            question="First Name*"
            name="firstName"
            id="firstName"
            placeholder="ex. Jane"
            value={form.firstName}
            onChange={handleChange}
            required
          />
          <ShortAnswerQuestion
            question="Last Name*"
            name="lastName"
            id="lastName"
            placeholder="ex. Smith"
            value={form.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex flex-col gap-8 mb-8">
          <ShortAnswerQuestion
            question="Email Address*"
            name="email"
            id="email"
            type="email"
            placeholder="ex. jane.smith@domain.com"
            value={form.email}
            onChange={handleChange}
            required
          />
          <ShortAnswerQuestion
            question="Password*"
            name="password"
            id="password"
            type="password"
            placeholder="type here..."
            value={form.password}
            onChange={handleChange}
            required
          />
          <ShortAnswerQuestion
            question="Confirm Password*"
            name="confirmPassword"
            id="confirmPassword"
            type="password"
            placeholder="type here..."
            value={form.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex items-center mb-8 mt-2">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              id="codeOfConduct"
              name="codeOfConduct"
              checked={form.codeOfConduct}
              onChange={handleCustomCheckbox}
              className="sr-only"
              required
            />
            <div
              className={[
                'w-5 h-5 rounded border-2 flex items-center justify-center transition-colors',
                form.codeOfConduct
                  ? 'border-checkMarkGreen bg-checkMarkGreen'
                  : 'border-gray-300 bg-transparent',
              ].join(' ')}
            >
              {form.codeOfConduct && (
                <FontAwesomeIcon
                  icon={faCheck}
                  className="text-white w-3 h-3"
                />
              )}
            </div>
            <span className="ml-3 text-base text-textPrimary">
              I agree to the{' '}
              <a
                href="https://github.com/MLH/mlh-policies/blob/main/code-of-conduct.md"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold underline text-textPrimary"
              >
                Code of Conduct
              </a>
            </span>
          </label>
        </div>
        <SubmitButton className="text-white bg-textPrimary px-8 py-3 text-xl font-semibold rounded-lg shadow-md w-40">
          Sign Up
        </SubmitButton>
        <div className="mt-8 text-base text-textPrimary">
          Already have an account?{' '}
          <Link href="/login/signup" className="underline text-textPrimary">
            Log in here!
          </Link>
        </div>
      </form>
    </div>
  );
}
