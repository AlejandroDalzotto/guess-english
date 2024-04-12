"use client";

import { generateUUID } from "@/lib/utils"
import { useWordleStore } from "@/stores/wordle-store";
import Loader from "./Loader";
import clsx from "clsx";

export default function WordleTable() {

  const board = useWordleStore((state) => state.board)
  const currentCol = useWordleStore((state) => state.currentCol)
  const currentRow = useWordleStore((state) => state.currentRow)

  return (
    <article className="h-fit flex flex-col gap-y-1 justify-center items-center">

      {
        board.map((row, rowIndex) => {

          return (

            <div className="flex gap-x-1" key={generateUUID()}>

              {
                row.map((letter, colIndex) => {

                  return (
                    <div
                      className={clsx(
                        "border-2 transition-all rounded-lg w-16 text-2xl font-bold capitalize aspect-square grid place-content-center",
                        { "border-blue-400": currentCol === colIndex && currentRow === rowIndex },
                        { "border-neutral-700": currentCol !== colIndex || currentRow !== rowIndex },
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
