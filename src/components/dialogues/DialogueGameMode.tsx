"use client";

import { generateUUID, shuffleArray } from "@/lib/utils";
import GoBackButton from "../GoBackButton";
import TopicTag from "./TopicTag";
import { useDialogueStore } from "@/stores/dialogues-store";
import DialogueOption from "./DialogueOption";
import DialogueChat from "./DialogueChat";

export default function DialogueGameMode({ label }: { label: string }) {

  const section = useDialogueStore(state => state.section)
  const currentDialogueIndex = useDialogueStore(state => state.currentDialogueIndex)
  const gameState = useDialogueStore(state => state.gameState)
  const records = useDialogueStore(state => state.records)

  if (!section) {
    return <span>store no initialized...</span>
  }

  const dialogues = section.dialogues
  const isCompleted = records.some(value => value.toLowerCase() === label.toLowerCase())

  return (
    <>
      <header className="flex flex-col items-center justify-center row-span-2 my-2 gap-y-8">
        <div className="grid w-full grid-cols-3">
          <GoBackButton backTo="home" label="Go back" />
        </div>
        <div className="flex flex-col items-center md:flex-row gap-x-5">
          {isCompleted ? (
            <span
              className="bg-green-500/10 text-green-500 border-green-500 text-base rounded-full whitespace-nowrap py-1 px-3 lowercase border"
            >
              completed
            </span>
          ) : (
            <span
              className="bg-neutral-500/10 text-neutral-500 border-neutral-500 text-base rounded-full whitespace-nowrap py-1 px-3 lowercase border"
            >
              incompleted
            </span>
          )}
          <h1 className="w-full text-4xl font-bold text-center">{label}</h1>
          <TopicTag topic={section.topic} />
        </div>
      </header>
      <section className="relative row-span-6">

        <p className="mb-10 text-center text-balance italic">
          &ldquo;
          {section.description}
          &rdquo;
        </p>

        <DialogueChat />

        <article className="grid grid-cols-1 gap-5 mt-10 md:grid-cols-2">
          {
            gameState === "playing" ? (

              shuffleArray(dialogues[currentDialogueIndex].options).map((option) => {
                return (
                  <DialogueOption key={generateUUID()} option={option} />
                )
              })

            ) : null
          }
        </article>
      </section>
    </>
  )
}
