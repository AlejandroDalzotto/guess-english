import type { UUID } from "crypto";

export type CellColor = "green" | "yellow" | "gray" | "neutral";

export type Letter = {
  value: string;
  color: CellColor;
}

export type Word = Letter[]

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
  available: boolean;
}

export type Language = "english"

export type Topic = "travel" | "encouragement" | "food" | "sports" | "education" | "environment" | "entertainment"

export type Dialogue = {
  text: string;
  sender: string;
  options: string[];
  correct: string;
}

export interface DialogueData {
  topic: Topic;
  language: Language;
  dialogue: Dialogue[]
}