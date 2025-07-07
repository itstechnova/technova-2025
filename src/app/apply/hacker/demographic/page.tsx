"use client";

import HackerDemographicForm from "@/components/hacker/demographicform";
import React, { useState } from "react";

function HackerDemographic() {
  const [demographicData, setDemographicData] = useState({
    ethnicity: [],
    ethnicity_other: "",
    gender: "",
    gender_other: "",
    minority_categories: [],
    first_to_pursue_tech: "",
    time_studying_tech: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setDemographicData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Do validation here
    console.log(JSON.stringify(demographicData));
  };

  return (
    <div className="min-h-screen bg-navPrimary">
      <HackerDemographicForm
        data={demographicData}
        setData={setDemographicData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}

export default HackerDemographic;
