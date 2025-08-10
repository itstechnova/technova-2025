"use client";

import React, { useEffect, useState } from "react";
import ApplicationTable from "@/components/dashboard/app-table";
import { Application, AppType } from "@/components/dashboard/utils/types";
import { Button } from "@/components/base-ui/button";
import { useRouter } from "next/navigation";
import { useAccount } from "@/components/AccountContext";
import supabase from "@/config/supabaseClient";

function AppDashboard() {
  const { user } = useAccount();
  const router = useRouter();
  const appOptions: AppType[] = ["Hacker", "Mentor", "Volunteer"];

  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch applications from Supabase when user is available
  useEffect(() => {
    const fetchApplications = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("applications")
        .select("hacker, mentor, volunteer")
        .eq("user_id", user.id)
        .single();

      if (error) {
        console.error("Failed to fetch applications:", error);
        setApplications([]);
      } else if (data) {
        const appsFromDB: Application[] = [];

        if (data.hacker !== "Not Started") {
          const updatedAtResponse = await supabase
            .from("hacker_landing")
            .select("updated_at")
            .eq("user_id", user.id)
            .single();
          if (updatedAtResponse.error) {
            throw updatedAtResponse.error;
          }
          appsFromDB.push({
            type: "Hacker",
            status: data.hacker,
            lastUpdated: new Date(
              updatedAtResponse.data?.updated_at
            ).toISOString(),
          });
        }

        if (data.mentor !== "Not Started") {
          const updatedAtResponse = await supabase
            .from("hacker_landing")
            .select("updated_at")
            .eq("user_id", user.id)
            .single();
          if (updatedAtResponse.error) {
            throw updatedAtResponse.error;
          }
          appsFromDB.push({
            type: "Mentor",
            status: data.mentor,
            lastUpdated: new Date(
              updatedAtResponse.data?.updated_at
            ).toISOString(),
          });
        }

        if (data.volunteer !== "Not Started") {
          const updatedAtResponse = await supabase
            .from("volunteer_application")
            .select("updated_at")
            .eq("user_id", user.id)
            .single();
          if (updatedAtResponse.error) {
            throw updatedAtResponse.error;
          }
          appsFromDB.push({
            type: "Volunteer",
            status: data.volunteer,
            lastUpdated: new Date(
              updatedAtResponse.data?.updated_at
            ).toISOString(),
          });
        }

        // console.log(appsFromDB);

        setApplications(appsFromDB);
      }

      setLoading(false);
    };

    if (user?.id) {
      fetchApplications();
    }
  }, [user?.id]);

  const activeApps = applications.map((app) => app.type);

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

      <div className="w-full flex flex-col gap-12 px-24 max-sm:px-6 py-20 items-start">
        <div className="w-full flex flex-col gap-6 items-start text-textPrimary">
          <h1 className="text-4xl md:text-5xl max-sm:text-4xl font-semibold text-textPrimary">
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
            🕒 Deadline to submit applications:{" "}
            <span className="font-semibold">August 15, 2025</span>
          </p>
        </div>

        {/* Loading state */}
        {loading ? (
          <p className="text-textPrimary text-lg">Loading applications...</p>
        ) : (
          <>
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
          </>
        )}

        {/* Pre-footer */}
        <p className="text-base text-textPrimary">
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
