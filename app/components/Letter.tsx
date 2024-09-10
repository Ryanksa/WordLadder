"use client";

import { useMemo } from "react";
import { getRandomInt, LetterColorVariant } from "../lib/utils";

interface LetterProps {
  letter: string;
  colorVariant?: LetterColorVariant;
  animation?: LetterAnimation;
  animationDelay?: number;
}

export default function Letter({
  letter,
  colorVariant = LetterColorVariant.SYSTEM,
  animation,
  animationDelay = 0,
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

  const rollZ25 = useMemo(() => getRandomInt(-9, 9), []);
  const rollY50 = useMemo(() => getRandomInt(-9, 9), []);
  const rollZ75 = useMemo(() => getRandomInt(-9, 9), []);

  const lookUpX = useMemo(() => getRandomInt(1, 18), []);
  const lookUpY = useMemo(() => getRandomInt(-lookUpX, lookUpX), []);
  const lookUpZ = useMemo(() => getRandomInt(-lookUpX, lookUpX), []);

  const dropX0 = useMemo(() => getRandomInt(-27, 27), []);
  const dropX30 = useMemo(() => dropX0 - dropX0 / 3, []);
  const dropX45 = useMemo(() => dropX30 - dropX30 / 3, []);
  const dropX60 = useMemo(() => dropX45 - dropX45 / 3, []);
  const dropX75 = useMemo(() => dropX60 - dropX60 / 3, []);
  const dropZ25 = useMemo(() => getRandomInt(-9, 9), []);
  const dropY50 = useMemo(() => getRandomInt(-9, 9), []);
  const dropZ75 = useMemo(() => getRandomInt(-9, 9), []);
  const dropRotation = useMemo(() => getRandomInt(-3, 0) * 360, []);

  return (
    <div
      className={`relative ${animation}`}
      style={
        {
          transformStyle: "preserve-3d",
          transform: "rotateX(-5deg)",
          animationDelay: `${animationDelay}ms`,
          "--roll-z-25": `${rollZ25}deg`,
          "--roll-y-50": `${rollY50}deg`,
          "--roll-z-75": `${rollZ75}deg`,
          "--look-up-x": `${lookUpX}deg`,
          "--look-up-y": `${lookUpY}deg`,
          "--look-up-z": `${lookUpZ}deg`,
          "--drop-z-25": `${dropZ25}deg`,
          "--drop-y-50": `${dropY50}deg`,
          "--drop-z-75": `${dropZ75}deg`,
          "--drop-x-0": `${dropX0}px`,
          "--drop-x-30": `${dropX30}px`,
          "--drop-x-45": `${dropX45}px`,
          "--drop-x-60": `${dropX60}px`,
          "--drop-x-75": `${dropX75}px`,
          "--drop-rotation": `${dropRotation}deg`,
        } as React.CSSProperties
      }
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

export enum LetterAnimation {
  ROLL = "animate-letter-roll",
  LOOK_UP = "animate-letter-look-up",
  DROP = "animate-letter-drop",
  SHAKE = "animate-letter-shake",
}
