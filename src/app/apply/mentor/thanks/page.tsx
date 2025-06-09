"use client";

import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import Image from "next/image";
import Link from "next/link";

export default function MentorThankYouPage() {
  const [markdown, setMarkdown] = useState("");

  useEffect(() => {
    fetch("/textFiles/mentor/thanks.md")
      .then((res) => res.text())
      .then(setMarkdown)
      .catch(console.error);
  }, []);

  return (
    <div className="relative min-h-screen bg-navPrimary">
      {/* Gradient Background */}
      <div
        className="fixed inset-x-0 top-0 h-1/3 pointer-events-none z-0
                   bg-gradient-to-b from-backgroundTertiary to-navPrimary"
      />

      {/* Main Content */}
      <div className="pt-24 relative z-10 mx-auto px-6 lg:px-24 py-12">
        {/* Header */}
        <div className="flex items-center gap-2 pb-24">
          <h1 className="text-4xl md:text-5xl font-semibold text-textSecondary">
            TechNova 2025 Mentor Application
          </h1>
        </div>

        {/* Markdown Text */}
        <div
          className="prose max-w-none prose-lg prose-stone mb-8
            prose-headings:font-semibold prose-headings:text-2xl
            prose-a:text-blue-600 prose-a:underline hover:prose-a:text-blue-800
            prose-em:text-gray-700 prose-em:italic"
        >
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
          >
            {markdown}
          </ReactMarkdown>
        </div>

        {/* CTA Button */}
        <div className="flex justify-center mt-12">
          <Link href="/">
            <button className="bg-gradient-to-l from-[#FAC4BD] to-[#CD5769] text-white px-6 py-3 rounded-xl font-semibold">
              Go Back Home!
            </button>
          </Link>
        </div>

        {/* Spacer to push frog down */}
        <div className="h-64" />
      </div>
      <div className="absolute bottom-0 right-0 z-5">
        <Image
          src="/themed_assets/profeshFrog.svg"
          alt="professional frog"
          width={800}
          height={800}
        />
      </div>
    </div>
  );
}
