import React, { useEffect, useState } from "react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import ShortAnswerQuestion from "../shortanswerq";
import SubmitButton from "../submitButton";

interface HackerLandingFormProps {
  data: any;
  setData: React.Dispatch<React.SetStateAction<any>>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  formError: string | null;
}

function HackerLandingForm({
  data,
  handleChange,
  handleSubmit,
  formError,
  setData,
}: HackerLandingFormProps) {
  const [introMd, setIntroMd] = useState("");

  const updateData = (newData: any) => {
    setData((prev: any) => {
      const updated = { ...prev, ...newData };
      sessionStorage.setItem("hackerLandingData", JSON.stringify(updated));
      return updated;
    });
  };

  useEffect(() => {
    const savedData = sessionStorage.getItem("hackerLandingData");
    if (savedData) {
      setData(JSON.parse(savedData));
    }
  }, [setData]);

  useEffect(() => {
    fetch("/textFiles/hacker/intro.md")
      .then((r) => r.text())
      .then(setIntroMd)
      .catch(console.error);
  }, []);

  return (
    <div className="relative min-h-screen bg-navPrimary">
      <div
        className="absolute top-0 left-0 w-full h-1/4 pointer-events-none z-5
                   bg-gradient-to-b from-backgroundSecondary to-navPrimary"
      />
      <div className="pt-10 md:pt-24 relative z-10 mx-auto px-6 lg:px-24 py-12">
        <div className="flex items-center gap-2 pb-10">
          <h1 className="text-4xl md:text-5xl font-semibold text-textSecondary">
            TechNova 2025 Hacker Application
          </h1>
          <Image
            src="/themed_assets/grass.svg"
            alt="grass"
            width={30}
            height={30}
            className="hidden md:block"
          />
        </div>
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
            {introMd}
          </ReactMarkdown>
        </div>

        <div className="pb-48 md:pb-5 relative z-10">
          <form onSubmit={handleSubmit} className="form">
            <div className="md:w-1/2">
              <div className="flex flex-col gap-24 text-textPrimary">
                <ShortAnswerQuestion
                  question="Email"
                  name="email"
                  id="email"
                  type="email"
                  placeholder="ex. janesmith@gmail.com"
                  value={data.email}
                  onChange={(e) => {
                    handleChange(e);
                    updateData({ email: e.target.value });
                  }}
                />
                <ShortAnswerQuestion
                  question="How old will you be as of September 27, 2025?"
                  name="age2025"
                  id="age2025"
                  placeholder="ex. 21"
                  min={0}
                  max={100}
                  value={data.age2025}
                  onChange={(e) => {
                    handleChange(e);
                    updateData({ age2025: e.target.value });
                  }}
                />
              </div>
            </div>
            <div className="mt-10">
              {formError && <p className="text-red-500">{formError}</p>}
              <SubmitButton>→</SubmitButton>
            </div>
          </form>
        </div>
      </div>

      <Image
        className="absolute bottom-0 right-0 z-5 pointer-events-none"
        src="/themed_assets/bunnywithflower.svg"
        alt="flower bunny"
        width={800}
        height={800}
      />
    </div>
  );
}

export default HackerLandingForm;
