import { Button } from "../base-ui/button";
import Link from "next/link";

export default function AppClosed() {
  return (
    <div className="relative min-h-[70vh] bg-navPrimary">
      <div className="flex flex-col gap-12 pt-10 md:pt-24 mx-auto px-6 lg:px-24 py-12">
        <h1 className="text-4xl md:text-5xl font-semibold text-textSecondary">
          Applications are now closed :o
        </h1>
        <p className="text-textPrimary">
          Thank you for your interest in TechNova! Applications are now closed.
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
  );
}
