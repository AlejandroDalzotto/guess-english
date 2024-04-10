import type { UUID } from "crypto";

export interface Verb {
  value: string;
  translations: string[];
  examplePhrases: string[];
  highlight: string[];
}

export interface GameMode {
  uuid: UUID;
  name: string;
  shortDescription: string;
  href: string;
  history: {
    store: string;
    url: string;
    label: string;
  };
  available: boolean;
}