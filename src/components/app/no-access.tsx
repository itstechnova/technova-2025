import { Button } from "../base-ui/button";
import Link from "next/link";

interface Props {
  role: string;
}

export default function NoFormAccess({ role }: Props) {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-navPrimary pt-24">
      <div className="flex flex-col gap-12">
        <h1 className="text-4xl md:text-5xl font-semibold text-textSecondary">
          Your application has already been submitted
        </h1>
        <p className="text-textPrimary">
          You have already submitted your application to be a {role}.
        </p>
        <div className="flex flex-row gap-6">
          <Link href={`/apply/${role}/view`}>
            <Button variant="default">View Your Application</Button>
          </Link>
          <Link href="/apply/dashboard">
            <Button variant="outline">Back to Dashboard</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
