import { getDialogueByLabel } from '@/lib/actions';
import type { Line, DialogueSection, Slug } from '@/lib/types';
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware';

type State = {
  records: Slug[];
  sections: {
    chat: Line[];
    section: DialogueSection;
    currentCorrect: string;
    currentDialogueIndex: number;
    completed: boolean;
  }[];
  currentPlaying: string | null;
}

type Actions = Readonly<{
  init: (label: string) => Promise<void>;
  onVictory: () => void;
  onCorrect: () => void;
}>

const initialState: State = {
  records: [],
  sections: [],
  currentPlaying: null,
}

export const useDialogueStore = create<State & Actions>()(
  persist(
    (set, get) => ({
      ...initialState,
      init: async (label: string) => {
        const section = await getDialogueByLabel(label)

        const isAlreadyInitialized = get().sections.some(value => value.section.title === section.title)

        // Validate if the dialogue isn't already in the store. 
        if (!isAlreadyInitialized) {
          const initialText: Line = {
            text: section.dialogues[0].text,
            sender: section.dialogues[0].sender
          }

          set((state) => ({
            sections: [...state.sections, {
              section,
              chat: [initialText],
              currentCorrect: section.dialogues[0].correct,
              currentDialogueIndex: 0,
              completed: false
            }]
          }))
        }

        set(() => ({
          currentPlaying: section.title
        }))
      },
      onVictory: () => {

        const currentSectionPlaying = get().sections.find(value => value.section.title === get().currentPlaying)

        if (currentSectionPlaying) {
          const corrent = currentSectionPlaying.section.dialogues[currentSectionPlaying.currentDialogueIndex].correct
          const userDialogue: Line = { text: corrent, sender: "me" }
          const finalSentence: Line = { text: currentSectionPlaying.section.final.text, sender: currentSectionPlaying.section.final.sender }

          set((state) => ({
            sections: [
              ...state.sections,
              {
                ...currentSectionPlaying,
                records: [...state.records, currentSectionPlaying.section.title],
                chat: [...currentSectionPlaying.chat, userDialogue, finalSentence],
                completed: true,
              }
            ]
          }))
        }

      },
      onCorrect: () => {

        const currentSectionPlaying = get().sections.find(value => value.section.title === get().currentPlaying)

        if (currentSectionPlaying) {
          set((state) => ({
            sections: [
              ...state.sections,
              {
                ...currentSectionPlaying,
                currentDialogueIndex: currentSectionPlaying.currentDialogueIndex + 1
              }
            ]
          }))

          const nextDialogue = currentSectionPlaying.section.dialogues[currentSectionPlaying.currentDialogueIndex]
          const corrent = currentSectionPlaying.section.dialogues[currentSectionPlaying.currentDialogueIndex - 1].correct
          const userDialogue: Line = { text: corrent, sender: "me" }

          set((state) => ({
            sections: [
              ...state.sections,
              {
                ...currentSectionPlaying,
                chat: [...currentSectionPlaying.chat, userDialogue, nextDialogue],
                currentCorrect: nextDialogue.correct
              }
            ]
          }))
        }

      }
    }),
    {
      name: "dialogue-store",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
)