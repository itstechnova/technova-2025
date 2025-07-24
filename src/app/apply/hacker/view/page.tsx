"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/base-ui/button";
import supabase from "@/config/supabaseClient";
import { useAccount } from "@/components/AccountContext";

export default function HackerView() {
  const { user } = useAccount();
  const [appData, setAppData] = useState<Record<string, any>>({});

  const appFields = [
    { label: "Email", field: "email" },
    { label: "Age (Sept 2025)", field: "age2025" },
    { label: "First Name", field: "firstName" },
    { label: "Last Name", field: "lastName" },
    { label: "Pronouns", field: "pronouns" },
    { label: "T-Shirt Size", field: "tshirtSize" },
    { label: "Level of Study", field: "levelOfStudy" },
    { label: "Level of Study (Other)", field: "levelOfStudyOther" },
    { label: "Graduating Year", field: "graduatingYear" },
    { label: "Graduating Year (Other)", field: "graduatingYearOther" },
    { label: "University", field: "university" },
    { label: "University (Other)", field: "universityOther" },
    { label: "Major", field: "major" },
    { label: "Hackathon Count", field: "hackathonCount" },
    { label: "How Did You Hear About Us?", field: "hearAboutUs" },
    { label: "How Did You Hear About Us (Other)", field: "hearAboutUsOther" },
    { label: "MLH Requirement 1", field: "mandatory_requirement_1" },
    { label: "MLH Requirement 2", field: "mandatory_requirement_2" },
    { label: "MLH Optional Question", field: "optional" },
    { label: "Q1", field: "long_answer_q1" },
    { label: "Q2 Selected Option", field: "selected_option" },
    { label: "Q2", field: "long_answer_q2" },
    { label: "Q3", field: "long_answer_q3" },
    { label: "Q4", field: "long_answer_q4" },
    { label: "Career Sessions", field: "career_sessions" },
    { label: "Career Sessions (Other)", field: "career_sessions_other" },
    { label: "Community Sessions", field: "community_sessions" },
    { label: "Community Sessions (Other)", field: "community_sessions_other" },
    { label: "Technical Sessions", field: "technical_sessions" },
    { label: "Technical Sessions (Other)", field: "technical_sessions_other" },
    { label: "Themed Sessions", field: "themed_sessions" },
    { label: "Themed Sessions (Other)", field: "themed_sessions_other" },
    { label: "Tech Industries", field: "tech_industries" },
    { label: "Tech Industries (Other)", field: "tech_industries_other" },
    { label: "Tech Fields", field: "tech_fields" },
    { label: "Tech Fields (Other)", field: "tech_fields_other" },
    { label: "Ethnicity", field: "ethnicity" },
    { label: "Ethnicity (Other)", field: "ethnicity_other" },
    { label: "Gender", field: "gender" },
    { label: "Gender (Other)", field: "gender_other" },
    { label: "Minority Categories", field: "minority_categories" },
    { label: "First to Pursue Tech?", field: "first_to_pursue_tech" },
    { label: "Time Studying Tech", field: "time_studying_tech" },
  ];

  useEffect(() => {
    const loadData = async () => {
      const response = await supabase
        .from("hacker_landing")
        .select("*")
        .eq("user_id", user.id ? user.id : "")
        .single();
      if (response.error) {
        throw response.error;
      } else {
        setAppData(response.data);
      }
    };
    loadData();
  }, [user?.id]);

  return (
    <div className="relative min-h-screen bg-navPrimary">
      {/* Gradient Background */}
      <div
        className="fixed inset-x-0 top-0 h-1/3 pointer-events-none z-0
                   bg-gradient-to-b from-backgroundSecondary to-navPrimary"
      />

      {/* Main Content */}
      <div className="pt-10 md:pt-24 relative z-10 mx-auto px-6 lg:px-24 py-12">
        {/* Header */}
        <div className="flex flex-row items-end justify-between gap-2 pb-10">
          <h1 className="text-4xl md:text-5xl font-semibold text-textSecondary">
            Your Hacker Application
          </h1>
          <Link href="/apply/dashboard">
            <Button variant="link">Back to Dashboard</Button>
          </Link>
        </div>

        {/* Body Text */}
        <div className="flex flex-col gap-4">
          {appFields.map(({ label, field }) => {
            const value = appData[field];

            return (
              <div key={field} className="flex flex-col gap-1">
                <h2 className="text-lg font-semibold text-textSecondary">
                  {label}
                </h2>
                {Array.isArray(value) ? (
                  <ul className="list-disc pl-6">
                    {value.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-textPrimary">
                    {value || <em className="text-gray-400">Not provided</em>}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
