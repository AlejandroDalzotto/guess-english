"use client";

import type { Topic } from "@/lib/enums";
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
  const setCurrentPlaying = useDialogueStore(state => state.setCurrentPlaying)

  // Store's attributes
  const stories = useDialogueStore(state => state.stories)

  useEffect(() => {

    const initStore = async () => {

      console.log({ stories, hydratated: useDialogueStore.persist.hasHydrated() })

      if (!stories.has(params.slug)) {
        await init(params.slug)
      }

      if (stories.has(params.slug)) {
        console.log("Story already initialized")
      }

      setCurrentPlaying(params.slug)

    }

    initStore()
  }, [init, params.slug, stories, setCurrentPlaying])

  return children;
}
