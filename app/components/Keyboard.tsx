"use client";

import { useEffect } from "react";
import Key from "./Key";
import { KeyEnum } from "../utils";

interface KeyboardProps {
  onKeydown: (event: KeyboardEvent) => void;
}

export default function Keyboard({ onKeydown }: KeyboardProps) {
  useEffect(() => {
    document.addEventListener("keydown", onKeydown);

    return () => {
      document.removeEventListener("keydown", onKeydown);
    };
  }, [onKeydown]);

  return (
    <div className="flex flex-col gap-3 items-center scale-[50%] md:scale-100 p-4">
      <div className="flex gap-2 w-max">
        <Key keyEnum={KeyEnum.Q} keyElement="Q" long={false} />
        <Key keyEnum={KeyEnum.W} keyElement="W" long={false} />
        <Key keyEnum={KeyEnum.E} keyElement="E" long={false} />
        <Key keyEnum={KeyEnum.R} keyElement="R" long={false} />
        <Key keyEnum={KeyEnum.T} keyElement="T" long={false} />
        <Key keyEnum={KeyEnum.Y} keyElement="Y" long={false} />
        <Key keyEnum={KeyEnum.U} keyElement="U" long={false} />
        <Key keyEnum={KeyEnum.I} keyElement="I" long={false} />
        <Key keyEnum={KeyEnum.O} keyElement="O" long={false} />
        <Key keyEnum={KeyEnum.P} keyElement="P" long={false} />
      </div>
      <div className="flex gap-2 w-max">
        <Key keyEnum={KeyEnum.A} keyElement="A" long={false} />
        <Key keyEnum={KeyEnum.S} keyElement="S" long={false} />
        <Key keyEnum={KeyEnum.D} keyElement="D" long={false} />
        <Key keyEnum={KeyEnum.F} keyElement="F" long={false} />
        <Key keyEnum={KeyEnum.G} keyElement="G" long={false} />
        <Key keyEnum={KeyEnum.H} keyElement="H" long={false} />
        <Key keyEnum={KeyEnum.J} keyElement="J" long={false} />
        <Key keyEnum={KeyEnum.K} keyElement="K" long={false} />
        <Key keyEnum={KeyEnum.L} keyElement="L" long={false} />
      </div>
      <div className="flex gap-2 w-max">
        <Key keyEnum={KeyEnum.ENTER} keyElement="ENTER" long={true} />
        <Key keyEnum={KeyEnum.Z} keyElement="Z" long={false} />
        <Key keyEnum={KeyEnum.X} keyElement="X" long={false} />
        <Key keyEnum={KeyEnum.C} keyElement="C" long={false} />
        <Key keyEnum={KeyEnum.V} keyElement="V" long={false} />
        <Key keyEnum={KeyEnum.B} keyElement="B" long={false} />
        <Key keyEnum={KeyEnum.N} keyElement="N" long={false} />
        <Key keyEnum={KeyEnum.M} keyElement="M" long={false} />
        <Key
          keyEnum={KeyEnum.BACKSPACE}
          keyElement={
            <svg width="27" height="27" viewBox="0 0 27 27">
              <path
                fill="white"
                d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H7.07L2.4 12l4.66-7H22v14zm-11.59-2L14 13.41 17.59 17 19 15.59 15.41 12 19 8.41 17.59 7 14 10.59 10.41 7 9 8.41 12.59 12 9 15.59z"
              ></path>
            </svg>
          }
          long={true}
        />
      </div>
    </div>
  );
}
