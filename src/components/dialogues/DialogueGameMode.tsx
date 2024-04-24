"use client";

import { generateUUID, shuffleArray } from "@/lib/utils";
import GoBackButton from "../GoBackButton";
import TopicTag from "./TopicTag";
import Text from "./Text";
import { useDialogueStore } from "@/stores/dialogues-store";
import DialogueOption from "./DialogueOption";

export default function DialogueGameMode({ label }: { label: string }) {

  const section = useDialogueStore(state => state.section)
  const currentDialogue = useDialogueStore(state => state.chat)
  const currentDialogueIndex = useDialogueStore(state => state.currentDialogueIndex)

  if (!section) {
    return <span>store no initialized...</span>
  }

  const dialogues = section.dialogues

  return (
    <>
      <header className="flex flex-col items-center justify-center row-span-2 my-2 gap-y-8">
        <div className="grid w-full grid-cols-3">
          <GoBackButton backTo="home" label="Go back" />
        </div>
        <div className="flex flex-col items-center md:flex-row gap-x-5">
          <h1 className="w-full text-4xl font-bold text-center">{label}</h1>
          <TopicTag topic={section.topic} />
        </div>
      </header>
      <section className="relative row-span-6">
        <article className="flex flex-col p-10 overflow-y-auto border rounded-lg min-h-96 max-h-96 border-neutral-800 gap-y-4">
          {
            currentDialogue.map((value) => {

              if (value.sender !== "me") {
                return (
                  <Text align="left" key={generateUUID()} text={value.text} sender={value.sender} />
                )
              }

              return (
                <Text align="right" key={generateUUID()} text={value.text} sender={value.sender} />
              )

            })
          }
        </article>
        <article className="grid grid-cols-1 gap-5 mt-10 md:grid-cols-2">
          {
            shuffleArray(dialogues[currentDialogueIndex].options).map((option) => {
              return (
                <DialogueOption key={generateUUID()} option={option} />
              )
            })
          }
        </article>
      </section>
    </>
  )
}
