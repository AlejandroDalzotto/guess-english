"use client";

import { useDialogueStore } from "@/stores/dialogues-store";
import Text from "./Text";
import { generateUUID } from "@/lib/utils";

export default function DialogueChat() {

  const currentDialogue = useDialogueStore(state => state.chat)

  return (
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
  )
}
