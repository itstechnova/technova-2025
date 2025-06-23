"use client";

import HackerSurveyForm from "@/components/hacker/surveyform";
import React, { useState } from "react";

function HackerSurvey() {
  const [surveyData, setSurveyData] = useState({
    careerSessions: [],
    careerSessionsOther: "",
    communitySessions: [],
    communitySessionsOther: "",
    technicalSessions: [],
    technicalSessionsOther: "",
    themedSessions: [],
    themedSessionsOther: "",
    techIndustries: [],
    techIndustriesOther: "",
    techFields: [],
    techFieldsOther: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setSurveyData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Do validation here
    console.log(JSON.stringify(surveyData));
  };

  return (
    <div className="min-h-screen bg-navPrimary">
      <HackerSurveyForm
        data={surveyData}
        setData={setSurveyData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}

export default HackerSurvey;
