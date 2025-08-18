"use client";
import VolunteerRoleForm from "@/components/volunteer/responseform";
import React, { useState, useEffect } from "react";
import supabase from "@/config/supabaseClient";
import { useAccount } from "@/components/AccountContext";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { stat } from "fs";
import NoFormAccess from "@/components/app/no-access";
import { area } from "framer-motion/client";
import { appOpen } from "@/config/config";
import AppClosed from "@/components/app/app-closed";

interface VolunteerData {
  onboarding: string;
  volunteer_interest: string;
  area_of_interest: string[];
  additional_comments: string;
}

function VolunteerSurvey() {
  const [formError, setFormError] = useState<string | null>(null);
  const { user } = useAccount();
  const [appStatus, setAppStatus] = useState<string>("");
  const router = useRouter();

  const [volunteerData, setVolunteerData] = useState<VolunteerData>({
    onboarding: "",
    volunteer_interest: "",
    area_of_interest: [],
    additional_comments: "",
  });

  const requiredFields = [
    "onboarding",
    "volunteer_interest",
    "area_of_interest",
  ];

  // Load from Supabase or sessionStorage on mount
  useEffect(() => {
    if (!user?.id) return;
    const loadData = async () => {
      const response = await supabase
        .from("volunteer_application")
        .select(
          "onboarding, volunteer_interest, area_of_interest, additional_comments"
        )
        .eq("user_id", user.id ? user.id : "")
        .single();

      if (response.error) {
        return;
      } else if (response.data) {
        const fallbackData = JSON.parse(
          sessionStorage.getItem("volunteerRoleData") ?? "{}"
        );

        const sanitizedData = {
          onboarding: response.data.onboarding ?? fallbackData.onboarding ?? "",
          volunteer_interest:
            response.data.volunteer_interest ??
            fallbackData.volunteer_interest ??
            "",
          area_of_interest:
            response.data.area_of_interest ??
            fallbackData.area_of_interest ??
            [],
          additional_comments:
            response.data.additional_comments ??
            fallbackData.additional_comments ??
            "",
        };
        sessionStorage.setItem(
          "volunteerRoleData",
          JSON.stringify(sanitizedData)
        );
        setVolunteerData(sanitizedData);
        return;
      }

      // fallback to sessionStorage if nothing in Supabase
      const savedData = sessionStorage.getItem("volunteerRoleData");
      if (savedData) {
        setVolunteerData((prev) => ({
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
        .select("volunteer")
        .eq("user_id", user?.id)
        .single();
      if (response.error) {
        throw response.error;
      } else {
        setAppStatus(response.data.volunteer);
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
      setVolunteerData((prev) => {
        const updated = { ...prev, [name]: file };
        sessionStorage.setItem("volunteerRoleData", JSON.stringify(updated));
        return updated;
      });
    } else {
      setVolunteerData((prev) => {
        const updated = { ...prev, [name]: value };
        sessionStorage.setItem("volunteerRoleData", JSON.stringify(updated));
        return updated;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user?.id) return;

    if (
      requiredFields.some(
        (field) => !volunteerData[field as keyof VolunteerData]
      )
    ) {
      setFormError("Please fill in all required fields.");
      return;
    } else {
      setFormError(null);
    }

    const { ...dbData } = volunteerData;

    const { error } = await supabase
      .from("volunteer_application")
      .update([
        {
          user_id: user.id,
          ...dbData,
        },
      ])
      .eq("user_id", user.id);

    if (error) {
      console.error("Error updating volunteer_application:", error);
    } else {
      sessionStorage.removeItem("volunteerRoleData");
      const statusUpdateResponse = await supabase
        .from("applications")
        .update({ volunteer: "Submitted" })
        .eq("user_id", user.id);
      if (statusUpdateResponse.error) throw statusUpdateResponse.error;
      router.push("/apply/volunteer/thanks");
    }
  };

  if (!appOpen) return <AppClosed />;

  return (
    <div className="min-h-screen bg-navPrimary">
      {/* {appStatus === "Not Started" || appStatus === "In Progress" ? ( */}
      <VolunteerRoleForm
        data={volunteerData}
        setData={setVolunteerData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        formError={formError}
        onBack={() => router.push("/apply/volunteer/about-you")}
      />
      {/* ) : (
         <NoFormAccess role="mentor" />
       )} */}
    </div>
  );
}

export default VolunteerSurvey;
