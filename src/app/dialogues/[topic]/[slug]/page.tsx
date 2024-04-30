import type { Metadata } from "next";
import type { Topic } from "@/lib/enums";
import { toUpperFirst } from "@/lib/utils";
import { Smoke4 } from "@/components/Smokes";
import DialogueGameMode from "@/components/dialogues/DialogueGameMode";

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

export default function DialogueSlug({
  params
}: Props
) {

  const label = toUpperFirst(params.slug)

  return (
    <>
      <Smoke4 />
      <main className="container grid max-h-screen min-h-screen px-6 mx-auto grid-rows-10">
        <DialogueGameMode label={label} />
      </main>
    </>
  )
}
