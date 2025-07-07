"use client";
"use client";

import React, { useState } from "react";
import HackerLandingForm from "@/components/hacker/landingform";
import supabase from "@/config/supabaseClient";
import { useRouter } from "next/navigation";
import { useAccount } from "@/components/AccountContext";

function HackerLanding() {
  const [formError, setFormError] = useState<string | null>(null);
  const [landingData, setLandingData] = useState({
    email: "",
    age2025: "",
  });

  const requiredFields = ["email", "age2025"];
  const router = useRouter();
  const { user } = useAccount();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      requiredFields.some(
        (field) => !landingData[field as keyof typeof landingData]
      )
    ) {
      setFormError("Please fill in all required fields");
      setFormError("Please fill in all required fields");
      return;
    } else {
      setFormError(null);
    }
 
    console.log(JSON.stringify(landingData));
    
    const { data, error } = await supabase
      .from("hacker_landing")
      .update([
        {
          email: landingData.email,
          age2025: landingData.age2025,
        },
      ])
      .eq("user_id", user.id);
    if (error) {
      setFormError("Error submitting form");
      console.log("error", error);
    } else {
      setFormError(null);
      sessionStorage.removeItem("hackerLandingData");
      console.log("data submitted :o");
      router.push("/apply/hacker/about-you");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type } = e.target;

    const value = type === "checkbox" ? e.target.checked : e.target.value;

    setLandingData((prev: typeof landingData) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-navPrimary">
      <HackerLandingForm
        data={landingData}
        setData={setLandingData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        formError={formError}
      />
    </div>
  );
}

export default HackerLanding;
