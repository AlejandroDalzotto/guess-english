import { randomUUID, type UUID } from "crypto";
import Link from "next/link";
import LinkToRecords from "./LinkToRecords";

interface GameMode {
  uuid: UUID;
  name: string;
  shortDescription: string;
  href: string;
  history: {
    store: string;
    url: string;
    label: string;
  };
}

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
    }
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
    }
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
                <Link
                  href={mode.href}
                  className="relative hover:bg-white/5 grid place-content-center border border-neutral-700 h-full p-6 transition-all rounded-lg hover:scale-105"
                >
                  <h3 className="capitalize text-2xl font-medium">{mode.name}</h3>
                  <p>{mode.shortDescription}</p>
                  <span
                    className="mt-6 text-right underline text-blue-500 dark:text-indigo-500"
                  >
                    Let&apos;s try...
                  </span>
                </Link>

                <LinkToRecords history={mode.history} />
              </div>

            )
          })
        }

      </ul>
    </article>
  )
}
