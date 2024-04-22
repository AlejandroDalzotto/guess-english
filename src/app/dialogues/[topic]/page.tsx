import GoBackButton from "@/components/GoBackButton"
import { Smoke4 } from "@/components/Smokes"
import Title from "@/components/Title"
import { getDialoguesByTopic } from "@/lib/actions"
import { Topic } from "@/lib/types"
import { generateUUID } from "@/lib/utils"

export default async function DialogueByTopicPage({
  params
}: {
  params: {
    topic: Topic
  }
}) {

  const dialogues = await getDialoguesByTopic(params.topic)

  return (
    <>
      <Smoke4 />
      <main className="container grid max-h-screen min-h-screen px-6 mx-auto grid-rows-10">
        <header className="flex flex-col items-center justify-center row-span-2 my-2 gap-y-8">
          <div className="grid w-full grid-cols-3">
            <GoBackButton backTo="home" label="Back to home" />
          </div>
          <Title>
            Welcome to {params.topic}
          </Title>
        </header>
        <section className="relative row-span-6">
          <p className="mb-10 text-center">There&apos;s the dialogues availables about {params.topic}</p>
          <article className="flex flex-col h-full gap-y-5">
            {
              dialogues.map((item) => {

                return (

                  <p className="w-full px-6 py-3 transition-all border rounded-lg shadow hover:scale-105 hover:bg-white/5 border-neutral-800" key={generateUUID()}>

                    {item.label}

                  </p>

                )

              })
            }
          </article>
        </section>
      </main>
    </>
  )
}
