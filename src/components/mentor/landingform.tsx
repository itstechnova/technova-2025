import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import Image from "next/image";
import CheckOff from "../checkOff";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface MentorLandingFormProps {
  data: any;
  setData: React.Dispatch<React.SetStateAction<any>>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const MentorLandingForm: React.FC<MentorLandingFormProps> = ({
  data,
  setData,
  handleChange,
  handleSubmit,
}) => {
  const [introMd, setIntroMd] = useState("");
  const [resMd, setResMd] = useState("");

  useEffect(() => {
    fetch("/textFiles/mentor/intro.md")
      .then((r) => r.text())
      .then(setIntroMd)
      .catch(console.error);
  }, []);

  useEffect(() => {
    fetch("/textFiles/mentor/responsibilities.md")
      .then((r) => r.text())
      .then(setResMd)
      .catch(console.error);
  }, []);

  const router = useRouter();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit(e);
    router.push("/apply/mentor/step-one");
  };

  return (
    <div className="relative min-h-screen bg-navPrimary">
      <div
        className="fixed inset-x-0 top-0 h-1/3 pointer-events-none z-0
                   bg-gradient-to-b from-backgroundTertiary to-transparent"
      />

      <div className="pt-24 relative z-10 mx-auto px-6 lg:px-24 py-12">
        <div className="flex items-center gap-2 pb-24">
          <h1 className="text-4xl md:text-5xl font-semibold text-textSecondary">
            TechNova 2025 Mentor Application
          </h1>
          <Image
            src="/themed_assets/grass2.png"
            alt="grass"
            width={30}
            height={30}
          />
        </div>

        <div
          className="
          prose max-w-none prose-lg prose-stone mb-8
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

        <div className="pb-5 border-b-2 border-textPrimary relative z-10" />

        <form onSubmit={handleSubmit}>
          {/* Email field */}
          <div className="pt-24 pb-24">
            <label
              htmlFor="email"
              className="block text-textPrimary font-bold mb-2"
            >
              What's your email?
            </label>
            <p className="text-textPrimary mb-2">
              <strong>Note:</strong> Please enter an email you check frequently
              - this will be our primary method of communication!
            </p>
            <input
              id="email"
              name="email"
              type="email"
              value={data.email}
              onChange={handleChange}
              placeholder="ex. janesmith@gmail.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-md 
                         focus:outline-none focus:ring-buttonSecondary shadow-sm"
            />
          </div>

          {/* Responsibilities markdown */}
          <div
            className="z-10
                        prose max-w-none prose-base prose-stone mb-12 font-semibold 
                          prose-headings:font-bold 
                          prose-ol:list-decimal
                          prose-li:font-normal"
          >
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
            >
              {resMd}
            </ReactMarkdown>
          </div>

          {/* Acknowledgement */}
          <div className="pb-36">
            <p className="pt-12 text-textPrimary font-semibold">
              I acknowledge the roles and responsibilities outlined above.
            </p>
            <CheckOff
              name="acknowledgement"
              type="checkbox"
              label="Yes."
              value="Yes."
              checked={data.acknowledgement === "Yes."}
              onChange={(e) => {
                setData((prev: any) => ({
                  ...prev,
                  acknowledgement: e.target.checked ? "Yes." : "No.",
                }));
              }}
            />
          </div>

          {/* Submit button */}
          <Link href="/apply/mentor/step-one">
            <div className="pb-36">
              <button
                type="submit"
                className="bg-buttonSecondary px-8 py-3 text-white text-xl 
                       rounded-xl shadow-sm"
              >
                →
              </button>
            </div>
          </Link>
        </form>
      </div>

      {/* Bottom-right frog */}
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
};

export default MentorLandingForm;
