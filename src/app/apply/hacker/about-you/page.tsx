"use client";

import HackerAboutYouForm from "@/components/hacker/aboutyouform";
import supabase from "@/config/supabaseClient";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAccount } from "@/components/AccountContext";
import NoFormAccess from "@/components/app/no-access";

function HackerAboutYou() {
  const { user } = useAccount();
  const [appStatus, setAppStatus] = useState<string>("");
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

  const requiredFields = [
    "firstName",
    "lastName",
    "pronouns",
    "tshirtSize",
    "major",
    "hackathonCount",
  ];

  const eitherOrRequiredFields = [
    ["levelOfStudy", "levelOfStudyOther"],
    ["graduatingYear", "graduatingYearOther"],
    ["university", "universityOther"],
  ];

  useEffect(() => {
    const loadData = async () => {
      const response = await supabase
        .from("hacker_landing")
        .select(
          "firstName, lastName, pronouns, tshirtSize, levelOfStudy, levelOfStudyOther, graduatingYear, graduatingYearOther, university, universityOther, major, hackathonCount, hearAboutUs, hearAboutUsOther"
        )
        .eq("user_id", user.id ? user.id : "")
        .single();

      if (response.error) {
        throw response.error;
      } else if (response.data) {
        const fallbackData = JSON.parse(
          sessionStorage.getItem("hackerAboutYouData") ?? "{}"
        );
        function mapHackathonCount(value: string | number): string {
          const stringValue = value.toString().trim();
          if (stringValue === "0" || stringValue.toLowerCase() === "first") {
            return "This will be my first!";
          } else if (["1", "2", "3", "4+"].includes(stringValue)) {
            return stringValue;
          } else if (parseInt(stringValue) >= 4) {
            return "4+";
          } else {
            return "";
          }
        }
        const sanitizedData = {
          firstName: response.data.firstName ?? fallbackData.firstName ?? "",
          lastName: response.data.lastName ?? fallbackData.lastName ?? "",
          pronouns: response.data.pronouns ?? fallbackData.pronouns ?? "",
          tshirtSize: response.data.tshirtSize ?? fallbackData.tshirtSize ?? "",
          levelOfStudy:
            response.data.levelOfStudy ?? fallbackData.levelOfStudy ?? "",
          levelOfStudyOther:
            response.data.levelOfStudyOther ??
            fallbackData.levelOfStudyOther ??
            "",
          graduatingYear:
            response.data.graduatingYear?.toString() ??
            fallbackData.graduatingYear?.toString() ??
            "",
          graduatingYearOther:
            response.data.graduatingYearOther ??
            fallbackData.graduatingYearOther ??
            "",
          university: response.data.university ?? fallbackData.university ?? "",
          universityOther:
            response.data.universityOther ?? fallbackData.universityOther ?? "",
          major: response.data.major ?? fallbackData.major ?? "",
          hackathonCount: mapHackathonCount(
            response.data.hackathonCount?.toString() ??
              fallbackData.hackathonCount?.toString() ??
              ""
          ),
          hearAboutUs:
            response.data.hearAboutUs ?? fallbackData.hearAboutUs ?? [],
          hearAboutUsOther:
            response.data.hearAboutUsOther ??
            fallbackData.hearAboutUsOther ??
            "",
        };
        sessionStorage.setItem(
          "hackerAboutYouData",
          JSON.stringify(sanitizedData)
        );
        setAboutYouData(sanitizedData);
        return;
      }

      const savedData = sessionStorage.getItem("hackerAboutYouData");
      if (savedData) {
        setAboutYouData(JSON.parse(savedData));
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
    setAboutYouData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const parsedGraduatingYearOther = Number(aboutYouData.graduatingYearOther);

    if (isNaN(parsedGraduatingYearOther)) {
      throw new TypeError("Graduating year must be a valid number");
    }

    if (
      requiredFields.some(
        (field) => !aboutYouData[field as keyof typeof aboutYouData]
      ) ||
      eitherOrRequiredFields.some((pair) => {
        const [field1, field2] = pair;
        return (
          !aboutYouData[field1 as keyof typeof aboutYouData] &&
          !aboutYouData[field2 as keyof typeof aboutYouData]
        );
      })
    ) {
      setFormError("Please fill in all required fields");
      return;
    } else {
      setFormError(null);
    }

    console.log(JSON.stringify(aboutYouData));

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
      {appStatus === "Not Started" || appStatus === "In Progress" ? (
        <HackerAboutYouForm
          data={aboutYouData}
          setData={setAboutYouData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          formError={formError}
          onBack={() => router.push("/apply/hacker")}
        />
      ) : (
        <NoFormAccess role="hacker" />
      )}
    </div>
  );
}

export default HackerAboutYou;
