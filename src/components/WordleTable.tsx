"use client";

import { generateUUID } from "@/lib/utils"
import { useWordleStore } from "@/stores/wordle-store";
import { useStore } from "zustand";
import Loader from "./Loader";
import clsx from "clsx";

export default function WordleTable() {

  const store = useStore(useWordleStore, (state) => state)

  if (!store || !store._hasHydrated) {
    return <Loader />
  }

  return (
    <article className="h-fit flex flex-col gap-y-2 justify-center items-center">

      {
        store.board.map((row, rowIndex) => {

          return (

            <div className="flex gap-x-2" key={generateUUID()}>

              {
                row.map((letter, colIndex) => {

                  return (
                    <div
                      className={clsx(
                        "border-2 transition-all rounded-lg w-14 text-2xl font-bold capitalize aspect-square grid place-content-center",
                        { "border-blue-400": store.currentCol === colIndex && store.currentRow === rowIndex },
                        { "border-neutral-700": store.currentCol !== colIndex || store.currentRow !== rowIndex },
                        { "bg-neutral-900": letter.color === "neutral" },
                        { "bg-yellow-500": letter.color === "yellow" },
                        { "bg-green-500": letter.color === "green" },
                        { "bg-neutral-950": letter.color === "gray" },
                      )}
                      key={generateUUID()}
                    >
                      {letter.value}
                    </div>
                  )
                })
              }

            </div>

          )

        })
      }

    </article>
  )
}
