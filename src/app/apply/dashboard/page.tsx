"use client";

import ApplicationTable from "@/components/dashboard/app-table";
import { Application, AppType } from "@/components/dashboard/utils/types";
import { Button } from "@/components/base-ui/button";
import React from "react";
import { useRouter } from "next/navigation";

// TODO: this is a sample list of applications, need to implement
// actual functionality
const applications: Application[] = [
  {
    type: "Hacker",
    status: "Submitted",
    lastUpdated: "July 1, 2025",
  },
  //   {
  //     type: "Mentor" ,
  //     status: "In Progress" ,
  //     lastUpdated: "Not Submitted",
  //   },
  //   {
  //     type: "Volunteer" ,
  //     status: "Rejected" ,
  //     lastUpdated: "July 1, 2025",
  //   },
];

function AppDashboard() {
  const appOptions: AppType[] = ["Hacker", "Mentor", "Volunteer"];
  const activeApps = applications.map((app) => app.type);
  const router = useRouter();
  
  return (
    <div className="flex flex-col h-full bg-navPrimary relative">
      {/* Background SVG graphic */}
      <div className="absolute inset-0 z-7 pointer-events-none">
        <img
          src="/themed_assets/daisy-bg.svg"
          alt="Hacker Dashboard Daisy Background"
          className="w-full h-full object-cover opacity-50"
        />
      </div>
      {/* heading + text */}
      <div className="w-full flex flex-col gap-12 px-24 max-sm:px-6 py-20 items-start">
        <div className="w-full flex flex-col gap-6 items-start">
          <h1 className="text-5xl max-sm:text-4xl font-semibold">
            Your Application Dashboard 🌟
          </h1>
          <div className="flex flex-col gap-2">
            <p className="text-base italic">
              Thanks for applying to be a part of TechNova 2025! 🌷
            </p>
            <p className="text-base">
              Track your application(s), update details, or view your
              submission.
            </p>
          </div>
          <p className="text-lg">
            🕒 Deadline to submit or update applications:{" "}
            <span className="font-semibold">July 4, 2025</span>
          </p>
        </div>

        {/* App table */}
        <ApplicationTable applications={applications} />

        {/* App buttons */}
        <div className="flex flex-row max-sm:flex-col gap-4 w-full">
          {appOptions
            .filter((role) => !activeApps.includes(role))
            .map((role, index) => (
              <Button
                key={role}
                variant={index === 0 ? "default" : "outline"}
                onClick={() => {
                  router.push(`/apply/${role.toLowerCase()}`);
                }}
              >
                Apply to be a {role.toLowerCase()}!
              </Button>
            ))}
        </div>

        {/* Pre-footer */}
        <p className="text-base">
          Have any questions? Reach out to our team at{" "}
          <a
            href="mailto:hello@itstechnova.org"
            className="text-navSecondary hover:text-navSecondaryHover transition duration-150 underline"
          >
            hello@itstechnova.org
          </a>
          .
        </p>
      </div>
    </div>
  );
}
export default AppDashboard;
