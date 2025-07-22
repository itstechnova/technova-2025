"use client";
import MentorRoleForm from "@/components/mentor/responseform";
import React, { useState, useEffect } from "react";
import supabase from "@/config/supabaseClient";
import { useAccount } from "@/components/AccountContext";
import { useRouter } from "next/navigation";

function MentorSurvey() {
  const { user } = useAccount();
  const router = useRouter();

  const [mentorData, setMentorData] = useState({
    onboarding: "",
    hackathon_experience: [],
    hackathon_experience_other: "",
    resume: null,
    additional_links: "",
    role: "",
    role_other: "",
    experience_areas: [],
    experience_areas_other: "",
    specific_mentorship: "",
    additional_roles: [],
    referral_source: [],
    referral_source_other: "",
    specific_referral: "",
    volunteer_interest: "",
    additional_comments: "",
  });

  // Load from Supabase or sessionStorage on mount
  useEffect(() => {
    if (!user?.id) return;
    const loadData = async () => {
      const response = await supabase
        .from("mentor_application")
        .select(
          "onboarding, hackathon_experience, hackathon_experience_other, resume, additional_links, role, role_other, experience_areas, experience_areas_other, specific_mentorship, additional_roles, referral_source, referral_source_other, specific_referral, volunteer_interest, additional_comments"
        )
        .eq("user_id", user.id ? user.id : "")
        .single();

      if (response.error) {
        return;
      } else if (response.data) {
        const fallbackData = JSON.parse(
          sessionStorage.getItem("mentorRoleData") ?? "{}"
        );

        const sanitizedData = {
          onboarding: response.data.onboarding ?? fallbackData.onboarding ?? "",
          hackathon_experience:
            response.data.hackathon_experience ??
            fallbackData.hackathon_experience ??
            [],
          hackathon_experience_other:
            response.data.hackathon_experience_other ??
            fallbackData.hackathon_experience_other ??
            "",
          resume: null, // TODO: handle file uploads
          additional_links:
            response.data.additional_links ??
            fallbackData.additional_links ??
            "",
          role: response.data.role ?? fallbackData.role ?? "",
          role_other: response.data.role_other ?? fallbackData.role_other ?? "",
          experience_areas:
            response.data.experience_areas ??
            fallbackData.experience_areas ??
            [],
          experience_areas_other:
            response.data.experience_areas_other ??
            fallbackData.experience_areas_other ??
            "",
          specific_mentorship:
            response.data.specific_mentorship ??
            fallbackData.specific_mentorship ??
            "",
          additional_roles:
            response.data.additional_roles ??
            fallbackData.additional_roles ??
            [],
          referral_source:
            response.data.referral_source ?? fallbackData.referral_source ?? [],
          referral_source_other:
            response.data.referral_source_other ??
            fallbackData.referral_source_other ??
            "",
          specific_referral:
            response.data.specific_referral ??
            fallbackData.specific_referral ??
            "",
          volunteer_interest:
            response.data.volunteer_interest ??
            fallbackData.volunteer_interest ??
            "",
          additional_comments:
            response.data.additional_comments ??
            fallbackData.additional_comments ??
            "",
        };
        sessionStorage.setItem("mentorRoleData", JSON.stringify(sanitizedData));
        setMentorData(sanitizedData);
        return;
      }

      // fallback to sessionStorage if nothing in Supabase
      const savedData = sessionStorage.getItem("mentorRoleData");
      if (savedData) {
        setMentorData((prev) => ({
          ...prev,
          ...JSON.parse(savedData),
        }));
      }
    };

    loadData();
  }, [user?.id]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, type, value } = e.target;

    if (type === "file") {
      const fileInput = e.target as HTMLInputElement;
      const file = fileInput.files?.[0] || null;
      setMentorData((prev) => {
        const updated = { ...prev, [name]: file };
        sessionStorage.setItem("mentorRoleData", JSON.stringify(updated));
        return updated;
      });
    } else {
      setMentorData((prev) => {
        const updated = { ...prev, [name]: value };
        sessionStorage.setItem("mentorRoleData", JSON.stringify(updated));
        return updated;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user?.id) return;

    // Prepare data for Supabase (exclude file object)
    const {
      resume, // don't send file object to Supabase
      ...dbData
    } = mentorData;

    const { error } = await supabase
      .from("mentor_application")
      .update([
        {
          user_id: user.id,
          ...dbData,
        },
      ])
      .eq("user_id", user.id);

    if (error) {
      console.error("Error updating mentor_application:", error);
    } else {
      sessionStorage.removeItem("mentorRoleData");
      router.push("/");
    }

    // Handle file upload separately if needed
    if (mentorData.resume) {
      // Implement file upload logic here if required
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
