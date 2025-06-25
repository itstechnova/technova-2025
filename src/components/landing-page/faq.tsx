"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import InfoCard from "./info-card";
import getFaqData from "./getFaqData";

interface FaqItem {
  title: string;
  body: string;
  flowerIndex: number;
}

const GRID_SIZE = 200;

function FAQ() {
  const [faqs, setFaqs] = useState<FaqItem[]>([]);
  const [gridHeight, setGridHeight] = useState(GRID_SIZE);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getFaqData().then(setFaqs);
  }, []);

  const updateHeight = useCallback(() => {
    if (gridRef.current) {
      const contentHeight = gridRef.current.offsetHeight;
      const rows = Math.ceil(contentHeight / GRID_SIZE);
      setGridHeight(rows * GRID_SIZE);
    }
  }, []);

  useEffect(() => {
    updateHeight();

    const observer = new ResizeObserver(updateHeight);
    if (gridRef.current) observer.observe(gridRef.current);

    window.addEventListener("resize", updateHeight);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateHeight);
    };
  }, [faqs, updateHeight]);

  return (
    <div className="relative w-full px-10 md:px-24 py-6 rounded-3xl">
      {/* FAQ Title */}
      <div className="mb-20">
        <h1 className="text-3xl font-bold text-textPrimary text-left">
          Frequently Asked Questions
        </h1>
      </div>

      {/* Grid Container */}
      <div className="relative mx-auto max-w-[1200px] w-full pb-20">
        {/* Grid Background */}
        <div
          className="absolute inset-0 bg-faq-grid z-0 rounded-xl pointer-events-none overflow-hidden"
          style={{ height: `${gridHeight}px` }}
        />

        {/* Cards Container */}
        <div
          ref={gridRef}
          className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-20 py-16 px-8 mx-auto"
        >
          {faqs.map((faq, idx) => (
            <InfoCard
              key={idx}
              flowerIndex={faq.flowerIndex}
              title={faq.title}
              body={faq.body}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default FAQ;
