'use client';

import HackerStepOneForm from '@/components/hacker/steponeform';
import React, { useState } from 'react';

function HackerStepOne() {
  const [stepOneData, setStepOneData] = useState({
    firstName: '',
    lastName: '',
    pronouns: '',
    tshirtSize: '',
    levelOfStudy: '',
    levelOfStudyOther: '',
    graduatingYear: '',
    graduatingYearOther: '',
    university: '',
    universityOther: '',
    major: '',
    hackathonCount: '',
    hearAboutUs: [],
    hearAboutUsOther: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, type, value } = e.target;
    setStepOneData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Do validation here
    console.log(JSON.stringify(stepOneData));
  };

  return (
    <div className="min-h-screen bg-navPrimary">
      <HackerStepOneForm
        data={stepOneData}
        setData={setStepOneData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}

export default HackerStepOne;
