"use client";

import HackerSurveyForm from "@/components/hacker/surveyform";
import React, { useState } from "react";
import supabase from "@/config/supabaseClient";
import { useRouter } from "next/navigation";
import { useAccount } from "@/components/AccountContext";

function HackerSurvey() {
  const router = useRouter();
  const { user } = useAccount();
  const [surveyData, setSurveyData] = useState({
    career_sessions: [],
    career_sessions_other: "",
    community_sessions: [],
    community_sessions_other: "",
    technical_sessions: [],
    technical_sessions_other: "",
    themed_sessions: [],
    themed_sessions_other: "",
    tech_industries: [],
    tech_industries_other: "",
    tech_fields: [],
    tech_fields_other: "",
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Do validation here
    console.log(JSON.stringify(surveyData));
    const response = await supabase
      .from("hacker_landing")
      .update([surveyData])
      .eq("user_id", user.id)
      .select();

    if (response.error) {
      console.log(response.error);
      throw response.error;
    } else {
      sessionStorage.removeItem("hackerSurveyData");
      console.log("data submitted");
      router.push("/apply/hacker/demographic");
    }
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
