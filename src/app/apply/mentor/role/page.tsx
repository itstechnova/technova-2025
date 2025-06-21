"use client";
import MentorRoleForm from "@/components/mentor/responseform";
import React, { useState } from "react";

function MentorSurvey() {
  const [mentorData, setMentorData] = useState({
    onboarding: "",
    hackathonExperience: [],
    hackathonExperienceOther: "",
    resume: null,
    additionalLinks: "",
    role: "",
    roleOther: "",
    experienceAreas: [],
    experienceAreasOther: "",
    specificMentorship: "",
    additionalRoles: [],
    referralSource: [],
    referralSourceOther: "",
    specificReferral: "",
    volunteerInterest: "",
    additionalComments: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, type, value } = e.target;
    
    if (type === "file") {
      const fileInput = e.target as HTMLInputElement;
      const file = fileInput.files?.[0] || null;
      setMentorData((prev) => ({
        ...prev,
        [name]: file,
      }));
    } else {
      setMentorData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Do validation here
    console.log(JSON.stringify(mentorData, null, 2));
    
    // Handle file upload separately if needed
    if (mentorData.resume) {
      console.log("Resume file:", mentorData.resume);
    }
  };

  return (
    <div className="min-h-screen bg-navPrimary">
      <MentorRoleForm
        data={mentorData}
        setData={setMentorData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}

export default MentorSurvey;