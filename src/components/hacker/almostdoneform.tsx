"use client";

import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import Image from "next/image";
import Link from "next/link";
import CheckOff from "../checkOff";
import SubmitButton from "../submitButton";

interface AlmostDoneProps {
  data: any;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  formError: string | null;
  onBack?: () => void;
}

function AlmostDoneForm({
  data,
  handleChange,
  handleSubmit,
  formError,
  onBack = () => window.history.back(),
}: AlmostDoneProps) {
  const [markdown, setMarkdown] = useState("");

  useEffect(() => {
    fetch("/text_files/hacker/almost_done.md")
      .then((res) => res.text())
      .then(setMarkdown)
      .catch(console.error);
  }, []);

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
        <div className="flex items-center gap-2 pb-10">
          <h1 className="text-4xl md:text-5xl font-semibold text-textSecondary">
            You&apos;re almost done! 🎈
          </h1>
        </div>

        {/* Markdown Text */}
        <div
          className="prose max-w-none prose-lg prose-stone mb-8
            prose-headings:font-semibold prose-headings:text-2xl
            prose-a:text-inherit hover:prose-a:text-inherit prose-a:underline
            prose-p:text-textPrimary prose-headings:text-textPrimary
      prose-strong:text-textPrimary prose-em:italic"
        >
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
          >
            {markdown}
          </ReactMarkdown>
        </div>

        <div className="relative z-10 text-textPrimary">
          <form onSubmit={handleSubmit}>
            <div className="pb-5">
              <p className="pt-16 pb-2 font-semibold">
                I understand the above and:
              </p>
              <CheckOff
                type="checkbox"
                label="I accept!* 🥳"
                name="acceptance"
                value="accept"
                checked={data.acceptance === "accept"}
                onChange={handleChange}
              />
            </div>

            {/* Submit button */}
            {formError && <p className="text-red-500">{formError}</p>}
            <div className="flex justify-center mt-4 gap-4">
              {onBack && (
                <button
                  type="button"
                  onClick={onBack}
                  className="w-20 h-11 text-xl rounded-xl bg-pink-50 text-[#992650] shadow-sm shadow-[#992650] hover:bg-pink-100"
                >
                  ←
                </button>
              )}
              <SubmitButton>Submit</SubmitButton>
            </div>
          </form>
        </div>

        <div className="h-64" />
      </div>
      <Image
        className="absolute bottom-0 right-0 z-5 pointer-events-none opacity-25"
        src="/themed_assets/bunny-with-flower.svg"
        alt="flower bunny"
        width={800}
        height={800}
      />
    </div>
  );
}

export default AlmostDoneForm;
