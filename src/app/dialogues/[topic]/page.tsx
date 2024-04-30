import GoBackButton from "@/components/GoBackButton"
import { Smoke4 } from "@/components/Smokes"
import Title from "@/components/Title"
import DialogueTopicLink from "@/components/dialogues/DialogueTopicLink"
import { getDialoguesByTopic } from "@/lib/actions"
import { Topic } from "@/lib/enums"
import { generateUUID, toUpperFirst } from "@/lib/utils"
import type { Metadata } from "next"

type Props = {
  params: {
    topic: Topic
  }
}

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  // read route params
  const topic = params.topic;

  // parse title
  const encodedURITitle = toUpperFirst(topic, "first");
  const parsedTitle = decodeURIComponent(encodedURITitle);

  return {
    title: `Dialogues 🔮 • ${parsedTitle} • Guess English`,
  }
}

export default async function DialogueByTopicPage({
  params
}: Props) {
  const parsedTopic = decodeURIComponent(params.topic)
  const dialogues = await getDialoguesByTopic(parsedTopic)

  return (
    <>
      <Smoke4 />
      <main className="container grid max-h-screen min-h-screen px-6 mx-auto grid-rows-10">
        <header className="flex flex-col items-center justify-center row-span-2 my-2 gap-y-8">
          <div className="grid w-full grid-cols-3">
            <GoBackButton backTo="home" label="Go back" />
          </div>
          <Title>
            Welcome to {parsedTopic}
          </Title>
        </header>
        <section className="relative row-span-6">
          <p className="mb-10 text-center">There&apos;s the dialogues availables about {parsedTopic}</p>
          <article className="flex flex-col h-full gap-y-5">
            {
              dialogues.map((item) => {

                return (

                  <DialogueTopicLink
                    key={generateUUID()}
                    slug={item.slug}
                    title={item.title}
                    topic={params.topic}
                  />

                )

              })
            }
          </article>
        </section>
      </main>
    </>
  )
}
