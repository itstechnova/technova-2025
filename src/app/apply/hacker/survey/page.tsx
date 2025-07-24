"use client";

import HackerSurveyForm from "@/components/hacker/surveyform";
import React, { useState, useEffect } from "react";
import supabase from "@/config/supabaseClient";
import { useRouter } from "next/navigation";
import { useAccount } from "@/components/AccountContext";

function HackerSurvey() {
  const router = useRouter();
  const { user } = useAccount();
  const [formError, setFormError] = useState<string | null>(null);
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
  const requiredFiveFields = [
    ["career_sessions", "career_sessions_other"],
    ["technical_sessions", "technical_sessions_other"],
    ["tech_industries", "tech_industries_other"],
    ["tech_fields", "tech_fields_other"],
  ];
  const requiredFields = [
    ["community_sessions", "community_sessions_other"],
    ["themed_sessions", "themed_sessions_other"],
  ];

  useEffect(() => {
    const loadData = async () => {
      const response = await supabase
        .from("hacker_landing")
        .select(
          "career_sessions, career_sessions_other, community_sessions, community_sessions_other, technical_sessions, technical_sessions_other, themed_sessions, themed_sessions_other, tech_industries, tech_industries_other, tech_fields, tech_fields_other"
        )
        .eq("user_id", user.id ? user.id : "")
        .single();

      if (response.error) {
        throw response.error;
      } else if (response.data) {
        const fallbackData = JSON.parse(
          sessionStorage.getItem("hackerSurveyData") ?? "{}"
        );

        const mergedData = {
          career_sessions:
            response.data.career_sessions ?? fallbackData.career_sessions ?? "",
          career_sessions_other:
            response.data.career_sessions_other ??
            fallbackData.career_sessions_other ??
            "",
          community_sessions:
            response.data.community_sessions ??
            fallbackData.community_sessions ??
            "",
          community_sessions_other:
            response.data.community_sessions_other ??
            fallbackData.community_sessions_other ??
            "",
          technical_sessions:
            response.data.technical_sessions ??
            fallbackData.technical_sessions ??
            "",
          technical_sessions_other:
            response.data.technical_sessions_other ??
            fallbackData.technical_sessions_other ??
            "",
          themed_sessions:
            response.data.themed_sessions ?? fallbackData.themed_sessions ?? "",
          themed_sessions_other:
            response.data.themed_sessions_other ??
            fallbackData.themed_sessions_other ??
            "",
          tech_industries:
            response.data.tech_industries ?? fallbackData.tech_industries ?? "",
          tech_industries_other:
            response.data.tech_industries_other ??
            fallbackData.tech_industries_other ??
            "",
          tech_fields:
            response.data.tech_fields ?? fallbackData.tech_fields ?? "",
          tech_fields_other:
            response.data.tech_fields_other ??
            fallbackData.tech_fields_other ??
            "",
        };
        sessionStorage.setItem("hackerSurveyData", JSON.stringify(mergedData));
        setSurveyData(mergedData);
        return;
      }
    };
    loadData();
  }, [user?.id]);

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
    if (
      requiredFiveFields.some(([field, otherField]) => {
        let totalSelected = 0;
        const arrayField = surveyData[field as keyof typeof surveyData];
        const otherText = surveyData[otherField as keyof typeof surveyData];

        if (Array.isArray(arrayField)) {
          totalSelected += arrayField.length;
        }

        if (typeof otherText === "string" && otherText.trim() !== "") {
          totalSelected += 1;
        }

        return totalSelected < 5;
      })
    ) {
      setFormError("Please select at least 5 of all required fields");
      return;
    } else if (
      requiredFields.some(([field, otherField]) => {
        const arrayField = surveyData[field as keyof typeof surveyData];
        const otherText = surveyData[otherField as keyof typeof surveyData];
        return (
          !Array.isArray(arrayField) &&
          arrayField.length === 0 &&
          typeof otherText === "string" &&
          otherText.trim() === ""
        );
      })
    ) {
      setFormError("Please fill in all required fields");
      return;
    } else {
      setFormError(null);
    }
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
        formError={formError}
        onBack={() => router.push("/apply/hacker/short-answers")}
      />
    </div>
  );
}

export default HackerSurvey;
