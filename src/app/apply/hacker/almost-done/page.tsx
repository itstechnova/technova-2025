"use client";

import AlmostDoneForm from "@/components/hacker/almostdoneform";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

function HackerAlmostDone() {
  const router = useRouter();

  const [acceptanceData, setAcceptanceData] = useState({
    acceptance: "",
  });

  const [formError, setFormError] = useState<string | null>(null);

  const requiredFields = ["acceptance"];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, type, value } = e.target;
    setAcceptanceData((prev) => ({
      ...prev,
      [name]: (e.target as HTMLInputElement).checked ? value : "",
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Do validation here

    if (
      requiredFields.some(
        (field) => !acceptanceData[field as keyof typeof acceptanceData]
      )
    ) {
      setFormError("Please accept to submit your application");
      return;
    } else {
      setFormError(null);
    }

    console.log(JSON.stringify(acceptanceData));
    router.push("/apply/hacker/thanks");
  };

  return (
    <div className="min-h-screen bg-navPrimary">
      <AlmostDoneForm
        data={acceptanceData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        formError={formError}
        onBack={() => router.push("/apply/hacker/demographic")}
      />
    </div>
  );
}

export default HackerAlmostDone;
