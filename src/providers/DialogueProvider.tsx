"use client";

import { useDialogueStore } from "@/stores/dialogues-store";
import { useEffect } from "react";

type Props = Readonly<{
  children: React.ReactNode;
}>

export default function DialogueProvider({ children }: Props) {

  useEffect(() => {
    useDialogueStore.persist.rehydrate();
  }, [])

  return (children)
}
