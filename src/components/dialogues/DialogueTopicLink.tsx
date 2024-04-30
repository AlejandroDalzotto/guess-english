"use client";

import LinkSfx from "../LinkSfx";
import type { Topic, Slug } from "@/lib/types";
import { useDialogueStore } from "@/stores/dialogues-store";
import clsx from "clsx";

interface Props {
  topic: Topic;
  slug: Slug;
  title: string;
}

export default function DialogueTopicLink({ slug, title, topic }: Props) {

  const records = useDialogueStore(state => state.records)
  const completed = records.some(record => record === slug)

  return (
    <LinkSfx
      href={`/dialogues/${topic}/${slug}`}
      className="flex justify-between w-full px-6 py-3 transition-all border rounded-lg shadow group/link hover:bg-white/5 border-neutral-800"
    >

      <p className="transition-transform group-hover/link:translate-x-5">{title}</p>
      <span className={clsx(
        "group-hover/link:-translate-x-5 opacity-0 transition-all group-hover/link:opacity-100"
      )}>
        {completed ? "completed" : "incompleted"}
      </span>
    </LinkSfx>
  )
}
