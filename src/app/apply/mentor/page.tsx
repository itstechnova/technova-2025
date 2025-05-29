"use client";

import React, { useState } from "react";
import MentorLandingForm from "@/components/mentor/landingform";

function MentorLanding() {
  const [landingData, setLandingData] = useState({
    email: "",
    age2025: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(JSON.stringify(landingData));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type } = e.target;

    const value = type === "checkbox" ? e.target.checked : e.target.value;

    setLandingData((prev: typeof landingData) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-navPrimary">
      <MentorLandingForm
        data={landingData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}

export default MentorLanding;
