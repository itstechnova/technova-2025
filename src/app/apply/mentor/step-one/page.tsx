"use client";

import React, { useState } from "react";
import MentorStepOneForm from "@/components/mentor/steponeform";

export default function MentorStepOneFormPage() {
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
    console.log("Mentor Step One Data:", formData);
    // handle form submission, such as sending data to an API
  };

  return (
    <MentorStepOneForm
      data={formData}
      setData={setFormData}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
}
