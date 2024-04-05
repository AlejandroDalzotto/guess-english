import { randomUUID, type UUID } from "crypto";
import Link from "next/link";

interface GameMode {
  uuid: UUID;
  name: string;
  shortDescription: string;
  href: string;
}

const modes: GameMode[] = [
  {
    uuid: randomUUID(),
    name: "guess the verb",
    shortDescription: "Select the correct translation of the verb.",
    href: "/guess-the-verb"
  },
  {
    uuid: randomUUID(),
    name: "complete the phrase",
    shortDescription: "Complete the blank places of the phrase.",
    href: "/complete-the-phrase"
  } 
]

export default function GameModes() {
  return (
    <article>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {
          modes.map((mode) => {
            return (

              <Link
                href={mode.href}
                className="relative hover:bg-white/5 grid place-content-center border border-neutral-700 h-full p-6 transition-all rounded-lg dark:hover:scale-105 hover:scale-105"
                key={mode.uuid}
              >
                <h3 className="capitalize text-2xl font-medium">{mode.name}</h3>
                <p>{mode.shortDescription}</p>
                <span
                  className="mt-6 text-right underline text-blue-500 dark:text-indigo-500"
                >
                  Let&apos;s try...
                </span>
              </Link>

            )
          })
        }

      </ul>
    </article>
  )
}
