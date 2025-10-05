"use client";

import * as React from "react";
import { ArrowUpRight } from "lucide-react";

// Built-in color presets for SponsorCard
export type SponsorCardTheme = "DEFAULT" | "NAVY" | "ROSE" | "TEAL" | "GREEN";

export interface SponsorCardProps {
  title: string;
  description?: string;
  logo: React.ReactNode;
  href?: string;
  color?: SponsorCardTheme;
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
  color = "DEFAULT",
  className,
  fixedHeight = "h-[420px]",
}: SponsorCardProps) {
  const hasDescription = !!description && description.trim().length > 0;

  // Preset palettes; can be extended as needed
  const PRESETS: Record<
    SponsorCardTheme,
    {
      headerBg: string;
      border: string;
      text: string;
      accent: string;
      outer: string;
    }
  > = {
    DEFAULT: {
      headerBg: "bg-[#FEF8C5]",
      border: "border-[#3D3D75]/75",
      text: "text-gray-800",
      accent: "bg-gradient-to-r from-[#E8B022] to-[#FDD30C] text-white",
      outer: "bg-[#E8B022]",
    },
    NAVY: {
      headerBg: "bg-[#E4DFE2]",
      border: "border-[#3D3D75]/75",
      text: "text-gray-800",
      accent: "bg-gradient-to-r from-[#19123C] to-[#3D3D75C7] text-white",
      outer: "bg-[#19123C]",
    },
    ROSE: {
      headerBg: "bg-[#FFC4BC78]",
      border: "border-[#3D3D75]/75",
      text: "text-gray-800",
      accent: "bg-gradient-to-r from-[#CD5769] to-[#FFA3AF] text-white",
      outer: "bg-[#CD5769]",
    },
    TEAL: {
      headerBg: "bg-[#6E9DB269]",
      border: "border-[#3D3D75]/75",
      text: "text-gray-800",
      accent: "bg-gradient-to-r from-[#055579] to-[#6E9DB2] text-white",
      outer: "bg-[#055579]",
    },
    GREEN: {
      headerBg: "bg-[#D8F3DC]",
      border: "border-[#3D3D75]/75",
      text: "text-gray-800",
      accent: "bg-gradient-to-r from-[#06402B] to-[#4D803B] text-white",
      outer: "bg-[#06402B]",
    },
  };

  // Merge preset with any ad-hoc overrides for backward compatibility
  const preset = PRESETS[color] ?? PRESETS["DEFAULT"];
  const c = {
    headerBg: colors?.headerBg ?? preset.headerBg,
    border: colors?.border ?? preset.border,
    text: colors?.text ?? preset.text,
    accent: colors?.accent ?? preset.accent,
    outer: colors?.outer ?? preset.outer,
  };

  return (
    <div
      className={`relative p-3 h-[640px] md:h-[520px] ${
        c.outer
      } rounded-2xl border-2 ${c.border} shadow-md ${className ?? ""}`}
    >
      <div
        className={`relative flex h-full flex-col justify-between border-2 ${c.border} rounded-xl shadow-md bg-[#FFFAF3] overflow-hidden transition-all duration-300`}
      >
        {/* Header */}
        <div
          className={`w-full px-2 font-bold text-lg sm:text-xl md:text-2xl text-center ${c.headerBg} border-b-2 ${c.border} h-24 flex items-center justify-center overflow-hidden`}
        >
          <div
            title={title}
            aria-label={title}
            className="max-w-full leading-tight text-textPrimary"
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
          className={`flex flex-1 flex-col items-center px-6 md:px-12 pt-8 pb-4 gap-8 overflow-visible transition-all ${
            hasDescription ? "" : "justify-center"
          }`}
          style={{
            minHeight: "8rem",
          }}
        >
          <div className="flex justify-center items-center h-24 w-full">
            {logo}
          </div>
          {hasDescription && (
            <p className={`text-sm text-textPrimary ${c.text}`}>
              {description}
            </p>
          )}
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-between px-4 pb-4 h-12">
          {href ? (
            <a
              href={href}
              target="_blank"
              rel="sponsored"
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
