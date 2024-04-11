"use client";

import { useWordleStore } from "@/stores/wordle-store";
import useSound from "use-sound";
import { useStore } from "zustand";
import Loader from "./Loader";
import clsx from "clsx";

export default function ResetWordleButtom() {

  const [playOnDown] = useSound("/audio/pop-down.mp3", { volume: 0.5 })
  const [playOnUp] = useSound("/audio/pop-up-on.mp3", { volume: 0.5 })

  const store = useStore(useWordleStore, (state) => state)

  if (!store || !store._hasHydrated) {
    return <Loader />
  }

  return (
    <button
      onMouseDown={() => playOnDown()}
      onMouseUp={() => {
        playOnUp()
        store.reset()
      }}
      className={clsx(
        "relative grid place-content-center border border-neutral-700 px-6 py-3 transition-all rounded-lg",
        { "pointer-events-none opacity-80": store.gameState === "playing" },
        { "active:scale-90 hover:bg-black/5 dark:hover:bg-white/5 hover:scale-105": store.gameState === "idle" }
      )}>
      reset game
    </button>
  )
}