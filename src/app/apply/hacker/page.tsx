'use client';

import React, { useState } from 'react';
import HackerLandingForm from '@/components/hacker/landingform';
import supabase from '@/config/supabaseClient';
import { useRouter } from 'next/navigation';

function HackerLanding() {
  const [formError, setFormError] = useState<string | null>(null);
  const [landingData, setLandingData] = useState({
    email: '',
    age2025: '',
  });

  const requiredFields = ['email', 'age2025'];
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      requiredFields.some(
        (field) => !landingData[field as keyof typeof landingData]
      )
    ) {
      setFormError('Please fill in all required fields');
      return;
    } else {
      setFormError(null);
    }

    const { data, error } = await supabase
      .from('hacker_landing')
      .insert([
        {
          email: landingData.email,
          age2025: landingData.age2025,
        },
      ])
      .select();
    if (error) {
      setFormError('Error submitting form');
      console.log('error', error);
    }
    if (data) {
      setFormError(null);
      router.push('/apply/hacker/step-one');
      console.log(JSON.stringify(landingData));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type } = e.target;

    const value = type === 'checkbox' ? e.target.checked : e.target.value;

    setLandingData((prev: typeof landingData) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-navPrimary">
      <HackerLandingForm
        data={landingData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        formError={formError}
      />
    </div>
  );
}

export default HackerLanding;
