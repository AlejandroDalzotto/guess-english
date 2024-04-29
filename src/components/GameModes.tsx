import { randomUUID } from "crypto";
import { GameMode } from "@/lib/types";
import GameCard from "./GameCard";

const modes: GameMode[] = [
  {
    uuid: randomUUID(),
    name: "guess the verb",
    shortDescription: "Select the correct translation of the verb.",
    href: "/guess-the-verb",
    available: true,
  },
  {
    uuid: randomUUID(),
    name: "complete the phrase",
    shortDescription: "Order the sentence correctly.",
    href: "/complete-the-phrase",
    available: true,
  },
  {
    uuid: randomUUID(),
    name: "wordle",
    shortDescription: "Get 6 chances to guess a 5-letters word.",
    href: "/wordle",
    available: true,
  },
  {
    uuid: randomUUID(),
    name: "Dialogues",
    shortDescription: "Respond to dialogues correctly.",
    href: "/dialogues",
    available: true,
  }
]

export default function GameModes() {
  return (
    <article>
      <ul className="grid grid-cols-1 gap-8 md:grid-cols-2">

        {
          modes.map((mode) => {

            return (

              <div className="flex flex-col items-start gap-y-3" key={mode.uuid}>
                <GameCard mode={mode} />
              </div>

            )
          })
        }

      </ul>
    </article>
  )
}
