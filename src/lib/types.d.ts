import type { UUID } from "crypto";

/**
 * for `Wordle`
 * 
 * The colors that will be printed the cells when user writes a word.
 * - `green` means the letter is in the word and in a corrrect position.
 * - `yellow` means the letter is in the word but in the incorrect position.
 * - `gray` is the default value.
 * - `neutral` means the letter is not in the word. 
 */
export type CellColor = "green" | "yellow" | "gray" | "neutral";

/**
 * for `Wordle`
 * 
 * The object that represents one letter of the word.
 */
export type Letter = {
  value: string;
  color: CellColor;
}

export type Word = Letter[]

/**
 * for `Guess the verb`
 */
export interface Verb {
  /**
   * The verb itself.
   */
  value: string;
  /**
   * Most common translations of the verb.
   */
  translations: string[];
  /**
   * Some example sentences.
   */
  examplePhrases: string[];
  /**
   * The words that should be highlighted in the example sentences.
   * This is because a verb can be written in different tenses and change.
   * 
   * For example: `add` and `added`.
   */
  highlight: string[];
}

export interface GameMode {
  uuid: UUID;
  name: string;
  shortDescription: string;
  href: string;
  available: boolean;
}

/** Custom type for slugs in **dynamic pages**. */
export type Slug = string

export type Language = "english"

/**
 * Available dialogue's topics in app.
 */
export enum Topic {
  TRAVEL = "travel"
}

/**
 * Represents one dialogue's line from the chat.
 */
export type Line = {
  text: string;
  sender: string;
}

/**
 * Represents the object stored in json/db for one dialogue's line.
 */
export type DialogueLine = {
  text: string;
  /**
   * Options available to choose from with a total of four where only one will be correct.
   */
  options: string[];

  /**
   * The correct option to choose from.
   */
  correct: string;
  sender: string;
}

export type Dialogue = {
  topic: Topic;
  title: string;
  dialogues: DialogueLine[];
  final: Line;
  description: string;
  slug: Slug;
}

export type Story = {
  chat: Line[];
  dialogue: Dialogue;
  currentCorrect: string;
  currentDialogueIndex: number;
  completed: boolean;
}

/** Represents the complexity of each sentence (Phrase) */
export enum Difficulty {
  Easy = "easy",
  Medium = "medium",
  Hard = "hard"
}

/** Representation of the data of each *phrase* in **Complete the phrase** */
export type Phrase = {
  /**
   * Initial sentence to answer.
   */
  text: string,
  /**
   * The correct positions of the words.
   */
  order: string[],
  /**
   * The different options to build the sentence.
   */
  options: string[],
  difficulty: Difficulty
}

export type Tuple<T, E> = [T, E];