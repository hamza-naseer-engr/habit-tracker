import { colors, positions, rotation } from "../utils/constants";

interface RibbonProps {
  text: string;
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}

const Ribbon: React.FC<RibbonProps> = ({ text, position = "top-right" }) => {
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
