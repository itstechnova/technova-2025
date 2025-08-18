"use client";

import React, { useState, useEffect } from "react";
import HackerLandingForm from "@/components/hacker/landingform";
import supabase from "@/config/supabaseClient";
import { useRouter } from "next/navigation";
import { useAccount } from "@/components/AccountContext";
import NoFormAccess from "@/components/app/no-access";
import { appOpen } from "@/config/config";
import AppClosed from "@/components/app/app-closed";

function HackerLanding() {
  const [formError, setFormError] = useState<string | null>(null);
  const [appStatus, setAppStatus] = useState<string>("");
  const [landingData, setLandingData] = useState({
    email: "",
    age2025: "",
  });

  const requiredFields = ["email", "age2025"];
  const router = useRouter();
  const { user } = useAccount();

  // Load from Supabase or sessionStorage on mount
  useEffect(() => {
    const loadData = async () => {
      if (!user?.id) return;

      const response = await supabase
        .from("hacker_landing")
        .select("email, age2025")
        .eq("user_id", user?.id)
        .single();

      if (response.error) {
        throw response.error;
      } else if (response.data) {
        const fallbackData = JSON.parse(
          sessionStorage.getItem("landingData") ?? "{}"
        );

        const mergedData = {
          email: response.data.email ?? fallbackData.email ?? "",
          age2025: response.data.age2025 ?? fallbackData.age2025 ?? "",
        };
        sessionStorage.setItem("landingData", JSON.stringify(mergedData));
        setLandingData(mergedData);
        return;
      }
    };
    loadData();
    const loadAppStatus = async () => {
      if (!user?.id) return;

      const response = await supabase
        .from("applications")
        .select("hacker")
        .eq("user_id", user?.id)
        .single();
      if (response.error) {
        throw response.error;
      } else {
        setAppStatus(response.data.hacker);
      }
    };
    loadAppStatus();
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

    const hackerLandingResponse = await supabase
      .from("hacker_landing")
      .update([
        {
          email: landingData.email,
          age2025: landingData.age2025,
        },
      ])
      .eq("user_id", user.id);

    const applicationsResponse = await supabase
      .from("applications")
      .update({ hacker: "In Progress" })
      .eq("user_id", user.id)
      .eq("hacker", "Not Started")
      .select();

    if (hackerLandingResponse.error) {
      setFormError("Error submitting form");
      console.log("error", hackerLandingResponse.error);
    } else if (applicationsResponse.error) {
      setFormError("Error submitting form");
      console.log("error", applicationsResponse.error);
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

  if (!appOpen) {
    return <AppClosed />;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-navPrimary">
      {/* {appStatus === "Not Started" || appStatus === "In Progress" ? ( */}
      <HackerLandingForm
        data={landingData}
        setData={setLandingData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        formError={formError}
      />
      {/* ) : (
        <NoFormAccess role="hacker" />
      )}
        */}
    </div>
  );
}

export default HackerLanding;
