"use client";

import React, { useState, useEffect } from "react";
import MentorLandingForm from "@/components/mentor/landingform";
import supabase from "@/config/supabaseClient";
import { useAccount } from "@/components/AccountContext";
import { useRouter } from "next/navigation";

function MentorLanding() {
  const [formError, setFormError] = useState<string | null>(null);
  const { user } = useAccount();
  const router = useRouter();

  const [landingData, setLandingData] = useState({
    email: "",
    acknowledgement: "No.",
  });

  const requiredFields = ["email"];

  // Load from Supabase or sessionStorage on mount
  useEffect(() => {
    const loadData = async () => {
      const response = await supabase
        .from("mentor_application")
        .select("email, acknowledgement")
        .eq("user_id", user.id ? user.id : "")
        .single();

      if (response.error) {
        throw response.error;
      } else if (response.data) {
        const fallbackData = JSON.parse(
          sessionStorage.getItem("mentorLandingData") ?? "{}"
        );

        const mergedData = {
          email: response.data.email ?? fallbackData.email ?? "",
          acknowledgement:
            response.data.acknowledgement ??
            fallbackData.acknowledgement ??
            "No.",
        };
        sessionStorage.setItem("mentorLandingData", JSON.stringify(mergedData));
        setLandingData(mergedData);
        return;
      }
    };
    loadData();
  }, [user?.id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, value: inputValue, checked } = e.target;
    if (!name) {
      console.warn("handleChange called on an input without a name. Skipping.");
      return;
    }

    const value = type === "checkbox" ? (checked ? "Yes." : "No.") : inputValue;

    setLandingData((prev) => {
      const updated = { ...prev, [name]: value };
      sessionStorage.setItem("mentorLandingData", JSON.stringify(updated));
      return updated;
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      requiredFields.some(
        (field) => !landingData[field as keyof typeof landingData]
      )
    ) {
      setFormError("Please fill in all required fields");
      return;
    } else if (landingData.acknowledgement === "No.") {
      setFormError("You must acknowledge the requirements to continue.");
      return;
    } else {
      setFormError(null);
    }

    const { ["undefined"]: _bad, ...cleanData } = landingData;

    const mentorApplicationResponse = await supabase
      .from("mentor_application")
      .update([
        {
          user_id: user.id,
          ...cleanData,
        },
      ])
      .eq("user_id", user.id);

    const applicationsResponse = await supabase
      .from("applications")
      .update({ mentor: "In Progress" })
      .eq("user_id", user.id)
      .eq("mentor", "Not Started")
      .select();

    console.log(applicationsResponse.data);

    if (mentorApplicationResponse.error) {
      console.error(
        "Error updating mentor_application:",
        mentorApplicationResponse.error
      );
      // Optionally show error to user
    } else if (applicationsResponse.error) {
      throw applicationsResponse.error;
    } else {
      sessionStorage.removeItem("mentorLandingData");
      router.push("/apply/mentor/about-you");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-navPrimary">
      <MentorLandingForm
        data={landingData}
        setData={setLandingData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        formError={formError}
      />
    </div>
  );
}

export default MentorLanding;
