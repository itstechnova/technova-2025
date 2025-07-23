"use client";

import React, { useState, useEffect } from "react";
import MentorAboutYouForm from "@/components/mentor/aboutyouform";
import supabase from "@/config/supabaseClient";
import { useAccount } from "@/components/AccountContext";
import { useRouter } from "next/navigation";

export default function MentorAboutYouFormPage() {
  const [formError, setFormError] = useState<string | null>(null);
  const { user } = useAccount();
  const router = useRouter();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
    pronouns: "",
    gender_identity: "",
    gender_identity_other: "",
    in_person_option: "",
    tshirt_size: "",
    availability: Array(10).fill(Array(3).fill(false)),
  });

  const requiredFields = [
    "first_name",
    "last_name",
    "phone_number",
    "pronouns",
    "in_person_option",
    "tshirt_size",
  ];

  const eitherOrRequiredFields = [["gender_identity", "gender_identity_other"]];
  useEffect(() => {
    const loadData = async () => {
      const response = await supabase
        .from("mentor_application")
        .select(
          "first_name, last_name, phone_number, pronouns, gender_identity, gender_identity_other, in_person_option, tshirt_size, availability"
        )
        .eq("user_id", user.id)
        .single();

      if (response.error) {
        console.log("Supabase fetch error:", response.error);
        throw response.error;
      } else if (response.data) {
        const fallbackData = JSON.parse(
          sessionStorage.getItem("mentorAboutYouData") ?? "{}"
        );

        console.log("Loaded from Supabase:", response.data);

        const sanitizedData = {
          first_name: response.data.first_name ?? fallbackData.first_name ?? "",
          last_name: response.data.last_name ?? fallbackData.last_name ?? "",
          phone_number:
            response.data.phone_number ?? fallbackData.phone_number ?? "",
          pronouns: response.data.pronouns ?? fallbackData.pronouns ?? "",
          gender_identity:
            response.data.gender_identity ?? fallbackData.gender_identity ?? "",
          gender_identity_other:
            response.data.gender_identity_other ??
            fallbackData.gender_identity_other ??
            "",
          in_person_option:
            response.data.in_person_option ??
            fallbackData.in_person_option ??
            "",
          tshirt_size:
            response.data.tshirt_size ?? fallbackData.tshirt_size ?? "",
          availability: (() => {
            const supabaseAvailability = response.data.availability;
            const fallbackAvailability = fallbackData.availability;

            const arraysEqual = (a: boolean[][], b: boolean[][]): boolean => {
              if (!Array.isArray(a) || !Array.isArray(b)) return false;
              if (a.length !== b.length) return false;
              for (let i = 0; i < a.length; i++) {
                if (!Array.isArray(a[i]) || !Array.isArray(b[i])) return false;
                if (a[i].length !== b[i].length) return false;
                for (let j = 0; j < a[i].length; j++) {
                  if (a[i][j] !== b[i][j]) return false;
                }
              }
              return true;
            };

            if (
              fallbackAvailability &&
              !arraysEqual(supabaseAvailability, fallbackAvailability)
            ) {
              return fallbackAvailability;
            }

            if (Array.isArray(supabaseAvailability)) {
              return supabaseAvailability;
            }

            return Array.from({ length: 10 }, () => Array(3).fill(false));
          })(),
        };
        console.log(JSON.stringify(sanitizedData));
        sessionStorage.setItem(
          "mentorAboutYouData",
          JSON.stringify(sanitizedData)
        );
        setFormData(sanitizedData);
        return;
      }

      const savedData = sessionStorage.getItem("mentorAboutYouData");
      if (savedData) {
        console.log("Loaded from sessionStorage");
        setFormData(JSON.parse(savedData));
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
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      requiredFields.some(
        (field) => !formData[field as keyof typeof formData]
      ) ||
      eitherOrRequiredFields.some((pair) => {
        const [field1, field2] = pair;
        return (
          !formData[field1 as keyof typeof formData] &&
          !formData[field2 as keyof typeof formData]
        );
      })
    ) {
      setFormError("Please fill in all required fields");
      return;
    } else {
      setFormError(null);
    }

    // convert empty responses to null
    const sanitizedFormData = Object.fromEntries(
      Object.entries(formData).map(([key, value]) => [
        key,
        value === "" ? null : value,
      ])
    );

    const response = await supabase
      .from("mentor_application")
      .update([sanitizedFormData])
      .eq("user_id", user.id)
      .select();

    if (response.error) {
      console.log(response.error);
      throw response.error;
    } else {
      sessionStorage.removeItem("mentorAboutYouData");
      console.log("data submitted!");
      router.push("/apply/mentor/role");
    }
  };

  return (
    <MentorAboutYouForm
      data={formData}
      setData={setFormData}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      formError={formError}
    />
  );
}
