"use client";
import MentorRoleForm from "@/components/mentor/responseform";
import React, { useState, useEffect } from "react";
import supabase from "@/config/supabaseClient";
import { useAccount } from "@/components/AccountContext";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { stat } from "fs";
import NoFormAccess from "@/components/app/no-access";

interface MentorData {
  onboarding: string;
  hackathon_experience: string[];
  hackathon_experience_other: string;
  resume: string | null;
  additional_links: string;
  role: string;
  role_other: string;
  experience_areas: string[];
  experience_areas_other: string;
  specific_mentorship: string;
  additional_roles: string[];
  referral_source: string[];
  referral_source_other: string;
  specific_referral: string;
  volunteer_interest: string;
  additional_comments: string;
}

function MentorSurvey() {
  const [formError, setFormError] = useState<string | null>(null);
  const { user } = useAccount();
  const [appStatus, setAppStatus] = useState<string>("");
  const router = useRouter();

  const [mentorData, setMentorData] = useState<MentorData>({
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

  const requiredFields = ["onboarding", "resume", "volunteer_interest"];
  const eitherOrRequiredFields = [
    ["role", "role_other"],
    ["experience_areas", "experience_areas_other"],
  ];

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
          resume: response.data.resume ?? fallbackData.resume ?? null,
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
    const loadAppStatus = async () => {
      if (!user?.id) return;

      const response = await supabase
        .from("applications")
        .select("mentor")
        .eq("user_id", user?.id)
        .single();
      if (response.error) {
        throw response.error;
      } else {
        setAppStatus(response.data.mentor);
      }
    };
    loadAppStatus();
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

    if (
      requiredFields.some((field) => !mentorData[field as keyof MentorData]) ||
      eitherOrRequiredFields.some((pair) => {
        const [field1, field2] = pair;
        return (
          !mentorData[field1 as keyof MentorData] &&
          !mentorData[field2 as keyof MentorData]
        );
      })
    ) {
      setFormError("Please fill in all required fields.");
      return;
    } else {
      setFormError(null);
    }

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
      const statusUpdateResponse = await supabase
        .from("applications")
        .update({ mentor: "Submitted" })
        .eq("user_id", user.id);
      if (statusUpdateResponse.error) throw statusUpdateResponse.error;
      router.push("/apply/mentor/thanks");
    }
  };

  const handleResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const filePath = `${user.id}/${uuidv4()}_${file.name}`;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("resumes")
      .upload(filePath, file);

    if (uploadError) {
      console.error("Upload error:", uploadError.message);
      return;
    }

    const { data: publicUrlData } = supabase.storage
      .from("resumes")
      .getPublicUrl(filePath);

    const publicUrl = publicUrlData.publicUrl;

    const { error: dbError } = await supabase
      .from("mentor_application")
      .update({ resume: publicUrl })
      .eq("user_id", user.id);

    if (dbError) {
      console.error("Database update error:", dbError.message);
      return;
    }

    setMentorData((prev) => {
      const updated = { ...prev, resume: publicUrl };
      sessionStorage.setItem("mentorRoleData", JSON.stringify(updated));
      return updated;
    });

    console.log("Resume uploaded and URL saved:", publicUrl);
  };

  return (
    <div className="min-h-screen bg-navPrimary">
      {/* {appStatus === "Not Started" || appStatus === "In Progress" ? ( */}
        <MentorRoleForm
          data={mentorData}
          setData={setMentorData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          handleResumeUpload={handleResumeUpload}
          formError={formError}
          onBack={() => router.push("/apply/mentor/about-you")}
        />
      // ) : (
      //   <NoFormAccess role="mentor" />
      // )}
    </div>
  );
}

export default MentorSurvey;
