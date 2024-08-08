import React from "react";

interface RibbonProps {
  text: string;
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}

const Ribbon: React.FC<RibbonProps> = ({ text, position = "top-right" }) => {
  const colors: any = {
    daily: "bg-red-500",
    weekly: "bg-green-500",
  };
  const positions = {
    "top-left":
      "top-[2px] left-[-10px] transform -translate-x-1/2 -translate-y-1/2",
    "top-right":
      "top-[5px] right-[-8px] transform translate-x-1/2 -translate-y-1/2",
    "bottom-left":
      "bottom-[5px] left-[-8px] transform -translate-x-1/2 translate-y-1/2",
    "bottom-right":
      "bottom-[5px] right-[-8px] transform translate-x-1/2 translate-y-1/2",
  };

  const rotation = {
    "top-left": "rotate(320deg)",
    "top-right": "rotate(-320deg)",
    "bottom-left": "rotate(40deg)",
    "bottom-right": "rotate(-40deg)",
  };

  return (
    <div
      className={`absolute ${positions[position]} ${colors[text]} text-white py-0 px-2 z-10 text-xs font-medium border-rounded border rounded`}
      style={{ transform: rotation[position] }}
    >
      <span>{text}</span>
    </div>
  );
};

export default Ribbon;
