"use client";

import { useCallback, useState, useEffect } from "react";
import Keyboard from "./Keyboard";
import Word from "./Word";
import { GameState, isLetter, KeyEnum, LetterColorVariant } from "../lib/utils";
import ConfettiExplosion from "react-confetti-explosion";
import { LetterAnimation } from "./Letter";
import { validate } from "../lib/api";

interface GameProps {
  startWord: string;
  endWord: string;
}

export default function Game({ startWord, endWord }: GameProps) {
  const [gameState, setGameState] = useState<GameState>(GameState.PLAYING);
  const [words, setWords] = useState<string[][]>([
    Array(startWord.length).fill(""),
  ]);
  const [error, setError] = useState<string | null>(null);
  const [popConfetti, setPopConfetti] = useState(false);
  const [rickRolled, setRickRolled] = useState(false);

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
    const currentLadder = [startWord].concat(words.slice(0, -1));

    const response = await validate(currentLadder, endWord, lastWord);
    if (!response.valid_word) {
      return { won: false, error: response.error };
    }

    return { won: lastWord === endWord };
  };

  const onKeydown = async (key: string) => {
    setError(null);

    if (isLetter(key)) {
      const lastWord = words.at(-1)!;
      const cursorIndex = lastWord.findIndex((letter) => letter === "");
      if (cursorIndex === -1) return;

      lastWord[cursorIndex] = key;
      if (lastWord.join("") === "RICK") setRickRolled(true);
      return setWords([...words]);
    }

    if (key === KeyEnum.BACKSPACE) {
      const lastWord = words.at(-1)!;
      const cursorIndex = lastWord.findIndex((letter) => letter === "");

      if (cursorIndex === 0 && words.length > 1) {
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
        return setError(state.error);
      }
      if (state.won) {
        return setGameState(GameState.WON);
      }

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
                animation={
                  gameState === GameState.WON ? LetterAnimation.LOOK_UP : 
                  error ? LetterAnimation.SHAKE :
                  rickRolled ? LetterAnimation.ROLL : 
                  LetterAnimation.DROP
                }
                animationDelay={rickRolled ? (words.length - i - 1) * 90 : 0}
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
      {rickRolled && <audio src="/rickroll.mp3" autoPlay loop></audio>}
    </>
  );
}
