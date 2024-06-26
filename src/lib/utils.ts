import type { Letter, Word } from "./types";

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

export const generateQwerty = (): Letter[][] => {

  const firstRow: Letter[] = "qwertyuiop".split("").map(letter => ({ value: letter, color: "neutral" }))
  const secondRow: Letter[] = "asdfghjkl".split("").map(letter => ({ value: letter, color: "neutral" }))
  const thirdRow: Letter[] = "zxcvbnm".split("").map(letter => ({ value: letter, color: "neutral" }))

  return [
    firstRow,
    secondRow,
    thirdRow,
  ]
}

export const updateKeyboard = (word: Word, keyboard: Letter[][]): Letter[][] => {
  // Loop through all the elements of the keyboard.
  const updatedKeyboard: Letter[][] = keyboard.map(row =>
    // Loop through all the elements of the row.
    row.map(key => {

      // find the specific letter in the word.
      const isKeyInWord = word.find(letter => letter.value === key.value && key.color !== "green")

      if (isKeyInWord) {
        return isKeyInWord
      }

      return key

    })
  );
  return updatedKeyboard;
}

export const toUpperFirst = (str: string, option: "first" | "all" = "all"): string => {

  const capitalizeWord = (word: string): string => {
    return word[0].toUpperCase() + word.slice(1);
  };

  const parsedStr = str.toLowerCase().split("-");

  if (option === "all") {
    const result = parsedStr.map(capitalizeWord);
    return result.join(" ");
  }

  const resultOnlyFirst = parsedStr.map((word, index) => {
    return index === 0 ? capitalizeWord(word) : word;
  });

  return resultOnlyFirst.join(" ");

}