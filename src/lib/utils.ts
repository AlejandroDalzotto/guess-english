import { translatedVerbs, verbs, words } from "@/lib/data";
import type { Letter, Verb, Word } from "./types";

export const generateOptions = (mainVerb: string | undefined): string[] => {

  if (!mainVerb || mainVerb === "") {
    throw new Error("There was a problem generating the options.");
  }

  const options = [mainVerb];

  while (options.length < 4) {
    const randIndex = Math.floor(Math.random() * translatedVerbs.length);
    const randomVerb = translatedVerbs[randIndex];
    if (!options.includes(randomVerb)) {
      options.push(randomVerb);
    }
  }

  return shuffleArray(options);
}

export const getRandomVerb = (currentVerbsHistory: Verb[]): Verb => {
  let verb: Verb | undefined;

  do {
    const randIndex = Math.floor(Math.random() * verbs.length);
    verb = verbs.at(randIndex);
  } while (verb && currentVerbsHistory.some(v => v.value === verb?.value));

  if (!verb) {
    throw new Error("Verb not found.");
  }

  return verb;
}

export const shuffleArray = <T>(array: T[]): T[] => {

  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
}

export const calculatePoints = (currentPoints: number, streak: number, operation: "sum" | "sub" = "sum"): number => {
  // Base points won or lost
  let points = 10;

  if (streak > 0) {
    // Point multiplier based on streak
    const multiplier = Math.log2(streak + 1);

    // Apply the multiplier to the base points
    points *= multiplier;

  }

  if (operation === "sub") {
    return Math.round(currentPoints - points);
  }

  return Math.round(currentPoints + points);
}

export const generateUUID = (): string => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export const isValidKey = (key: string): boolean => {
  const regexp = new RegExp(/^[A-z]$/)

  return regexp.test(key);
}

export const compareWords = (wordSecret: Word, inputUser: Word): Word => {
  const result: Word = [];
  const unmatched: string[] = []

  // Mark correct letters in correct positions
  for (let i = 0; i < wordSecret.length; i++) {
    if (inputUser[i] && inputUser[i].value === wordSecret[i].value) {
      result.push({ value: inputUser[i].value, color: "green" });
    } else {
      result.push({ value: inputUser[i].value, color: "gray" })
      unmatched.push(wordSecret[i].value)
    }
  }

  for (let i = 0; i < wordSecret.length; i++) {

    if (result[i].color === "gray" && unmatched.includes(inputUser[i].value)) {
      result[i].color = "yellow"

      const indexToDelete = unmatched.findIndex((letter) => letter === result[i].value)

      unmatched.splice(indexToDelete, 1)
    }

  }

  return result;
};

export const getRandomWord = (records: string[]): Word => {

  const availableWords = words.filter(value => !records.includes(value))

  if (!availableWords.length) {
    throw new Error("There are no words left, sorry :(")
  }

  const randIndex = Math.floor(Math.random() * availableWords.length);
  const rawWord = availableWords[randIndex]
  const word: Letter[] = rawWord.split("").map((letter) => ({ value: letter, color: "neutral" }))

  return word;
}