import { Button } from "../base-ui/button";
import Link from "next/link";

export default function AppClosed() {
  return (
    <div className="p-10 md:px-24 flex flex-col h-full bg-navPrimary relative">
    <div className="flex flex-col items-center justify-start min-h-screen bg-navPrimary md:pt-12">
      <div className="flex flex-col gap-12">
        <h1 className="text-4xl md:text-5xl font-semibold text-textSecondary">
          Applications are now closed :o
        </h1>
        <p className="text-textPrimary">
          Thank you for your interest in Technova! Applications are now closed.
          If you did not get the chance to apply, we look forward to seeing your
          application next year!
        </p>
        <p>
          If you have applied already, you can view your application in your
          dashboard.
        </p>
        <div className="flex sm:flex-row flex-col gap-6">
          <Link href={`/apply/dashboard`}>
            <Button variant="default">View Dashboard</Button>
          </Link>
        </div>
      </div>
    </div>
    </div>
  );
}
