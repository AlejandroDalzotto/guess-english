"use server";
import { promises as fs } from 'fs';
import type { Dialogue, Sentence, Slug, Tuple, Word } from './types';
import type { Difficulty, Topic } from './enums';

export const getWord = async () => {

  const file = await fs.readFile(process.cwd() + '/src/data/words.json', 'utf8');
  const words: Set<string> = new Set(JSON.parse(file));

  const randIndex = Math.floor(Math.random() * words.size);
  const rawWord = Array.from(words).at(randIndex);
  if (!rawWord) {
    throw new Error("Error finding the word")
  }
  const word: Word = rawWord.split("").map((letter) => ({ value: letter, color: "neutral" }));

  return word;
}

export const isValidWord = async (word: string) => {
  const file = await fs.readFile(process.cwd() + '/src/data/words.json', 'utf8');
  const words: Set<string> = new Set(JSON.parse(file));

  return words.has(word);
}

export const getTotalWords = async () => {
  const file = await fs.readFile(process.cwd() + '/src/data/words.json', 'utf8');
  const words = new Set(JSON.parse(file));

  return words.size;
}

export const getDialoguesTopics = async () => {
  const file = await fs.readFile(process.cwd() + '/src/data/dialogues.json', 'utf8');
  const sections: Dialogue[] = JSON.parse(file);

  const result = new Set(sections.map(dialogue => dialogue.topic))

  return Array.from(result);
}

export const getTotalDialoguesByTopic = async (topic: Topic | string) => {
  const file = await fs.readFile(process.cwd() + '/src/data/dialogues.json', 'utf8');
  const sections: Dialogue[] = JSON.parse(file);

  const filteredSections = sections.filter(dialogue => dialogue.topic === topic);

  return filteredSections.length;
}

export const getDialoguesByTopic = async (topic: Topic | string) => {
  const file = await fs.readFile(process.cwd() + '/src/data/dialogues.json', 'utf8');
  const sections: Dialogue[] = JSON.parse(file);

  const filteredSection = sections.filter(dialogue => dialogue.topic === topic);

  return filteredSection;
}

export const getDialogueByLabel = async (slug: Slug) => {
  const file = await fs.readFile(process.cwd() + '/src/data/dialogues.json', 'utf8');
  const sections: Dialogue[] = JSON.parse(file);

  const filteredSection = sections.find(value => value.slug.toLowerCase() === slug.toLowerCase())

  if (!filteredSection) {
    throw new Error("Dialogue not found")
  }

  return filteredSection;
}

export const getSentenceByText = async (text: string) => {

  const file = await fs.readFile(process.cwd() + '/src/data/sentences.json', 'utf8');
  const sentences: Sentence[] = JSON.parse(file);

  const el = sentences.find(sentence => sentence.text === text)

  if (!el) {
    throw new Error("Sentence not found")
  }

  return el
}

export const getSentences = async () => {
  const file = await fs.readFile(process.cwd() + '/src/data/sentences.json', 'utf8');
  const sentences: Sentence[] = JSON.parse(file);

  return sentences
}

export const getSentencesDifficulties = async () => {
  const file = await fs.readFile(process.cwd() + '/src/data/sentences.json', 'utf8');
  const sentences: Sentence[] = JSON.parse(file);

  const difficulties: Set<Difficulty> = new Set(sentences.map(sentence => sentence.difficulty))

  const result: Tuple<number, Difficulty>[] = []

  difficulties.forEach(value => {
    const amount = sentences.filter(sentence => sentence.difficulty === value).length
    result.push([amount, value])
  })

  return result
}

export const getSentencesByDifficulty = async (difficulty: Difficulty) => {
  const file = await fs.readFile(process.cwd() + '/src/data/sentences.json', 'utf8');
  const sentences: Sentence[] = JSON.parse(file);

  const filteredSentences = sentences.filter(sentence => sentence.difficulty === difficulty)

  return filteredSentences
}
export const getSentence = async (at: number = 0) => {
  const file = await fs.readFile(process.cwd() + '/src/data/sentences.json', 'utf8');
  const sentences: Sentence[] = JSON.parse(file);

  return sentences.at(at)
}