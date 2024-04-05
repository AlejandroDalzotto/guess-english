import { translatedVerbs } from "@/lib/data";

export const generateOptions = (mainVerb: string): string[] => {

  const options = [mainVerb]

  for (let i = 1; i < 4; i++) {

    const j = Math.floor(Math.random() * translatedVerbs.length);
    options.push(translatedVerbs[j])
  }
  return shuffleArray(options);
}

export const shuffleArray = <T>(array: T[]): T[] => {

  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
}