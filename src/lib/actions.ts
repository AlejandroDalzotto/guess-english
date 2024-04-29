"use server";
import { promises as fs } from 'fs';
import type { DialogueSection, Difficulty, Phrase, Topic, Word } from './types';

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
  const sections: DialogueSection[] = JSON.parse(file);

  const result = new Set(sections.map(dialogue => dialogue.topic))

  return Array.from(result);
}

export const getTotalDialoguesByTopic = async (topic: Topic | string) => {
  const file = await fs.readFile(process.cwd() + '/src/data/dialogues.json', 'utf8');
  const sections: DialogueSection[] = JSON.parse(file);

  const filteredSections = sections.filter(dialogue => dialogue.topic === topic);

  return filteredSections.length;
}

export const getDialoguesByTopic = async (topic: Topic | string) => {
  const file = await fs.readFile(process.cwd() + '/src/data/dialogues.json', 'utf8');
  const sections: DialogueSection[] = JSON.parse(file);

  const filteredSection = sections.filter(dialogue => dialogue.topic === topic);

  return filteredSection;
}

export const getDialogueByLabel = async (label: string) => {
  const file = await fs.readFile(process.cwd() + '/src/data/dialogues.json', 'utf8');
  const sections: DialogueSection[] = JSON.parse(file);

  const filteredSection = sections.find(value => value.title.replaceAll("-", " ").toLowerCase() === label.toLowerCase())

  if (!filteredSection) {
    throw new Error("Dialogue not found")
  }

  return filteredSection;
}

export const getPhraseByText = async (text: string) => {

  const file = await fs.readFile(process.cwd() + '/src/data/phrases.json', 'utf8');
  const phrases: Phrase[] = JSON.parse(file);

  const el = phrases.find(phrase => phrase.text === text)

  if (!el) {
    throw new Error("Phrase not found")
  }

  return el
}

export const getPhrases = async () => {
  const file = await fs.readFile(process.cwd() + '/src/data/phrases.json', 'utf8');
  const phrases: Phrase[] = JSON.parse(file);

  return phrases
}

export const getPhrasesDifficulties = async () => {
  const file = await fs.readFile(process.cwd() + '/src/data/phrases.json', 'utf8');
  const phrases: Phrase[] = JSON.parse(file);

  const difficulties: Set<Difficulty> = new Set(phrases.map(phrase => phrase.difficulty))

  const result: Array<[number, Difficulty]> = []

  difficulties.forEach(value => {
    const amount = phrases.filter(phrase => phrase.difficulty === value).length
    result.push([amount, value])
  })

  return result
}