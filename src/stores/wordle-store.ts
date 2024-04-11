import { Word } from '@/lib/types';
import { getRandomWord } from '@/lib/utils';
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware';

type State = {
  points: number;
  gameState: "playing" | "idle";
  streak: number;
  records: string[];
  word: Word;
  currentWord: Word,
  currentRow: number;
  currentCol: number;
  board: Array<Word>;
}

type Actions = {
  onVictory: (compareWord: Word) => void;
  onDefeat: (compareWord: Word) => void;
  onTyping: (letter: string) => void;
  onBackspace: () => void;
  reset: () => void;
}

// initial values
const currentStorage = JSON.parse(window.localStorage.getItem("w__s") ?? "{\"words\":[]}") as { words: string[] }

const word = getRandomWord(
  currentStorage.words.length ? currentStorage.words : []
)

const initialState: Omit<State, "_hasHydrated"> = {
  points: 0,
  gameState: "playing",
  streak: 0,
  records: [],
  word,
  currentWord: Array.from({ length: 5 }, () => ({ value: " ", color: "neutral" })),
  currentRow: 0,
  currentCol: 0,
  board: Array.from({ length: 6 }, () => Array.from({ length: 5 }, () => ({ value: " ", color: "neutral" }))),
}

export const useWordleStore = create<State & Actions>()(
  persist(
    (set, get) => ({
      ...initialState,
      onDefeat: (compareWord: Word) => {

        // Last row to guess the word.
        if (get().currentRow + 1 === 6) {

          set((state) => ({
            points: state.points - 10,
            streak: state.streak >= 1 ? state.streak - 1 : 0,
            gameState: "idle",
          }))

          return;
        }

        // Render the board with the new letter typed.
        set((state) => ({
          // Reset col to initial index.
          currentCol: 0,
          // Increase the current row by one.
          currentRow: state.currentRow + 1,
          // Reset the word.
          currentWord: Array.from({ length: 5 }, () => ({ value: " ", color: "neutral" })),
          // Lose one point per word failed.
          points: state.points - 1,

          // Re-render board.
          board: state.board.map((row, rowIndex) => rowIndex === state.currentRow ? compareWord : row)
        }))

      },
      onVictory: (compareWord: Word) => {

        const wordGuessed = compareWord.map(letter => letter.value).join("")

        const wordleStorage = JSON.parse(localStorage.getItem("w__s") ?? "{\"words\":[]}") as { words: string[] }

        if (!wordleStorage.words.includes(wordGuessed)) {
          wordleStorage.words.push(wordGuessed)
        }

        localStorage.setItem("w__s", JSON.stringify(wordleStorage))

        set((state) => ({
          // Print the word result.
          currentWord: compareWord,
          // Lose one point per word failed.
          points: state.points + 10,
          // Re-render board.
          board: state.board.map((row, rowIndex) => rowIndex === state.currentRow ? compareWord : row),
          gameState: "idle",
          // Save the word guessed in the records.
          records: [...state.records, wordGuessed]
        }))

      },
      onTyping: (letter: string) => {

        // Render the board with the new letter typed.
        set((state) => ({
          // Increase the current col by one.
          currentCol: state.currentCol >= 3 ? 4 : state.currentCol + 1,

          // Modify the current word.
          currentWord: state.currentWord.with(state.currentCol, { value: letter, color: "neutral" }),
          board: state.board.map((row, rowIndex) =>
            rowIndex === state.currentRow
              ? row.map((col, colIndex) => (colIndex === state.currentCol ? { value: letter, color: "neutral" } : col))
              : row
          )
        }))

      },
      onBackspace: () => {

        set((state) => ({
          currentCol: state.currentCol <= 1 ? 0 : state.currentCol - 1,
          currentWord: state.currentWord.with(state.currentCol, { value: " ", color: "neutral" }),
          board: state.board.map((row, rowIndex) =>
            rowIndex === state.currentRow
              ? row.map((col, colIndex) => (colIndex === state.currentCol ? { value: " ", color: "neutral" } : col))
              : row
          )
        }))

      },
      reset: () => {

        const { word, ...newState } = initialState

        set((state) => ({
          ...newState,
          word: getRandomWord(currentStorage.words)
        }))

      }
    }),
    {
      name: "wordle-store",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
)