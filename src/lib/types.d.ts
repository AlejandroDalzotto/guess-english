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

export type Slug = string

export type Language = "english"

export type Topic = "travel"

export type ChatText = {
  text: string;
  sender: string;
}

export type Dialogue = {
  text: string;
  options: string[];
  correct: string;
  sender: string;
}

export type DialogueSection = {
  topic: Topic;
  label: string;
  dialogues: Dialogue[];
  final: ChatText;
  description: string;
}