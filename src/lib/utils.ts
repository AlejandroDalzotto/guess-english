import { translatedVerbs, verbs } from "@/lib/data";
import type { Verb } from "./types";

export const generateOptions = (mainVerb: string | undefined): string[] => {

  if (!mainVerb || mainVerb === "") {
    throw new Error("It was a problem generating the options.")
  }

  const options = [mainVerb]

  for (let i = 1; i < 4; i++) {

    const j = Math.floor(Math.random() * translatedVerbs.length);
    options.push(translatedVerbs[j])
  }
  return shuffleArray(options);
}

export const getRandomVerb = (): Verb => {

  const randIndex = Math.floor(Math.random() * verbs.length);
  const verb = verbs.at(randIndex)

  if(!verb) {
    throw new Error("Verb doesn't found.")
  }

  return verb
}

export const shuffleArray = <T>(array: T[]): T[] => {

  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
}