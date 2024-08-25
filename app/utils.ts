const letterRegex = /^[a-zA-Z]$/;

export enum KeyEnum {
  Q = "Q",
  W = "W",
  E = "E",
  R = "R",
  T = "T",
  Y = "Y",
  U = "U",
  I = "I",
  O = "O",
  P = "P",
  A = "A",
  S = "S",
  D = "D",
  F = "F",
  G = "G",
  H = "H",
  J = "J",
  K = "K",
  L = "L",
  Z = "Z",
  X = "X",
  C = "C",
  V = "V",
  B = "B",
  N = "N",
  M = "M",
  ENTER = "ENTER",
  BACKSPACE = "BACKSPACE",
}

export enum LetterColorVariant {
  SYSTEM = "system",
  NEUTRAL = "neutral",
  SUCCESS = "success",
}

export const isLetter = (key: string): boolean => {
  return letterRegex.test(key);
};
