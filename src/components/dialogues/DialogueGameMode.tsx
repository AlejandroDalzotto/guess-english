"use client";

import { shuffleArray } from "@/lib/utils";
import GoBackButton from "../GoBackButton";
import TopicTag from "./TopicTag";
import { useDialogueStore } from "@/stores/dialogues-store";
import DialogueOption from "./DialogueOption";
import DialogueChat from "./DialogueChat";

export default function DialogueGameMode({ label }: { label: string }) {

  const stories = useDialogueStore(state => state.stories)
  const currentPlaying = useDialogueStore(state => state.currentPlaying)

  if (!stories || !stories.size) {
    return <span>store no initialized correctly...</span>
  }

  const story = stories.get(currentPlaying)

  if (!story) {
    return <p>story not found (DialogueGameMode)</p>
  }

  return (
    <>
      <header className="flex flex-col items-center justify-center row-span-2 my-2 gap-y-8">
        <div className="grid w-full grid-cols-3">
          <GoBackButton backTo="home" label="Go back" />
        </div>
        <div className="flex flex-col items-center md:flex-row gap-x-5">
          {story.completed ? (
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
          <TopicTag topic={story.dialogue.topic} />
        </div>
      </header>
      <section className="relative row-span-6">

        <p className="mb-10 text-center text-balance italic">
          &ldquo;
          {story.dialogue.description}
          &rdquo;
        </p>

        <DialogueChat />

        <article className="grid grid-cols-1 gap-5 mt-10 md:grid-cols-2">
          {
            shuffleArray(story.dialogue.dialogues[story.currentDialogueIndex].options).map((option) => {
              return (
                <DialogueOption key={option + "option"} option={option} />
              )
            })
          }
        </article>
      </section>
    </>
  )
}
