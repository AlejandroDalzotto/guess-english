"use client";

import { useSentenceStore } from "@/stores/sentences-store";
import { useEffect } from "react"

interface Props {
  children: React.ReactNode
}

export default function BuildTheSentenceProvider({ children }: Props) {

  useEffect(() => {
    useSentenceStore.persist.rehydrate();
  }, [])

  // Store's actions
  const init = useSentenceStore(state => state.init)

  useEffect(() => {
    init()
  }, [init])


  return (children);
}
