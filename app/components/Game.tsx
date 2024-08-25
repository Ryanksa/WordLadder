"use client";

import { useCallback, useState } from "react";
import Keyboard from "./Keyboard";
import Word from "./Word";
import { isLetter, KeyEnum, LetterColorVariant } from "../utils";

interface GameProps {
  startWord: string;
  endWord: string;
}

export default function Game({ startWord, endWord }: GameProps) {
  const [words, setWords] = useState<string[][]>([
    Array(startWord.length).fill(""),
  ]);

  const onKeydown = useCallback((key: string) => {
    if (isLetter(key)) {
      setWords((prev) => {
        const lastWord = prev.at(-1)!;
        const cursorIndex = lastWord.findIndex((letter) => letter === "");
        if (cursorIndex === -1) return prev;
        lastWord[cursorIndex] = key;
        return [...prev];
      });
    } else if (key === KeyEnum.BACKSPACE) {
      setWords((prev) => {
        const lastWord = prev.at(-1)!;
        const cursorIndex = lastWord.findIndex((letter) => letter === "");
        if (cursorIndex === 0 && prev.length > 1) {
          return [...prev.slice(0, -1)];
        } else if (cursorIndex === -1) {
          lastWord[lastWord.length - 1] = "";
        } else {
          lastWord[cursorIndex - 1] = "";
        }
        return [...prev];
      });
    } else if (key === KeyEnum.ENTER) {
      setWords((prev) => {
        const lastWord = prev.at(-1)!;
        const cursorIndex = lastWord.findIndex((letter) => letter === "");
        if (cursorIndex !== -1) return prev;
        window.scroll({
          top: document.body.scrollHeight,
          behavior: "smooth",
        });
        return [...prev, Array(startWord.length).fill("")];
      });
    }
  }, []);

  return (
    <div className="h-screen flex flex-col gap-6">
      <div className="flex flex-col items-center gap-6 px-3 py-12">
        <Word letters={startWord.split("")} />
        {words.map((letters, i) => (
          <Word
            key={i}
            letters={letters}
            letterColorVariants={letters.map((letter, i) => {
              if (letter === endWord[i]) return LetterColorVariant.SUCCESS;
              return LetterColorVariant.NEUTRAL;
            })}
          />
        ))}
        <Word letters={endWord.split("")} />
      </div>
      <div className="mt-auto bg-[rgb(36,36,36)] sticky bottom-0">
        <Keyboard onKeydown={onKeydown} />
      </div>
    </div>
  );
}
