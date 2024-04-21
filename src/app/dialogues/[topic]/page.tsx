import { Topic } from "@/lib/types"

export default function DialogueByTopicPage({
  params
}: {
  params: {
    topic: Topic
  }
}) {
  return (
    <div>Welcome to {params.topic}</div>
  )
}
