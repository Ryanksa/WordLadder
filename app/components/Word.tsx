import { LetterColorVariant } from "../lib/utils";
import Letter, { LetterAnimation } from "./Letter";

interface WordProps {
  letters: string[];
  letterColorVariants?: LetterColorVariant[];
  animation?: LetterAnimation;
  animationDelay?: number;
}

export default function Word({
  letters,
  letterColorVariants,
  animation,
  animationDelay = 0,
}: WordProps) {
  return (
    <div
      className="flex items-center justify-between h-12 md:h-20 [--w:3rem] md:[--w:5rem]"
      style={{
        width: `calc(${letters.length} * var(--w))`,
        perspective: "45rem",
      }}
    >
      {letters.map((letter, i) => (
        <Letter
          key={i}
          letter={letter}
          colorVariant={letterColorVariants?.at(i)}
          animation={animation}
          animationDelay={animationDelay}
        />
      ))}
    </div>
  );
}
