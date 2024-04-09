import { randomUUID, type UUID } from "crypto";
import Link from "next/link";
import LinkToRecords from "./LinkToRecords";
import clsx from "clsx";

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
  available: boolean;
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
                <Link
                  href={mode.href}
                  className={
                    clsx(
                      "relative grid place-content-center border border-neutral-700 h-full p-6 transition-all rounded-lg",
                      { "active:scale-95 hover:bg-white/5 hover:scale-105": mode.available },
                      { "pointer-events-none opacity-80 brightness-75": !mode.available }
                    )
                  }
                >
                  <h3 className="capitalize text-2xl font-medium">{mode.name}</h3>
                  <p>{mode.shortDescription}</p>
                  <span
                    className="mt-6 text-right underline text-blue-500 dark:text-indigo-500"
                  >
                    {mode.available ? "Let's try..." : "Not yet available..."}
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
