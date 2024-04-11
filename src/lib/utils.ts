import { translatedVerbs, verbs } from "@/lib/data";
import type { Verb } from "./types";

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
