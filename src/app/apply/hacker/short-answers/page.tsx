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
    >,
    wordLimit?: number
  ) => {
    const { name, type, value } = e.target;
    let newValue = value;

    if (wordLimit !== undefined) {
      const words = value.trim().split(/\s+/).filter(Boolean);
      if (words.length > wordLimit) {
        newValue = words.slice(0, wordLimit).join(" ");
      }
    }

    setShortAnswersData((prev) => ({
      ...prev,
      [name]: newValue,
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
