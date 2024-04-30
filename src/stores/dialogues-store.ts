import { getDialogueByLabel } from '@/lib/actions';
import type { Line, Slug, Story } from '@/lib/types';
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware';

type State = {
  records: Slug[];
  stories: Story[];
  currentPlaying: string | null;
}

type Actions = Readonly<{
  init: (title: string) => Promise<void>;
  onVictory: () => void;
  onCorrect: () => void;
}>

const initialState: State = {
  records: [],
  stories: [],
  currentPlaying: null,
}

export const useDialogueStore = create<State & Actions>()(
  persist(
    (set, get) => ({
      ...initialState,
      init: async (title: string) => {
        const dialogueFromJson = await getDialogueByLabel(title)

        const isAlreadyInitialized = get().stories.some(value => value.dialogue.title === dialogueFromJson.title)

        // Validate if the dialogue isn't already in the store. 
        if (!isAlreadyInitialized) {
          const initialSentence: Line = {
            text: dialogueFromJson.dialogues[0].text,
            sender: dialogueFromJson.dialogues[0].sender
          }

          set((state) => ({
            stories: [
              ...state.stories,
              {
                dialogue: dialogueFromJson,
                chat: [initialSentence],
                currentCorrect: dialogueFromJson.dialogues[0].correct,
                completed: false,
                currentDialogueIndex: 0
              }
            ]
          }))
        }

        set(() => ({
          currentPlaying: dialogueFromJson.title
        }))
      },
      onVictory: () => {

        const currentSectionPlaying = get().stories.find(value => value.dialogue.title === get().currentPlaying)

        if (currentSectionPlaying) {
          const corrent = currentSectionPlaying.dialogue.dialogues[currentSectionPlaying.currentDialogueIndex].correct
          const userDialogue: Line = { text: corrent, sender: "me" }
          const finalSentence: Line = { text: currentSectionPlaying.dialogue.final.text, sender: currentSectionPlaying.dialogue.final.sender }

          set((state) => ({
            stories: [
              ...state.stories,
              {
                ...currentSectionPlaying,
                records: [...state.records, currentSectionPlaying.dialogue.title],
                chat: [...currentSectionPlaying.chat, userDialogue, finalSentence],
                completed: true,
              }
            ]
          }))
        }

      },
      onCorrect: () => {

        const currentSectionPlaying = get().stories.find(value => value.dialogue.title === get().currentPlaying)

        if (currentSectionPlaying) {

          const nextDialogue = currentSectionPlaying.dialogue.dialogues[currentSectionPlaying.currentDialogueIndex]
          const correct = currentSectionPlaying.dialogue.dialogues[currentSectionPlaying.currentDialogueIndex].correct
          const userDialogue: Line = { text: correct, sender: "me" }

          set((state) => ({
            stories: [
              ...state.stories,
              {
                ...currentSectionPlaying,
                chat: [...currentSectionPlaying.chat, userDialogue, nextDialogue],
                currentCorrect: nextDialogue.correct,
                currentDialogueIndex: currentSectionPlaying.currentDialogueIndex + 1
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