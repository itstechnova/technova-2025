"use client";

import HackerMLHForm from "@/components/hacker/mlhform";
import React, { useState, useEffect } from "react";
import supabase from "@/config/supabaseClient";
import { useRouter } from "next/navigation";
import { useAccount } from "@/components/AccountContext";
import NoFormAccess from "@/components/app/no-access";
import { appOpen } from "@/config/config";
import AppClosed from "@/components/app/app-closed";

function HackerMLHRequirements() {
  const router = useRouter();
  const { user } = useAccount();
  const [appStatus, setAppStatus] = useState<string>("");
  const [formError, setFormError] = useState<string | null>(null);

  const [mlhData, setMLHData] = useState({
    mandatory_requirement_1: "",
    mandatory_requirement_2: "",
    optional: "",
  });

  const requiredFields = ["mandatory_requirement_1", "mandatory_requirement_2"];

  useEffect(() => {
    const loadData = async () => {
      const response = await supabase
        .from("hacker_landing")
        .select("mandatory_requirement_1, mandatory_requirement_2, optional")
        .eq("user_id", user.id)
        .single();

      if (response.error) {
        throw response.error;
      } else if (response.data) {
        const fallbackData = JSON.parse(
          sessionStorage.getItem("hackerMLHData") ?? "{}"
        );
        const sanitizedData = {
          mandatory_requirement_1:
            response.data.mandatory_requirement_1 ??
            fallbackData.mandatory_requirement_1 ??
            "",
          mandatory_requirement_2:
            response.data.mandatory_requirement_2 ??
            fallbackData.mandatory_requirement_2 ??
            "",
          optional: response.data.optional ?? fallbackData.optional ?? "",
        };
        sessionStorage.setItem("hackerMLHData", JSON.stringify(sanitizedData));
        setMLHData(sanitizedData);
        return;
      }

      const savedData = sessionStorage.getItem("hackerMLHData");
      if (savedData) {
        setMLHData(JSON.parse(savedData));
      }
    };

    if (user?.id) {
      loadData();
    }
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
    if (
      requiredFields.some((field) => !mlhData[field as keyof typeof mlhData])
    ) {
      setFormError("Please accept all required fields");
      return;
    } else {
      setFormError(null);
    }
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
      setFormError(null);
      sessionStorage.removeItem("hackerMLHData");
      console.log("data submitted");
      router.push("/apply/hacker/short-answers");
    }
  };

  if (!appOpen) return <AppClosed />;

  return (
    <div className="min-h-screen bg-navPrimary">
      {/* {appStatus === "Not Started" || appStatus === "In Progress" ? ( */}
      <HackerMLHForm
        data={mlhData}
        setData={setMLHData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        formError={formError}
        onBack={() => router.push("/apply/hacker/about-you")}
      />
      {/*}      ) : (
        <NoFormAccess role="hacker" />
      )}*/}
    </div>
  );
}

export default HackerMLHRequirements;
