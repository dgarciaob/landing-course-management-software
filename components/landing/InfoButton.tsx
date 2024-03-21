"use client";

import { ChevronRight } from "lucide-react";
import React, { useState } from "react";
import { cn } from "@/lib/utils";

const InfoButton = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleIsHovered = () => {
    setIsHovered(!isHovered);
  };

  return (
    <button
      className="bg-secondary px-8 py-4 rounded-full font-bold flex flex-row hover:bg-secondary/80"
      onMouseEnter={handleIsHovered}
      onMouseLeave={handleIsHovered}
    >
      Conoce más
      <ChevronRight
        size={24}
        className={cn(
          "ml-2",
          isHovered
            ? "translate-x-2 transition-all duration-300 ease-in-out"
            : "transition-all duration-300 ease-in-out"
        )}
      />
    </button>
  );
};

export default InfoButton;
