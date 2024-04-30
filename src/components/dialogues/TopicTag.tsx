import { Topic } from '@/lib/enums'
import clsx from 'clsx'

export default function TopicTag({
  topic
}: {
  topic: Topic
}) {
  return (
    <span className={clsx(
      "text-base rounded-full whitespace-nowrap py-1 px-3 lowercase border",
      { "bg-teal-500/10 text-teal-500 border-teal-500": topic === Topic.TRAVEL }
    )}>
      {topic}
    </span>
  )
}
