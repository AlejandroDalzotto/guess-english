import { GameMode } from "@/lib/types";
import GameCard from "./GameCard";

const modes: GameMode[] = [
  {
    id: "1-build-the-sentence-game-adsf77as7f1",
    name: "build the sentence",
    shortDescription: "Order the sentence correctly.",
    href: "/build-the-sentence",
    available: true,
  },
  {
    id: "2-wordle-game-9as9db1b2",
    name: "wordle",
    shortDescription: "Get 6 chances to guess a 5-letters word.",
    href: "/wordle",
    available: true,
  },
  {
    id: "3-dialogues-game-cQ92vF12er",
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

              <div className="flex flex-col items-start gap-y-3" key={mode.id}>
                <GameCard mode={mode} />
              </div>

            )
          })
        }

      </ul>
    </article>
  )
}
