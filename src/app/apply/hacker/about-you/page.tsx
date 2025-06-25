'use client';

import HackerAboutYouForm from '@/components/hacker/aboutyouform';
import supabase from '@/config/supabaseClient';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

function HackerAboutYou() {
  const [formError, setFormError] = useState<string | null>(null);
  const router = useRouter();
  const [aboutYouData, setAboutYouData] = useState({
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
    const { name, value } = e.target;
    setAboutYouData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { data, error } = await supabase.from('hacker_landing').upsert([
      {
        firstName: aboutYouData.firstName,
        lastName: aboutYouData.lastName,
        pronouns: aboutYouData.pronouns,
        tshirtSize: aboutYouData.tshirtSize,
        levelOfStudy: aboutYouData.levelOfStudy,
        levelOfStudyOther: aboutYouData.levelOfStudyOther,
        graduatingYear: aboutYouData.graduatingYear,
        graduatingYearOther: aboutYouData.graduatingYearOther,
        university: aboutYouData.university,
        universityOther: aboutYouData.universityOther,
        major: aboutYouData.major,
        hackathonCount: aboutYouData.hackathonCount,
        hearAboutUs: aboutYouData.hearAboutUs,
        hearAboutUsOther: aboutYouData.hearAboutUsOther,
      },
    ]);
    if (error) {
      setFormError('Error submitting form');
      console.log('error', error);
    } else {
      setFormError(null);
      router.push('/apply/hacker/mlh-requirements');
      // console.log(JSON.stringify(landingData));
    }
  };

  return (
    <div className="min-h-screen bg-navPrimary">
      <HackerAboutYouForm
        data={aboutYouData}
        setData={setAboutYouData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}

export default HackerAboutYou;
