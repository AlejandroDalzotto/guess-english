"use client";

import type { Topic } from "@/lib/types";
import { toUpperFirst } from "@/lib/utils";
import { useDialogueStore } from "@/stores/dialogues-store";
import { useEffect } from "react";

export default function DialogueLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: {
    slug: string,
    topic: Topic
  }
}>) {

  // Store's actions.
  const init = useDialogueStore(state => state.init)
  const records = useDialogueStore(state => state.records)
  const sections = useDialogueStore(state => state.sections)

  useEffect(() => {

    const label = toUpperFirst(params.slug)
    if (!records.includes(label) || !sections.some(value => value.section.title === label)) {
      init(label)
    }
  }, [init, params.slug, records, sections])

  return children;
}
