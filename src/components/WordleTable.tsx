import type { Word } from "@/lib/types"
import { generateUUID } from "@/lib/utils"

export default function WordleTable() {

  const board: Array<Word> = [
    ["h", "o", "l", "a", "s"],
    [" ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " "],
  ]

  return (
    <article className="h-fit flex flex-col gap-y-2 justify-center items-center">

      {
        board.map((word) => {

          return (

            <div className="flex gap-x-2" key={generateUUID()}>

              {
                word.map((letter) => {

                  return (
                    <div
                      className="border border-neutral-700 transition-all rounded-lg w-14 text-xl font-bold capitalize aspect-square grid place-content-center"
                      key={generateUUID()}
                    >
                      {letter}
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
