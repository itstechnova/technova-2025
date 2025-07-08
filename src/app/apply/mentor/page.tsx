"use client";

import React, { useState, useEffect } from "react";
import MentorLandingForm from "@/components/mentor/landingform";
import supabase from "@/config/supabaseClient";
import { useAccount } from "@/components/AccountContext";
import { useRouter } from "next/navigation";

function MentorLanding() {
  const { user } = useAccount();
  const router = useRouter();

  const [landingData, setLandingData] = useState({
    email: "",
    acknowledgement: "No.",
  });

  // Load from Supabase or sessionStorage on mount
  useEffect(() => {
    const loadData = async () => {
      const response = await supabase
        .from("mentor_application")
        .select("email, acknowledgement")
        .eq("user_id", user.id)
        .single();

      if (response.error) {
        console.log("Supabase fetch error:", response.error);
        throw response.error;
      } else if (response.data) {
        const fallbackData = JSON.parse(
          sessionStorage.getItem("mentorLandingData") ?? "{}"
        );

        console.log("Loaded from Supabase:", response.data);

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
    const { name, type } = e.target;
    const value =
      type === "checkbox"
        ? e.target.checked
          ? "Yes."
          : "No."
        : e.target.value;

    setLandingData((prev) => {
      const updated = { ...prev, [name]: value };
      sessionStorage.setItem("mentorLandingData", JSON.stringify(updated));
      return updated;
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { error } = await supabase
      .from("mentor_application")
      .update([
        {
          user_id: user.id,
          ...landingData,
        },
      ])
      .eq("user_id", user.id);

    if (error) {
      console.error("Error updating mentor_application:", error);
      // Optionally show error to user
    } else {
      sessionStorage.removeItem("mentorLandingData");
      console.log("Mentor Landing Data submitted:", landingData);
      router.push("/apply/mentor/about-you");
      // Optionally show success to user
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-navPrimary">
      <MentorLandingForm
        data={landingData}
        setData={setLandingData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}

export default MentorLanding;
