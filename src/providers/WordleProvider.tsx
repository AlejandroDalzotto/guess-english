"use client";

import { compareWords, isValidKey } from "@/lib/utils";
import { useWordleStore } from "@/stores/wordle-store";
import { useEffect, type KeyboardEvent } from "react"

interface Props {
  children: React.ReactNode
}

export default function WordleProvider({ children }: Props) {

  useEffect(() => {
    useWordleStore.persist.rehydrate();
  }, [])

  const store = useWordleStore((state) => state)

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    e.preventDefault()

    if (store.gameState === "playing") {

      if (e.key === "Enter" && store.board[store.currentRow].every(v => v.value !== " ")) {

        const comparedWord = compareWords(store.word, store.currentWord)

        // If the typed word is equals to the secret word then user win
        if (comparedWord.every(letter => letter.color === "green")) {
          store.onVictory(comparedWord)
        } else {
          // If not, user lose
          store.onDefeat(comparedWord)
        }

        return;
      }

      // Validate if backspace is pressed
      if (e.key === "Backspace") {
        store.onBackspace();
        return;
      }

      // If key pressed is neither Enter or Backspace, fill the current column with the value
      if (isValidKey(e.key) && store.currentWord[4].value === " ") {
        store.onTyping(e.key);
        return;
      }
    }
  }

  return (
    <div className="outline-none" autoFocus tabIndex={-1} onKeyDown={(e) => handleKeyDown(e)}>
      {children}
    </div>
  )
}
