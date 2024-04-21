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
        <header className="flex flex-col items-center justify-center row-span-2 gap-y-8">
          <div className="grid w-full grid-cols-3">
            <GoBackButton backTo="home" label="Back to home" />
          </div>
          <Title>
            Welcome to {params.topic}
          </Title>
          <p>There&apos;s the dialogues availables about {params.topic}</p>
        </header>
        <section className="relative row-span-6">
          {
            dialogues.map((item) => {

              return (

                <article key={generateUUID()}>

                  {item.topic}

                </article>

              )

            })
          }
        </section>
      </main>
    </>
  )
}
