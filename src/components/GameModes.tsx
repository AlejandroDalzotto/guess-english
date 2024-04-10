import { randomUUID } from "crypto";
import Link from "next/link";
import LinkToRecords from "./LinkToRecords";
import clsx from "clsx";
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
  }
]

export default function GameModes() {
  return (
    <article>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-8">

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
