import type { Metadata } from "next";
import type { Topic } from "@/lib/types";
import { generateUUID, shuffleArray, toUpperFirst } from "@/lib/utils";
import { Smoke4 } from "@/components/Smokes";
import GoBackButton from "@/components/GoBackButton";
import { getDialogueByLabel } from "@/lib/actions";
import clsx from "clsx";
import Typewriter from "@/components/dialogues/Typewriter";
import TopicTag from "@/components/dialogues/TopicTag";

type Props = {
  params: {
    slug: string,
    topic: Topic
  }
}

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  // read route params
  const { slug, topic } = params;

  // parse title
  const encodedURISlug = toUpperFirst(slug, "first");
  const parsedSlug = decodeURIComponent(encodedURISlug);

  const encodedURITopic = toUpperFirst(topic, "first");
  const parsedTopic = decodeURIComponent(encodedURITopic);

  return {
    title: `${parsedSlug} 🔮 • ${parsedTopic} • Guess English`,
  }
}

export default async function DialogueSlug({
  params
}: Props
) {

  const label = toUpperFirst(params.slug)
  const dialogue = await getDialogueByLabel(label)

  return (
    <>
      <Smoke4 />
      <main className="container grid max-h-screen min-h-screen px-6 mx-auto grid-rows-10">
        <header className="flex flex-col items-center justify-center row-span-2 my-2 gap-y-8">
          <div className="grid w-full grid-cols-3">
            <GoBackButton backTo="home" label="Go back" />
          </div>
          <div className="flex flex-col items-center md:flex-row gap-x-5">
            <h1 className="w-full text-4xl font-bold text-center">{label}</h1>
            <TopicTag topic={dialogue.topic} />
          </div>
        </header>
        <section className="relative row-span-6">
          <article className="flex flex-col p-10 overflow-y-auto border rounded-lg min-h-96 max-h-96 border-neutral-800 gap-y-4">
            <Typewriter text={dialogue.text} />
          </article>
          <article className="grid grid-cols-1 gap-5 mt-10 md:grid-cols-2">

            {
              shuffleArray(dialogue.options).map((option) => {

                return (

                  <div
                    className="px-6 py-3 text-xl transition-colors border rounded-lg shadow select-none hover:bg-white/5 border-neutral-800"
                    key={generateUUID()}
                  >
                    {option}
                  </div>

                )

              })
            }

          </article>
        </section>
      </main>
    </>
  )
}
