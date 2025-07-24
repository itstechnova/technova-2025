"use client";

import HackerShortAnswersForm from "@/components/hacker/shortanswersform";
import supabase from "@/config/supabaseClient";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAccount } from "@/components/AccountContext";

function HackerShortAnswers() {
  const { user } = useAccount();
  const router = useRouter();

  const [formError, setFormError] = useState<string | null>(null);
  const [shortAnswersData, setShortAnswersData] = useState({
    long_answer_q1: "",
    long_answer_q2: "",
    selected_option: "",
    long_answer_q3: "",
    long_answer_q4: "",
  });

  useEffect(() => {
    const loadData = async () => {
      const response = await supabase
        .from("hacker_landing")
        .select(
          "long_answer_q1, long_answer_q2, selected_option, long_answer_q3, long_answer_q4"
        )
        .eq("user_id", user.id)
        .single();

      if (response.error) {
        throw response.error;
      } else if (response.data) {
        const fallbackData = JSON.parse(
          sessionStorage.getItem("hackerShortAnswersData") ?? "{}"
        );

        const sanitizedData = {
          long_answer_q1:
            response.data.long_answer_q1 ?? fallbackData.long_answer_q1 ?? "",
          long_answer_q2:
            response.data.long_answer_q2 ?? fallbackData.long_answer_q2 ?? "",
          selected_option:
            response.data.selected_option ?? fallbackData.selected_option ?? "",
          long_answer_q3:
            response.data.long_answer_q3 ?? fallbackData.long_answer_q3 ?? "",
          long_answer_q4:
            response.data.long_answer_q4 ?? fallbackData.long_answer_q4 ?? "",
        };

        sessionStorage.setItem(
          "hackerShortAnswersData",
          JSON.stringify(sanitizedData)
        );
        setShortAnswersData(sanitizedData);
        return;
      }

      const savedData = sessionStorage.getItem("hackerShortAnswersData");
      if (savedData) {
        setShortAnswersData(JSON.parse(savedData));
      }
    };

    if (user?.id) {
      loadData();
    }
  }, [user?.id]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
    wordLimit?: number
  ) => {
    const { name, value } = e.target;
    let newValue = value;

    if (wordLimit !== undefined) {
      const words = value.trim().split(/\s+/).filter(Boolean);
      if (words.length > wordLimit) {
        newValue = words.slice(0, wordLimit).join(" ");
      }
    }

    const updatedData = {
      ...shortAnswersData,
      [name]: newValue,
    };

    setShortAnswersData(updatedData);
    sessionStorage.setItem(
      "hackerShortAnswersData",
      JSON.stringify(updatedData)
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { data, error } = await supabase
      .from("hacker_landing")
      .update({
        long_answer_q1: shortAnswersData.long_answer_q1,
        long_answer_q2: shortAnswersData.long_answer_q2,
        selected_option: shortAnswersData.selected_option,
        long_answer_q3: shortAnswersData.long_answer_q3,
        long_answer_q4: shortAnswersData.long_answer_q4,
      })
      .eq("user_id", user.id)
      .select();

    if (error) {
      console.error("Supabase update error", error);
      setFormError("Error submitting form");
    } else {
      setFormError(null);
      sessionStorage.removeItem("hackerShortAnswersData");
      router.push("/apply/hacker/survey");
    }
  };

  return (
    <div className="min-h-screen bg-navPrimary">
      <HackerShortAnswersForm
        data={shortAnswersData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      {formError && (
        <p className="text-red-500 text-center mt-4">{formError}</p>
      )}
    </div>
  );
}

export default HackerShortAnswers;
