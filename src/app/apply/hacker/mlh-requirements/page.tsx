"use client";

import HackerMLHForm from "@/components/hacker/mlhform";
import React, { useState } from "react";

function HackerMLHRequirements() {
  const [mlhData, setMLHData] = useState({
    mandatoryRequirement1: "",
    mandatoryRequirement2: "",
    optional: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, type, value } = e.target;
    setMLHData((prev) => ({
      ...prev,
      [name]: (e.target as HTMLInputElement).checked ? value : "",
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Do validation here
    console.log(JSON.stringify(mlhData));
  };

  return (
    <div className="min-h-screen bg-navPrimary">
      <HackerMLHForm
        data={mlhData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}

export default HackerMLHRequirements;
