"use client";

import React, { useState } from "react";
import MentorAboutYouForm from "@/components/mentor/aboutyouform";

export default function MentorAboutYouFormPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    pronouns: "",
    genderIdentity: "",
    genderIdentityOther: "",
    inPersonOption: "",
    tshirtSize: "",
    availability: Array(10).fill(Array(3).fill(false)),
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Mentor About You Data:", formData);
    // handle form submission, such as sending data to an API
  };

  return (
    <MentorAboutYouForm
      data={formData}
      setData={setFormData}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
}
