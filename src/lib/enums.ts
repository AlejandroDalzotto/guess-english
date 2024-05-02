/** Represents the complexity of each sentence (Phrase) */
export enum Difficulty {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
}

/**
 * Available dialogue's topics in app.
*/
export enum Topic {
  TRAVEL = "travel",
}

/**
 * Represents the type of a sentence.
 */
export enum SentenceType {
  AFFIRMATIVE = "affirmative",
  NEGATIVE = "negative",
  QUESTION = "question"
}

export enum GameState {
  CORRECT = "correct",
  INCORRECT = "incorrect",
  IDLE = "idle"
}