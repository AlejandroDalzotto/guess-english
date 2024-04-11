"use client";

import useStore from "@/hooks/use-store";
import { isValidKey } from "@/lib/utils";
import { useWordleStore } from "@/stores/wordle-store";
import { type KeyboardEvent } from "react"

interface Props {
  children: React.ReactNode
}

export default function WordleProvider({ children }: Props) {

  const store = useStore(useWordleStore, (state) => state)

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    e.preventDefault()

    if (store) {
      if (store._hasHydrated) {

        if (e.key === "Enter" && store.board[store.currentRow].every(v => v.value !== " ")) {

          // If the typed word is equals to the secret word then user win
          if (store.board[store.currentRow] === store.word) {
            store.onVictory()
          } else {
            // If not, user lose
            store.onDefeat()
          }

          return;
        }

        // Validate if backspace is pressed
        if (e.key === "Backspace") {
          store.onBackspace();
          return;
        }

        // If key pressed is neither Enter or Backspace, fill the current column with the value
        if (isValidKey(e.key)) {
          store.onTyping(e.key);
          return;
        }
      }
    }
  }

  return (
    <div className="outline-none" autoFocus tabIndex={-1} onKeyDown={(e) => handleKeyDown(e)}>
      {children}
    </div>
  )
}
