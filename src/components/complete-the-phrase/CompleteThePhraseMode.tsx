import type { Tuple } from "@/lib/types"
import type { Difficulty } from "@/lib/enums"
import { getPhrasesDifficulties } from "@/lib/actions"
import { generateUUID } from "@/lib/utils"
import Link from "next/link"

export default async function CompleteThePhraseMode() {

  const difficulties: readonly Tuple<number, Difficulty>[] = await getPhrasesDifficulties()

  return (
    <article className="h-full">

      <header className="flex flex-col items-center">
        <p>Choose between the different difficulties, complete each phrase to unlock the next difficulty</p>
      </header>

      <section className="relative flex gap-10 mt-10">

        {
          difficulties.map(difficulty => {

            return (

              <Link
                href={`/complete-the-phrase/${difficulty[1]}`}
                className="flex flex-col w-full p-5 transition-all border rounded-lg hover:bg-white/5 hover:cursor-pointer gap-y-5 border-neutral-800 hover:scale-105"
                key={generateUUID()}>
                <h2 className="text-xl font-medium text-center capitalize">{difficulty[1]}</h2>
                <p className="italic text-center text-neutral-600">total phrases: {difficulty[0]}</p>
              </Link>

            )

          })
        }

      </section>

      <footer>

      </footer>
    </article>
  )
}
