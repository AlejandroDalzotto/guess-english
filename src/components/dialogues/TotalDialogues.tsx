import { getTotalDialoguesByTopic } from "@/lib/actions";
import type { Topic } from "@/lib/types";

export default async function TotalDialogues({ topic }: { topic: Topic }) {

  const total = await getTotalDialoguesByTopic(topic)

  return (
    <p className="text-lg italic font-medium text-neutral-600">{total} dialogue(s) available(s)</p>
  )
}
