"use client";

import { useState, useEffect } from "react";
import Keyboard from "./Keyboard";
import Word from "./Word";
import { GameState, isLetter, KeyEnum, LetterColorVariant } from "../lib/utils";
import ConfettiExplosion from "react-confetti-explosion";
import { LetterAnimation } from "./Letter";

interface GameProps {
  startWord: string;
  endWord: string;
}

export default function Game({ startWord, endWord }: GameProps) {
  const [gameState, setGameState] = useState<GameState>(GameState.PLAYING);
  const [words, setWords] = useState<string[][]>([
    Array(startWord.length).fill(""),
  ]);
  const [animations, setAniamtions] = useState<LetterAnimation[]>([
    LetterAnimation.DROP,
  ]);
  const [error, setError] = useState<string | null>(null);
  const [popConfetti, setPopConfetti] = useState(false);

  useEffect(() => {
    if (gameState === GameState.WON) {
      setTimeout(() => setPopConfetti(true), 2000);
    }
  }, [gameState]);

  const updateGameState = async (
    startWord: string,
    endWord: string,
    words: string[]
  ): Promise<{ won: boolean; error?: string }> => {
    const lastWord = words.at(-1)!;
    return { won: lastWord === endWord };
  };

  const onKeydown = async (key: string) => {
    if (error) {
      setError(null);
      setAniamtions([...animations.slice(0, -1), LetterAnimation.NONE]);
    }

    if (isLetter(key)) {
      const lastWord = words.at(-1)!;
      const cursorIndex = lastWord.findIndex((letter) => letter === "");
      if (cursorIndex === -1) return;

      lastWord[cursorIndex] = key;
      return setWords([...words]);
    }

    if (key === KeyEnum.BACKSPACE) {
      const lastWord = words.at(-1)!;
      const cursorIndex = lastWord.findIndex((letter) => letter === "");

      if (cursorIndex === 0 && words.length > 1) {
        setAniamtions([...animations.slice(0, -1)]);
        return setWords([...words.slice(0, -1)]);
      }

      if (cursorIndex === -1) {
        lastWord[lastWord.length - 1] = "";
      } else {
        lastWord[cursorIndex - 1] = "";
      }
      return setWords([...words]);
    }

    if (key === KeyEnum.ENTER) {
      const lastWord = words.at(-1)!;
      const cursorIndex = lastWord.findIndex((letter) => letter === "");
      if (cursorIndex !== -1) return;

      window.scroll({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });

      const state = await updateGameState(
        startWord,
        endWord,
        words.map((word) => word.join(""))
      );
      if (state.error) {
        setAniamtions([...animations.slice(0, -1), LetterAnimation.SHAKE]);
        return setError(state.error);
      }
      if (state.won) {
        setAniamtions(Array(words.length).fill(LetterAnimation.LOOK_UP));
        return setGameState(GameState.WON);
      }

      setAniamtions([...animations, LetterAnimation.DROP]);
      return setWords([...words, Array(startWord.length).fill("")]);
    }
  };

  return (
    <>
      <div className="h-screen flex flex-col gap-6">
        {error && (
          <div className="fixed top-3 left-1/2 -translate-x-1/2 z-20 rounded-md px-6 py-2 text-sm md:text-lg font-bold text-red-500 bg-zinc-600/90">
            {error}
          </div>
        )}
        <div className="flex flex-col items-center gap-6 px-3 py-12">
          <Word letters={startWord.split("")} />
          {words.map((letters, i) => {
            return (
              <Word
                key={i}
                letters={letters}
                letterColorVariants={letters.map((letter, i) => {
                  if (letter === endWord[i]) return LetterColorVariant.SUCCESS;
                  return LetterColorVariant.NEUTRAL;
                })}
                animation={animations[i]}
                animationDelay={0}
              />
            );
          })}
          <Word letters={endWord.split("")} />
        </div>
        <div className="mt-auto bg-[rgb(36,36,36)] sticky bottom-0">
          <Keyboard
            onKeydown={gameState === GameState.PLAYING ? onKeydown : undefined}
          />
        </div>
      </div>
      {popConfetti && (
        <div className="fixed top-12 w-full flex justify-center">
          <ConfettiExplosion />
        </div>
      )}
    </>
  );
}
