import { getDialogueByLabel } from '@/lib/actions';
import { Line, Slug, Story } from '@/lib/types';
import { create } from 'zustand'
import { type PersistStorage, StorageValue, persist } from 'zustand/middleware';

type State = {
  records: Set<Slug>;
  stories: Map<Slug, Story>;
  currentPlaying: string;
}

type Actions = Readonly<{
  init: (slug: Slug) => Promise<void>;
  onVictory: () => void;
  onCorrect: () => void;
  setCurrentPlaying: (slug: Slug) => void;
}>

const storage: PersistStorage<State> = {
  getItem: (name: string) => {
    const str = localStorage.getItem(name);
    if (!str) return null;
    const { state }: { state: State } = JSON.parse(str);
    return {
      state: {
        ...state,
        stories: new Map(state.stories),
        records: new Set(state.records)
      },
    }
  },
  setItem: (name: any, newValue: StorageValue<State>) => {
    // functions cannot be JSON encoded
    const str = JSON.stringify({
      state: {
        ...newValue.state,
        stories: Array.from(newValue.state.stories.entries()),
        records: Array.from(newValue.state.records.values())
      },
    })
    localStorage.setItem(name, str)
  },
  removeItem: (name: string) => localStorage.removeItem(name),
}

const initialState: State = {
  records: new Set(),
  stories: new Map(),
  currentPlaying: "",
}

export const useDialogueStore = create<State & Actions>()(
  persist(
    (set, get) => ({
      ...initialState,
      init: async (slug: string) => {
        const dialogueFromJson = await getDialogueByLabel(slug)

        // Validate if the dialogue isn't already in the store. 
        const initialSentence: Line = {
          text: dialogueFromJson.dialogues[0].text,
          sender: dialogueFromJson.dialogues[0].sender
        }

        set((prev) => ({
          stories: new Map(prev.stories).set(dialogueFromJson.slug, {
            dialogue: dialogueFromJson,
            chat: [initialSentence],
            currentCorrect: dialogueFromJson.dialogues[0].correct,
            completed: false,
            currentDialogueIndex: 0
          })
        }))
      },
      onVictory: () => {

        const currentSectionPlaying = get().stories.get(get().currentPlaying)

        if (currentSectionPlaying) {
          const corrent = currentSectionPlaying.dialogue.dialogues[currentSectionPlaying.currentDialogueIndex].correct
          const userDialogue: Line = { text: corrent, sender: "me" }
          const finalSentence: Line = { text: currentSectionPlaying.dialogue.final.text, sender: currentSectionPlaying.dialogue.final.sender }

          set((prev) => ({
            stories: new Map(prev.stories).set(currentSectionPlaying.dialogue.slug, {
              ...currentSectionPlaying,
              chat: [...currentSectionPlaying.chat, userDialogue, finalSentence],
              completed: true,
            }),
            records: new Set(prev.records).add(currentSectionPlaying.dialogue.slug)
          }))
        }

      },
      onCorrect: () => {

        const currentSectionPlaying = get().stories.get(get().currentPlaying)

        if (currentSectionPlaying) {

          const nextDialogue = currentSectionPlaying.dialogue.dialogues[currentSectionPlaying.currentDialogueIndex + 1]
          const correct = currentSectionPlaying.dialogue.dialogues[currentSectionPlaying.currentDialogueIndex].correct
          const userDialogue: Line = { text: correct, sender: "me" }

          set((prev) => ({
            stories: new Map(prev.stories).set(currentSectionPlaying.dialogue.slug, {
              ...currentSectionPlaying,
              chat: [...currentSectionPlaying.chat, userDialogue, {
                text: nextDialogue.text,
                sender: nextDialogue.sender
              }],
              currentCorrect: nextDialogue.correct,
              currentDialogueIndex: currentSectionPlaying.currentDialogueIndex + 1
            })
          }))
        }

      },
      setCurrentPlaying: (slug) => {

        set(() => ({ currentPlaying: slug }))

      },
    }),
    {
      name: "dialogue-store",
      storage,
    }
  )
)