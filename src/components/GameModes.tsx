import { randomUUID } from "crypto";
import LinkToRecords from "./LinkToRecords";
import { GameMode } from "@/lib/types";
import GameCard from "./GameCard";

const modes: GameMode[] = [
  {
    uuid: randomUUID(),
    name: "guess the verb",
    shortDescription: "Select the correct translation of the verb.",
    href: "/guess-the-verb",
    history: {
      store: "gtv__s",
      label: "View verbs history",
      url: "/verbs-history"
    },
    available: true,
  },
  {
    uuid: randomUUID(),
    name: "complete the phrase",
    shortDescription: "Complete the blank places of the phrase.",
    href: "/complete-the-phrase",
    history: {
      store: "ctp__s",
      label: "View phrases history",
      url: "/phrases-history"
    },
    available: false,
  },
  {
    uuid: randomUUID(),
    name: "wordle",
    shortDescription: "Get 6 chances to guess a 5-letters word.",
    href: "/wordle",
    history: {
      store: "w__s",
      label: "View words history",
      url: "/words-history"
    },
    available: true,
  },
  {
    uuid: randomUUID(),
    name: "Learn",
    shortDescription: "Read articles on different topics about grammar.",
    href: "/learn",
    history: {
      store: "l__s",
      label: "View learn history",
      url: "/learn-history"
    },
    available: false,
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

                <LinkToRecords history={mode.history} />
              </div>

            )
          })
        }

      </ul>
    </article>
  )
}
