"use client";

import { ReactElement, useState, useEffect } from "react";
import { KeyEnum } from "../utils";

interface KeyProps {
  keyEnum: KeyEnum;
  keyElement: string | ReactElement;
  long?: boolean;
}

export default function Key({ keyEnum, keyElement, long }: KeyProps) {
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    const keydownListener = (event: KeyboardEvent) => {
      if (event.key.toUpperCase() === keyEnum) setPressed(true);
    };
    const keyupListener = (event: KeyboardEvent) => {
      if (event.key.toUpperCase() === keyEnum) setPressed(false);
    };

    document.addEventListener("keydown", keydownListener);
    document.addEventListener("keyup", keyupListener);

    return () => {
      document.removeEventListener("keydown", keydownListener);
      document.removeEventListener("keyup", keyupListener);
    };
  }, []);

  const onPress = () => {
    setPressed(true);
  };

  const onRelease = () => {
    setPressed(false);
  };

  const containerWidth = long ? "w-[calc(5rem+8px)]" : "w-[calc(3rem+8px)]";
  const width = long ? "w-20" : "w-12";
  const fontSize = long ? "text-md" : "text-xl";
  const border = pressed ? "border-y-4 border-x-2" : "border-y-8 border-x-4";

  return (
    <div
      className={`${containerWidth} h-[calc(3rem+16px)] flex items-end justify-center`}
    >
      <div
        className={`${width} h-12 ${fontSize} bg-slate-500 rounded-md grid place-items-center cursor-pointer box-content ${border} border-transparent border-b-slate-700 border-x-slate-600 transition-all`}
        style={{ transform: "rotateX(15deg)" }}
        onMouseDown={onPress}
        onMouseUp={onRelease}
        onTouchStart={onPress}
        onTouchEnd={onRelease}
      >
        {keyElement}
      </div>
    </div>
  );
}
