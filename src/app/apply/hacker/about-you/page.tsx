"use client";

import HackerAboutYouForm from "@/components/hacker/aboutyouform";
import React, { useState } from "react";

function HackerAboutYou() {
  const [aboutYouData, setAboutYouData] = useState({
    firstName: "",
    lastName: "",
    pronouns: "",
    tshirtSize: "",
    levelOfStudy: "",
    levelOfStudyOther: "",
    graduatingYear: "",
    graduatingYearOther: "",
    university: "",
    universityOther: "",
    major: "",
    hackathonCount: "",
    hearAboutUs: [],
    hearAboutUsOther: "",
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Do validation here
    console.log(JSON.stringify(aboutYouData));
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
