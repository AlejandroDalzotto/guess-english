import { getSentence } from '@/lib/actions';
import { Sentence } from '@/lib/types';
import { create } from 'zustand'
import { type PersistStorage, StorageValue, persist } from 'zustand/middleware';

type State = {
  currentSentence: Sentence | null;
  currentIndex: number;
}

type Actions = Readonly<{
  onCorrect: () => Promise<void>;
  init: () => Promise<void>;
}>

const storage: PersistStorage<State> = {
  getItem: (name: string) => {
    const str = localStorage.getItem(name);
    if (!str) return null;
    const { state }: { state: State } = JSON.parse(str);
    return {
      state: {
        ...state,
        // stories: new Map(state.stories),
      },
    }
  },
  setItem: (name: any, newValue: StorageValue<State>) => {
    // functions cannot be JSON encoded
    const str = JSON.stringify({
      state: {
        ...newValue.state,
        // stories: Array.from(newValue.state.stories.entries()),
      },
    })
    localStorage.setItem(name, str)
  },
  removeItem: (name: string) => localStorage.removeItem(name),
}

const initialState: State = {
  currentIndex: 0,
  currentSentence: null
}

export const useSentenceStore = create<State & Actions>()(
  persist(
    (set, get) => ({
      ...initialState,
      init: async () => {

        const sentence = await getSentence()

        if (sentence) {

          set(() => ({
            currentIndex: 0,
            currentSentence: sentence,
          }))

        }

      },
      onCorrect: async () => {

        const sentence = await getSentence(get().currentIndex + 1)

        if (sentence) {

          set((prev) => ({
            currentIndex: prev.currentIndex + 1,
            currentSentence: sentence,
          }))

          return;
        }

        set(() => ({
          currentSentence: null,
        }))

      },
    }),
    {
      name: "sentences-store",
      storage,
    }
  )
)