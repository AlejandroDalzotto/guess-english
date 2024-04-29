import { getPhrasesDifficulties } from "@/lib/actions"
import { generateUUID } from "@/lib/utils"

export default async function CompleteThePhraseMode() {

  const difficulties = await getPhrasesDifficulties()

  return (
    <article className="h-full">

      <header className="flex flex-col items-center">
        <p>Choose between the different difficulties, complete each phrase to unlock the next difficulty</p>
      </header>

      <section className="relative flex gap-10 mt-10">

        {
          difficulties.map(difficulty => {

            return (

              <div
                className="flex flex-col w-full p-5 transition-all border rounded-lg hover:bg-white/5 hover:cursor-pointer gap-y-5 border-neutral-800 hover:scale-105"
                key={generateUUID()}>
                <h2 className="text-xl font-medium text-center capitalize">{difficulty[1]}</h2>
                <p className="italic text-center text-neutral-600">total phrases: {difficulty[0]}</p>
              </div>

            )

          })
        }

      </section>

      <footer>

        {/*  */}

      </footer>
    </article>
  )
}
