"use client";

import * as React from "react";
import { ArrowUpRight, ChevronDown, ChevronUp } from "lucide-react";

export interface SponsorCardProps {
  title: string;
  description: string;
  logo: React.ReactNode;
  href?: string;
  colors?: {
    headerBg?: string;
    border?: string;
    text?: string;
    accent?: string;
    outer?: string;
  };
  className?: string;
  fixedHeight?: string; // e.g. "h-[420px]"
}

export default function SponsorCard({
  title,
  description,
  logo,
  href,
  colors,
  className,
  fixedHeight = "h-[420px]",
}: SponsorCardProps) {
  const [expanded, setExpanded] = React.useState(false);

  const c = {
    headerBg: colors?.headerBg ?? "bg-[#FEF8C5]",
    border: colors?.border ?? "border-[#3D3D75]/75",
    text: colors?.text ?? "text-gray-800",
    accent:
      colors?.accent ??
      "bg-gradient-to-r from-[#E8B022] to-[#FDD30C] text-white",
    outer: colors?.outer ?? "bg-[#E8B022]",
  };

  return (
    <div
      className={`relative p-3 ${c.outer} rounded-2xl border-2 ${
        c.border
      } shadow-md ${className ?? ""}`}
    >
      <div
        className={`relative flex flex-col justify-between border-2 ${c.border} rounded-xl shadow-md bg-[#FFFAF3] overflow-hidden transition-all duration-300`}
      >
        {/* Header */}
        <div
          className={`w-full px-8 font-bold text-lg sm:text-xl md:text-2xl text-center ${c.headerBg} border-b-2 ${c.border} h-24 flex items-center justify-center overflow-hidden`}
        >
          <div
            title={title}
            aria-label={title}
            className="max-w-full leading-tight"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical" as const,
              overflow: "hidden",
              textOverflow: "ellipsis",
              overflowWrap: "anywhere",
            }}
          >
            {title}
          </div>
        </div>

        {/* Content */}
        <div
          className={`flex flex-col items-center text-center px-12 pt-8 pb-4 gap-4 overflow-hidden transition-all`}
          style={{
            height: expanded ? "auto" : "16rem", // fixed collapsed height for uniform cards
          }}
        >
          <div className="flex justify-center items-center h-16">{logo}</div>
          <p
            className={`text-sm text-justify ${c.text}`}
            style={
              expanded
                ? undefined
                : {
                    display: "-webkit-box",
                    WebkitLineClamp: 8,
                    WebkitBoxOrient: "vertical" as const,
                    overflow: "hidden",
                  }
            }
          >
            {description}
          </p>
        </div>

        {/* Expand toggle */}
        <button
          onClick={() => setExpanded((e) => !e)}
          className="flex items-center justify-center text-sm hover:underline px-4 pb-2"
        >
          {expanded ? (
            <>
              <ChevronUp className="ml-1 h-4 w-4" />
            </>
          ) : (
            <>
              <ChevronDown className="ml-1 h-4 w-4" />
            </>
          )}
        </button>

        {/* Footer actions */}
        <div className="flex items-center justify-between px-4 pb-4">
          {href ? (
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              className={`inline-flex items-center justify-center rounded-md px-3 py-2 ${c.accent} hover:opacity-90 transition border-2 ${c.border}`}
            >
              <ArrowUpRight className="w-6 h-5" />
            </a>
          ) : (
            <span />
          )}
        </div>
      </div>
    </div>
  );
}
