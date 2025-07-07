"use client";

import HackerDemographicForm from "@/components/hacker/demographicform";
import React, { useState } from "react";
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
    console.log(JSON.stringify(demographicData));
    const response = await supabase
      .from("hacker_landing")
      .update([demographicData])
      .eq("user_id", user.id)
      .select();

    if (response.error) {
      console.log(response.error);
      throw response.error;
    } else {
      // setFormError(null);
      sessionStorage.removeItem("hackerDemographicData");
      console.log("data submitted!");
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
