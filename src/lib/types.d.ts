import type { UUID } from "crypto";

export type Letter = " " | "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h" | "i" | "j" | "k" | "l" | "m" | "n" | "o" | "p" | "q" | "r" | "s" | "t" | "u" | "v" | "w" | "x" | "y" | "z";

export type Word = [Letter, Letter, Letter, Letter, Letter]

export interface Verb {
  value: string;
  translations: string[];
  examplePhrases: string[];
  highlight: string[];
}

export interface GameMode {
  uuid: UUID;
  name: string;
  shortDescription: string;
  href: string;
  history: {
    store: string;
    url: string;
    label: string;
  };
  available: boolean;
}