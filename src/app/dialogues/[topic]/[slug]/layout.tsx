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

  useEffect(() => {
    useDialogueStore.persist.rehydrate();
  }, [])

  // Store's actions.
  const init = useDialogueStore(state => state.init)

  useEffect(() => {

    const label = toUpperFirst(params.slug)

    init(label)
  }, [init, params.slug])

  return children;
}
