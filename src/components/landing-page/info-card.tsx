import React from "react";

interface InfoCardProps {
  flowerIndex: number;
  title: string;
  body: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ flowerIndex, title, body }) => {
  return (
    <div
      className="relative bg-gradient-to-r from-navSecondary to-navSecondaryHover 
                 p-6 sm:p-8 rounded-xl w-full min-h-[300px] flex flex-col justify-start"
    >
      {/* Flower Icon (top-left) */}
      <div className="absolute -top-10 -left-4 z-10">
        <img
          src={`/themed_assets/flowers/flower${flowerIndex}.svg`}
          alt={`Flower ${flowerIndex}`}
          className="w-24 h-24 sm:w-28 sm:h-28"
        />
      </div>

      {/* Carrot Icon (top-right) */}
      <div className="absolute top-4 right-2 z-10">
        <img
          src="/themed_assets/carrot.svg"
          alt="Carrot Icon"
          className="w-8 h-8 sm:w-10 sm:h-10"
        />
      </div>

      {/* Card Content */}
      <div className="mt-16 text-white">
        <h3 className="text-xl sm:text-2xl font-bold mb-4">{title}</h3>
        <p className="text-base sm:text-lg leading-relaxed">{body}</p>
      </div>
    </div>
  );
};

export default InfoCard;
