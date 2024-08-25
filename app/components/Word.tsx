import { LetterColorVariant } from "../utils";
import Letter from "./Letter";

interface WordProps {
  letters: string[];
  letterColorVariants?: LetterColorVariant[];
}

export default function Word({ letters, letterColorVariants }: WordProps) {
  return (
    <div
      className="flex items-center justify-between h-12 md:h-20 [--w:3rem] md:[--w:5rem]"
      style={{
        width: `calc(${letters.length} * var(--w))`,
      }}
    >
      {letters.map((letter, i) => (
        <Letter
          key={i}
          letter={letter}
          colorVariant={letterColorVariants?.at(i)}
          rollDelay={i * 75}
        />
      ))}
    </div>
  );
}
