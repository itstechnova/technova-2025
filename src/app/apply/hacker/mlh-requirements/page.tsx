"use client";

import HackerMLHForm from "@/components/hacker/mlhform";
import React, { useState } from "react";
import supabase from "@/config/supabaseClient";
import { useRouter } from "next/navigation";
import { useAccount } from "@/components/AccountContext";

function HackerMLHRequirements() {
  const router = useRouter();
  const { user } = useAccount();

  const [mlhData, setMLHData] = useState({
    mandatory_requirement_1: "",
    mandatory_requirement_2: "",
    optional: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setMLHData((prev) => ({
      ...prev,
      [name]: (e.target as HTMLInputElement).checked ? value : "",
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Do validation here
    console.log(JSON.stringify(mlhData));
    const response = await supabase
      .from("hacker_landing")
      .update([mlhData])
      .eq("user_id", user.id)
      .select();
    if (response.error) {
      console.log(response.error);
      throw response.error;
    } else {
      // setFormError(null);
      sessionStorage.removeItem("hackerMLHData");
      console.log("data submitted");
      router.push("/apply/hacker/survey");
    }
  };

  return (
    <div className="min-h-screen bg-navPrimary">
      <HackerMLHForm
        data={mlhData}
        setData={setMLHData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}

export default HackerMLHRequirements;
