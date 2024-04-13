"use client";

import { useWordleStore } from "@/stores/wordle-store";

export default function BackspaceButton() {

  const onBackspace = useWordleStore(state => state.onBackspace)

  return (
    <button
      onClick={() => onBackspace()}
      className="bg-neutral-800 select-none p-2 md:p-4 md:aspect-square text-2xl font-bold grid place-content-center rounded-md">
      <svg className="w-8 h-8 fill-white">
        <use xlinkHref="/sprites.svg#go-back"></use>
      </svg>

    </button>
  )
}
