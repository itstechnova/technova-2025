"use client";

import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    const loadData = async () => {
      const response = await supabase
        .from("hacker_landing")
        .select("email, age2025")
        .eq("user_id", user.id)
        .single();

      if (response.error) {
        console.log("Supabase fetch error:", response.error);
        throw response.error;
      } else if (response.data) {
        const fallbackData = JSON.parse(
          sessionStorage.getItem("hackerLandingData") ?? "{}"
        );
        console.log("Loaded from Supabase:", response.data);
        const sanitizedData = {
          email: response.data.email ?? fallbackData.email ?? "",
          age2025: response.data.age2025 ?? fallbackData.age2025 ?? "",
        };
        sessionStorage.setItem(
          "hackerLandingData",
          JSON.stringify(sanitizedData)
        );
        setLandingData(sanitizedData);
        return;
      }

      const savedData = sessionStorage.getItem("hackerLandingData");
      if (savedData) {
        console.log("Loaded from sessionStorage");
        setLandingData(JSON.parse(savedData));
      }
    };

    if (user?.id) {
      loadData();
    }
  }, [user?.id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      requiredFields.some(
        (field) => !landingData[field as keyof typeof landingData]
      )
    ) {
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
