"use client";

import { useCallback, useState, useEffect } from "react";
import Keyboard from "./Keyboard";
import Word from "./Word";
import { GameState, isLetter, KeyEnum, LetterColorVariant } from "../utils";
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
  const [popConfetti, setPopConfetti] = useState(false);
  const [rickRolled, setRickRolled] = useState(false);

  useEffect(() => {
    if (gameState === GameState.WON) {
      setTimeout(() => setPopConfetti(true), 2000);
    }
  }, [gameState]);

  const updateGameState = (words: string[][]) => {
    const lastWord = words.at(-1)!;
    const hasWon = lastWord.join("") === endWord;
    if (hasWon) setGameState(GameState.WON);
    return hasWon;
  };

  const onKeydown = useCallback((key: string) => {
    if (isLetter(key)) {
      setWords((prev) => {
        const lastWord = prev.at(-1)!;
        const cursorIndex = lastWord.findIndex((letter) => letter === "");
        if (cursorIndex === -1) return prev;
        lastWord[cursorIndex] = key;
        if (lastWord.join("") === "RICK") setRickRolled(true);
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
        if (updateGameState(prev)) return prev;
        return [...prev, Array(startWord.length).fill("")];
      });
    }
  }, []);

  return (
    <>
      <div className="h-screen flex flex-col gap-6">
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
                  gameState === GameState.WON ? LetterAnimation.LOOK_UP
                  : rickRolled ? LetterAnimation.ROLL 
                  : LetterAnimation.DROP
                }
                animationDelay={rickRolled ? (words.length - i - 1) * 90 : 0}
              />
            )
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
      {rickRolled && (
        <audio src="/rickroll.mp3" autoPlay loop></audio>
      )}
    </>
  );
}
