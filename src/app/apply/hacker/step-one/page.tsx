'use client';

import HackerStepOneForm from '@/components/hacker/steponeform';
import React, { useState } from 'react';

function HackerStepOne() {
  const [stepOneData, setStepOneData] = useState({
    firstName: '',
    lastName: '',
    pronouns: '',
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(JSON.stringify(stepOneData));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type } = e.target;

    const value = type === 'checkbox' ? e.target.checked : e.target.value;

    setStepOneData((prev: typeof stepOneData) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <div className="min-h-screen bg-navPrimary">
      <HackerStepOneForm
        data={stepOneData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}

export default HackerStepOne;
