"use client";

import type{ Topic } from "@/lib/enums";
import type { Slug } from "@/lib/types";
import LinkSfx from "../LinkSfx";
import { useDialogueStore } from "@/stores/dialogues-store";
import clsx from "clsx";

interface Props {
  topic: Topic;
  slug: Slug;
  title: string;
}

export default function DialogueTopicLink({ slug, title, topic }: Props) {

  const records = useDialogueStore(state => state.records)
  const completed = records.has(slug)

  return (
    <LinkSfx
      href={`/dialogues/${topic}/${slug}`}
      className={clsx(
        "relative hover:before:opacity-100 before:transition-opacity before:opacity-0 before:rounded-[inherit] bg-transparent before:w-full before:h-full before:top-0 before:left-0 before:content-[''] before:absolute flex justify-between w-full px-6 py-3 transition-all border rounded-lg shadow group/link border-neutral-800",
        { "before:[background-image:_linear-gradient(90deg,_#00000000,_#22c55e35)]": completed },
        { "before:[background-image:_linear-gradient(90deg,_#00000000,_#ef444435)]": !completed },
      )}
    >

      <p className="transition-transform group-hover/link:translate-x-5">{title}</p>
      <span className={clsx(
        "group-hover/link:-translate-x-5 font-medium opacity-0 transition-all group-hover/link:opacity-100",
        { "text-green-500": completed },
        { "text-red-500": !completed },
      )}>
        {completed ? "completed" : "incompleted"}
      </span>
    </LinkSfx>
  )
}
