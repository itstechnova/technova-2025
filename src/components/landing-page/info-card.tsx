"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface InfoCardProps {
  flowerIndex: number;
  title: string;
  body: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ flowerIndex, title, body }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen((prev) => !prev);

  return (
    <div
      className="relative bg-gradient-to-r from-navSecondary to-navSecondaryHover 
                 p-6 sm:p-8 rounded-xl w-full flex flex-col cursor-pointer"
      onClick={toggleOpen}
    >
      {/* Flower Icon (top-left) */}
      <div className="absolute -top-10 -left-4 z-10 pointer-events-none">
        <img
          src={`/themed_assets/flowers/flower${flowerIndex}.svg`}
          alt={`Flower ${flowerIndex}`}
          className="w-24 h-24 sm:w-28 sm:h-28"
        />
      </div>

      {/* Carrot Icon (top-right, rotates) */}
      <div className="absolute top-4 right-4 z-10 pointer-events-none">
        <motion.img
          src="/themed_assets/carrot.svg"
          alt="Carrot Icon"
          className="w-8 h-8 sm:w-10 sm:h-10"
          initial={{ rotate: 180 }}
          animate={{ rotate: isOpen ? 0 : 180 }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Card Content */}
      <div className="mt-16 text-white">
        <h3 className="text-xl sm:text-2xl font-bold mb-4">{title}</h3>

        <AnimatePresence>
          {isOpen && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="text-base sm:text-lg leading-relaxed overflow-hidden"
            >
              {body}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default InfoCard;
