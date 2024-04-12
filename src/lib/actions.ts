"use server";
import { promises as fs } from 'fs';
import type { Word } from './types';

export const getWord = async () => {

  const file = await fs.readFile(process.cwd() + '/src/data/words.json', 'utf8');
  const words: string[] = JSON.parse(file);

  const randIndex = Math.floor(Math.random() * words.length);
  const rawWord = words[randIndex];
  const word: Word = rawWord.split("").map((letter) => ({ value: letter, color: "neutral" }));

  return word;
}

export const isValidWord = async (word: string) => {
  const file = await fs.readFile(process.cwd() + '/src/data/words.json', 'utf8');
  const words: string[] = JSON.parse(file);

  return words.includes(word);
}