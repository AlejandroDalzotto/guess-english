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
}

export const useDialogueStore = create<State & Actions>()(
  persist(
    (set, get) => ({
      ...initialState,
      init: async (label: string) => {
        const section = await getDialogueByLabel(label)

        const initialText: ChatText = {
          text: section.dialogues[0].correct,
          sender: section.dialogues[0].sender
        }

        set(() => ({
          section,
          chat: [initialText],
          currentCorrect: section.dialogues[0].correct
        }))
      },
      onVictory: () => {

        set((state) => ({
          records: [...state.records, state.section!.label]
        }))

      },
      onCorrect: () => {

        set((state) => ({
          currentDialogueIndex: state.currentDialogueIndex + 1,
        }))

        const nextDialogue = get().section!.dialogues[get().currentDialogueIndex]
        const corrent = get().section!.dialogues[get().currentDialogueIndex - 1].correct
        const userDialogue: ChatText = { text: corrent, sender: "me" }

        set((state) => ({
          currentDialogueIndex: state.currentDialogueIndex + 1,
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