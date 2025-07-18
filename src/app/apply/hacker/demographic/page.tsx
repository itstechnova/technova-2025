"use client";

import HackerDemographicForm from "@/components/hacker/demographicform";
import React, { useState, useEffect } from "react";
import supabase from "@/config/supabaseClient";
import { useRouter } from "next/navigation";
import { useAccount } from "@/components/AccountContext";

function HackerDemographic() {
  const router = useRouter();
  const { user } = useAccount();

  const [demographicData, setDemographicData] = useState({
    ethnicity: [],
    ethnicity_other: "",
    gender: "",
    gender_other: "",
    minority_categories: [],
    first_to_pursue_tech: "",
    time_studying_tech: "",
  });

  useEffect(() => {
    const loadData = async () => {
      const response = await supabase
        .from("hacker_landing")
        .select(
          "ethnicity, ethnicity_other, gender, gender_other, minority_categories, first_to_pursue_tech, time_studying_tech"
        )
        .eq("user_id", user.id)
        .single();

      if (response.error) {
        throw response.error;
      } else if (response.data) {
        const fallbackData = JSON.parse(
          sessionStorage.getItem("hackerDemographicData") ?? "{}"
        );
        const sanitizedData = {
          ethnicity: response.data.ethnicity ?? fallbackData.ethnicity ?? [],
          ethnicity_other:
            response.data.ethnicity_other ?? fallbackData.ethnicity_other ?? "",
          gender: response.data.gender ?? fallbackData.gender ?? "",
          gender_other:
            response.data.gender_other ?? fallbackData.gender_other ?? "",
          minority_categories:
            response.data.minority_categories ??
            fallbackData.minority_categories ??
            [],
          first_to_pursue_tech:
            response.data.first_to_pursue_tech ??
            fallbackData.first_to_pursue_tech ??
            "",
          time_studying_tech:
            response.data.time_studying_tech ??
            fallbackData.time_studying_tech ??
            "",
        };
        sessionStorage.setItem(
          "hackerDemographicData",
          JSON.stringify(sanitizedData)
        );
        setDemographicData(sanitizedData);
        return;
      }

      const savedData = sessionStorage.getItem("hackerDemographicData");
      if (savedData) {
        setDemographicData(JSON.parse(savedData));
      }
    };

    if (user?.id) {
      loadData();
    }
  }, [user?.id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setDemographicData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Do validation here
    const response = await supabase
      .from("hacker_landing")
      .update([demographicData])
      .eq("user_id", user.id)
      .select();

    if (response.error) {
      throw response.error;
    } else {
      // setFormError(null);
      sessionStorage.removeItem("hackerDemographicData");
      router.push("/apply/hacker/thanks");
    }
  };

  return (
    <div className="min-h-screen bg-navPrimary">
      <HackerDemographicForm
        data={demographicData}
        setData={setDemographicData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}

export default HackerDemographic;
