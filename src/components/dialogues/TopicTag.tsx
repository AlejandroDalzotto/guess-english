import type { Topic } from '@/lib/types'
import clsx from 'clsx'

export default function TopicTag({
  topic
}: {
  topic: Topic
}) {
  return (
    <span className={clsx(
      "text-base rounded-full whitespace-nowrap py-1 px-3 lowercase border",
      { "bg-blue-500/10 text-blue-500 border-blue-600": topic === "travel" },
      { "bg-rose-500/10 text-rose-500 border-rose-600": topic === "restaurant" },
      { "bg-pink-500/10 text-pink-500 border-pink-600": topic === "weather" },
      { "bg-teal-500/10 text-teal-500 border-teal-600": topic === "food" },
      { "bg-neutral-500/10 text-neutral-500 border-neutral-600": topic === "work" },
      { "bg-amber-500/10 text-amber-500 border-amber-600": topic === "workplace" },
      { "bg-indigo-500/10 text-indigo-500 border-indigo-600": topic === "job interview" },
    )}>
      {topic}
    </span>
  )
}
