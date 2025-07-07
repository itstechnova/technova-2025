"use client";

import HackerAboutYouForm from "@/components/hacker/aboutyouform";
import supabase from "@/config/supabaseClient";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAccount } from "@/components/AccountContext";

function HackerAboutYou() {
  const { user } = useAccount();
  const [formError, setFormError] = useState<string | null>(null);
  const router = useRouter();
  const [aboutYouData, setAboutYouData] = useState({
    firstName: "",
    lastName: "",
    pronouns: "",
    tshirtSize: "",
    levelOfStudy: "",
    levelOfStudyOther: "",
    graduatingYear: "",
    graduatingYearOther: "",
    university: "",
    universityOther: "",
    major: "",
    hackathonCount: "",
    hearAboutUs: [],
    hearAboutUsOther: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setAboutYouData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(JSON.stringify(aboutYouData));

    const parsedGraduatingYearOther = Number(aboutYouData.graduatingYearOther);

    if (isNaN(parsedGraduatingYearOther)) {
      throw new TypeError("Graduating year must be a valid number");
    }

    const { data, error } = await supabase
      .from("hacker_landing")
      .update([
        {
          firstName: aboutYouData.firstName,
          lastName: aboutYouData.lastName,
          pronouns: aboutYouData.pronouns,
          tshirtSize: aboutYouData.tshirtSize,
          levelOfStudy: aboutYouData.levelOfStudy,
          levelOfStudyOther: aboutYouData.levelOfStudyOther,
          graduatingYear: parseInt(aboutYouData.graduatingYear),
          graduatingYearOther: parseInt(aboutYouData.graduatingYearOther),
          university: aboutYouData.university,
          universityOther: aboutYouData.universityOther,
          major: aboutYouData.major,
          hackathonCount: parseInt(aboutYouData.hackathonCount),
          hearAboutUs: aboutYouData.hearAboutUs,
          hearAboutUsOther: aboutYouData.hearAboutUsOther,
        },
      ])
      .eq("user_id", user.id)
      .select();

    if (error) {
      setFormError("Error submitting form");
      console.log("error", error);
    } else {
      setFormError(null);
      sessionStorage.removeItem("hackerAboutYouData");
      console.log("data submitted");
      router.push("/apply/hacker/mlh-requirements");
    }
  };

  return (
    <div className="min-h-screen bg-navPrimary">
      <HackerAboutYouForm
        data={aboutYouData}
        setData={setAboutYouData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}

export default HackerAboutYou;
