import { getDialogueByLabel } from '@/lib/actions';
import type { ChatText, DialogueSection, Slug } from '@/lib/types';
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware';
/**
 * @namespace
 * @ trstr as records
 */
type State = {
  records: Slug[];
  chat: ChatText[];
  section: DialogueSection | null;
  currentCorrect: string | null;
  currentDialogueIndex: number;
  gameState: "playing" | "idle";
}

type Actions = Readonly<{
  init: (label: string) => Promise<void>;
  onVictory: () => void;
  onCorrect: () => void;
}>

const initialState: State = {
  records: [],
  section: null,
  chat: [],
  currentCorrect: null,
  currentDialogueIndex: 0,
  gameState: "playing",
}

export const useDialogueStore = create<State & Actions>()(
  persist(
    (set, get) => ({
      ...initialState,
      init: async (label: string) => {
        const section = await getDialogueByLabel(label)

        const initialText: ChatText = {
          text: section.dialogues[0].text,
          sender: section.dialogues[0].sender
        }

        set(() => ({
          section,
          chat: [initialText],
          currentCorrect: section.dialogues[0].correct
        }))
      },
      onVictory: () => {

        if (get().gameState === "playing") {
          const corrent = get().section!.dialogues[get().currentDialogueIndex].correct
          const userDialogue: ChatText = { text: corrent, sender: "me" }
          const finalSentence: ChatText = { text: get().section!.final.text, sender: get().section!.final.sender }

          set((state) => ({
            records: [...state.records, state.section!.label],
            chat: [...state.chat, userDialogue, finalSentence],
            gameState: "idle"
          }))
        }

      },
      onCorrect: () => {

        set((state) => ({
          currentDialogueIndex: state.currentDialogueIndex + 1,
        }))

        const nextDialogue = get().section!.dialogues[get().currentDialogueIndex]
        const corrent = get().section!.dialogues[get().currentDialogueIndex - 1].correct
        const userDialogue: ChatText = { text: corrent, sender: "me" }

        set((state) => ({
          currentDialogueIndex: state.currentDialogueIndex,
          chat: [...state.chat, userDialogue, nextDialogue],
          currentCorrect: nextDialogue.correct
        }))

      }
    }),
    {
      name: "dialogue-store",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
)