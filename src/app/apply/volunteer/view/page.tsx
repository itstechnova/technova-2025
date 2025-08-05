"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/base-ui/button";
import supabase from "@/config/supabaseClient";
import { useAccount } from "@/components/AccountContext";
import AvailabilityGrid from "@/components/mentor/AvailabilityGrid";

export default function MentorView() {
  const { user } = useAccount();
  const [appData, setAppData] = useState<Record<string, any>>({});

  const appFields = [
    { label: "Email", field: "email" },
    { label: "Acknowledgement", field: "acknowledgement" },
    { label: "First Name", field: "first_name" },
    { label: "Last Name", field: "last_name" },
    { label: "Phone Number", field: "phone_number" },
    { label: "Pronouns", field: "pronouns" },
    { label: "Gender Identity", field: "gender_identity" },
    { label: "Gender Identity (Other)", field: "gender_identity_other" },
    { label: "In-Person Option", field: "in_person_option" },
    { label: "T-Shirt Size", field: "tshirt_size" },
    { label: "Availability", field: "availability" },
    { label: "Onboarding Status", field: "onboarding" },
    { label: "Volunteer Interest", field: "volunteer_interest" },
    { label: "Area of Interest", field: "area_of_interest" },
    { label: "Additional Comments", field: "additional_comments" },
  ];

  useEffect(() => {
    const loadData = async () => {
      const response = await supabase
        .from("volunteer_application")
        .select("*")
        .eq("user_id", user.id ? user.id : "")
        .single();
      if (response.error) {
        throw response.error;
      } else {
        setAppData(response.data);
      }
    };
    loadData();
  }, [user?.id]);

  return (
    <div className="relative min-h-screen bg-navPrimary">
      {/* Gradient Background */}
      <div
        className="fixed inset-x-0 top-0 h-1/3 pointer-events-none z-0
                   bg-gradient-to-b from-backgroundSecondary to-navPrimary"
      />

      {/* Main Content */}
      <div className="pt-10 md:pt-24 relative z-10 mx-auto px-6 lg:px-24 py-12">
        {/* Header */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-4 pb-10">
          <h1 className="text-4xl md:text-5xl font-semibold text-textSecondary">
            Your Volunteer Application
          </h1>
          <Link
            className="text-navSecondary underline hover:text-navSecondaryHover"
            href="/apply/dashboard"
          >
            Back to Dashboard
          </Link>
        </div>

        {/* Body Text */}
        <div className="flex flex-col gap-4">
          {appFields.map(({ label, field }) => {
            const value = appData[field];

            if (field === "resume" && value) {
              return (
                <div key={field} className="flex flex-col gap-1">
                  <h2 className="text-lg font-semibold text-textSecondary">
                    {label}
                  </h2>
                  <a
                    href={`${appData.resume}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    Open Resume &#8599;
                  </a>
                </div>
              );
            }

            if (field === "availability" && Array.isArray(value)) {
              return (
                <div key={field} className="flex flex-col gap-2">
                  <h2 className="text-lg font-semibold text-textSecondary">
                    {label}
                  </h2>
                  <p className="text-sm text-gray-500">
                    Times you have selected as <strong>NOT available</strong>{" "}
                    during the event (EDT). These are not binding.
                  </p>
                  <AvailabilityGrid
                    availability={value}
                    setAvailability={() => {}}
                    updateData={() => {}}
                    disabled
                  />
                </div>
              );
            }

            return (
              <div key={field} className="flex flex-col gap-1">
                <h2 className="text-lg font-semibold text-textSecondary">
                  {label}
                </h2>
                {Array.isArray(value) ? (
                  value.length > 0 ? (
                    <ul className="list-disc pl-6 text-textPrimary">
                      {value.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-400 italic">Not provided</p>
                  )
                ) : (
                  <p className="text-textPrimary">
                    {value || <em className="text-gray-400">Not provided</em>}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
