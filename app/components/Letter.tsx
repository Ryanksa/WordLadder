import { LetterColorVariant } from "../utils";

interface LetterProps {
  letter: string;
  rollDelay?: number;
  colorVariant?: LetterColorVariant;
}

export default function Letter({
  letter,
  rollDelay = 0,
  colorVariant = LetterColorVariant.SYSTEM,
}: LetterProps) {
  let colorLight = "";
  let colorDark = "";
  let colorBorder = "";

  switch (colorVariant) {
    case LetterColorVariant.NEUTRAL:
      colorLight = "bg-gray-400";
      colorDark = "bg-gray-500";
      colorBorder = "border-gray-600";
      break;
    case LetterColorVariant.SUCCESS:
      colorLight = "bg-green-500";
      colorDark = "bg-green-600";
      colorBorder = "border-green-700";
      break;
    case LetterColorVariant.SYSTEM:
    default:
      colorLight = "bg-indigo-300";
      colorDark = "bg-indigo-400";
      colorBorder = "border-indigo-500";
      break;
  }

  return (
    <div
      className="relative animate-letter-roll"
      style={{
        transformStyle: "preserve-3d",
        transform: "rotateX(-5deg) rotateY(3deg)",
        animationDelay: `${rollDelay}ms`,
      }}
    >
      <div
        className={`absolute w-12 md:w-20 h-12 md:h-20 [--half:1.5rem] md:[--half:2.5rem] ${colorLight} border-2 ${colorBorder} opacity-80 grid place-items-center text-xl md:text-4xl`}
        style={{
          transform:
            "translateX(-50%) translateY(-50%) translateZ(var(--half))",
        }}
      >
        {letter}
      </div>
      <div
        className={`absolute w-12 md:w-20 h-12 md:h-20 [--half:1.5rem] md:[--half:2.5rem] ${colorDark} border-2 ${colorBorder} opacity-80`}
        style={{
          transform:
            "translateX(-50%) translateY(-50%) rotateY(90deg) translateZ(var(--half))",
        }}
      ></div>
      <div
        className={`absolute w-12 md:w-20 h-12 md:h-20 [--half:1.5rem] md:[--half:2.5rem] ${colorLight} border-2 ${colorBorder} opacity-80`}
        style={{
          transform:
            "translateX(-50%) translateY(-50%) rotateY(180deg) translateZ(var(--half))",
        }}
      ></div>
      <div
        className={`absolute w-12 md:w-20 h-12 md:h-20 [--half:1.5rem] md:[--half:2.5rem] ${colorDark} border-2 ${colorBorder} opacity-80`}
        style={{
          transform:
            "translateX(-50%) translateY(-50%) rotateY(270deg) translateZ(var(--half))",
        }}
      ></div>
      <div
        className={`absolute w-12 md:w-20 h-12 md:h-20 [--half:1.5rem] md:[--half:2.5rem] ${colorDark} border-2 ${colorBorder} opacity-80`}
        style={{
          transform:
            "translateX(-50%) translateY(-50%) rotateX(90deg) translateZ(var(--half))",
        }}
      ></div>
      <div
        className={`absolute w-12 md:w-20 h-12 md:h-20 [--half:1.5rem] md:[--half:2.5rem] ${colorDark} border-2 ${colorBorder} opacity-80`}
        style={{
          transform:
            "translateX(-50%) translateY(-50%) rotateX(270deg) translateZ(var(--half))",
        }}
      ></div>
    </div>
  );
}
