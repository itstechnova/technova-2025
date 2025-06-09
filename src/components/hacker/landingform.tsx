import React, { useEffect } from "react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import ShortAnswerQuestion from "../shortanswerq";
import { useState } from "react";
import SubmitButton from "../submitButton";

interface HackerLandingFormProps {
  data: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

function HackerLandingForm({
  data,
  handleChange,
  handleSubmit,
}: HackerLandingFormProps) {
  const [introMd, setIntroMd] = useState("");

  useEffect(() => {
    fetch("/textFiles/hacker/intro.md")
      .then((r) => r.text())
      .then(setIntroMd)
      .catch(console.error);
  }, []);

  return (
    <div className="p-24 flex flex-col h-full bg-navPrimary relative">
      <div className="absolute top-0 left-0 w-full h-1/4 pointer-events-none z-0 bg-gradient-to-b from-backgroundSecondary to-navPrimary" />
      <div className="pb-5 border-b-2 border-textPrimary relative z-10">
        <div className="flex gap-2 items-center pb-12">
          <h1 className="text-4xl md:text-5xl font-semibold text-textSecondary">
            TechNova 2025 Hacker Application
          </h1>
          <Image
            src="/themed_assets/grass.svg"
            alt="grass"
            width={30}
            height={30}
          />
        </div>
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
            {introMd}
          </ReactMarkdown>
        </div>
      </div>
      <div className="py-32 text-left w-1/2 md:w-3/5 relative z-10">
        <form onSubmit={handleSubmit} className="form">
          <div className="flex flex-col gap-24 text-textPrimary">
            <ShortAnswerQuestion
              question="Email"
              name="email"
              id="email"
              type="email"
              placeholder="ex. janesmith@gmail.com"
              value={data.email}
              onChange={handleChange}
            />
            <ShortAnswerQuestion
              question="How old will you be as of September 27, 2025?"
              name="age2025"
              id="age2025"
              placeholder="ex. 21"
              value={data.age2025}
              onChange={handleChange}
            />
          </div>
          <SubmitButton>→</SubmitButton>
        </form>
      </div>
      <Image
        className="absolute bottom-0 right-0 z-10"
        src="/themed_assets/bunnywithflower.svg"
        alt="flower bunny"
        width={800}
        height={800}
      />
    </div>
  );
}

export default HackerLandingForm;
