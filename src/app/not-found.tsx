"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "../components/base-ui/button";

export default function NotFound() {
  return (
    <div className="min-h-[77vh] bg-background">
      <Image
        src="/themed_assets/flower-buttercup.svg"
        alt="Flower"
        width={300}
        height={300}
        className="absolute top-0 left-0 z-0 hidden md:block"
      />
      <div className="grid grid-cols-1 md:grid-cols-3 place-items-center min-h-[60vh] max-w-7xl mx-auto">
        <div className="flex flex-col items-center space-y-10 md:col-span-2 p-10 md:p-0">
          <Image
            src="/themed_assets/404.svg"
            alt="404"
            width={500}
            height={400}
            className="z-10"
          />
          <p className="text-lg text-center text-textPrimary px-10">
            Oops! Page not found. Our bunnies are debugging the issue!
          </p>
        </div>

        <div className="hidden md:flex justify-center">
          <Image
            src="/themed_assets/bunny.svg"
            alt="Bunny"
            width={500}
            height={500}
          />
        </div>
      </div>

      <div className="flex justify-center mb-10">
        <Link href="/">
          <Button variant="green" size="lg">
            Go Back Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
