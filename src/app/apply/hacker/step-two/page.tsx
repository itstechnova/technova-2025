"use client";

import HackerStepTwoForm from "@/components/hacker/steptwoform";
import React, { useState } from "react";

function HackerStepTwo() {
  const [stepTwoData, setStepTwoData] = useState<Record<string, string>>({
    mandatoryRequirement1: "",
    mandatoryRequirement2: "",
    optional: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, type, value } = e.target;
    setStepTwoData((prev) => ({
      ...prev,
      [name]: (e.target as HTMLInputElement).checked ? value : "",
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Do validation here
    console.log(JSON.stringify(stepTwoData));
  };

  return (
    <div className="min-h-screen bg-navPrimary">
      <HackerStepTwoForm
        data={stepTwoData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}

export default HackerStepTwo;
