import type { UUID } from "crypto";
import type { Difficulty, SentenceType, Topic } from "./enums";

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

export interface GameMode {
  id: string;
  name: string;
  shortDescription: string;
  href: string;
  available: boolean;
}


export type Language = "english"

/** Custom type for slugs in **dynamic pages**. */
export type Slug = string

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

/** Representation of the data of each *sentence* in **Complete the phrase** */
export type Sentence = {
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
  difficulty: Difficulty,
  type: SentenceType
  id: string;
}

export type Tuple<T, E> = [T, E];