import { getDialoguesTopics } from "@/lib/actions"
import { generateUUID } from "@/lib/utils"
import TotalDialogues from "./TotalDialogues"
import LinkSfx from "../LinkSfx"

export default async function DialoguesMode() {

  const topics = await getDialoguesTopics()

  return (
    <article className="flex flex-col items-center w-full h-full">

      <p className="mb-10 text-center text-balance">Select between the different topics available to see dialogues about them.</p>

      <article className="grid w-full h-full grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-4">

        {
          topics.map((topic) => {

            return (

              <LinkSfx
                href={`/dialogues/${topic}`}
                className="flex flex-col items-center justify-center transition-all border rounded-lg shadow cursor-pointer active:scale-90 hover:bg-white/5 border-neutral-800 hover:scale-105"
                key={generateUUID()}
              >
                <p className="text-3xl font-bold capitalize">
                  {topic}
                </p>
                <TotalDialogues topic={topic} />
              </LinkSfx>

            )

          })
        }

      </article>

    </article>
  )
}
