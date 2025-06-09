"use client";

import HackerShortAnswersForm from "@/components/hacker/shortanswersform";
import React, { useState } from "react";

function HackerShortAnswers() {
  const [shortAnswersData, setShortAnswersData] = useState({
    longAnswerQ1: "",
    longAnswerQ2: "",
    selectedOption: "",
    longAnswerQ3: "",
    longAnswerQ4: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, type, value } = e.target;
    setShortAnswersData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Do validation here
    console.log(JSON.stringify(shortAnswersData));
  };

  return (
    <div className="min-h-screen bg-navPrimary">
      <HackerShortAnswersForm
        data={shortAnswersData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}

export default HackerShortAnswers;
