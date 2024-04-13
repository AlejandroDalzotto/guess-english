"use client";

import { generateUUID } from "@/lib/utils";
import { useWordleStore } from "@/stores/wordle-store";
import clsx from "clsx";

export default function Qwerty() {

  const qwerty = useWordleStore(state => state.qwerty)

  return (
    <div className="flex flex-col gap-y-2 items-center">
      {
        qwerty.map((row) => {
          return (
            <div className="flex gap-x-2" key={generateUUID()}>
              {
                row.map((letter) => {

                  return (
                    <div className={clsx(
                      "select-none w-14 h-14 text-2xl uppercase font-bold grid place-content-center rounded-md",
                      { "bg-neutral-800": letter.color === "neutral" },
                      { "bg-yellow-500": letter.color === "yellow" },
                      { "bg-green-500": letter.color === "green" },
                      { "bg-neutral-950": letter.color === "gray" },
                    )} key={generateUUID()}>
                      {letter.value}
                    </div>
                  )
                })
              }
            </div>
          )
        })
      }
    </div>
  )
}
