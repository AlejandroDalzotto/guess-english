import { getSentence } from '@/lib/actions';
import { Sentence } from '@/lib/types';
import { create } from 'zustand'
import { type PersistStorage, StorageValue, persist } from 'zustand/middleware';

type State = {
  sentence: Sentence | null;
  currentIndex: number;
  current: string[];
}

type Actions = Readonly<{
  init: () => Promise<void>;
  onCorrect: () => Promise<void>;
  onWordSelect: (word: string) => void;
  onWordDeselect: (word: string) => void;
  check: () => boolean;
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
  sentence: null,
  current: []
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
            sentence: sentence,
          }))

        }

      },
      onCorrect: async () => {

        const sentence = await getSentence(get().currentIndex + 1)

        if (sentence) {

          set((prev) => ({
            currentIndex: prev.currentIndex + 1,
            sentence: sentence,
          }))

          return;
        }

        set(() => ({
          sentence: null,
        }))

      },
      onWordSelect: (word: string) => {

        set((prev) => ({
          current: [...prev.current, word]
        }))

      },
      onWordDeselect: (word: string) => {

        set((prev) => ({
          current: prev.current.filter(value => value !== word)
        }))

      },
      check: () => {

        const sentence = get().sentence

        if (sentence) {

          const { order: correctOrder } = sentence
          const current = get().current

          return current.toString() === correctOrder.toString();
        }

        return false;
      }
    }),
    {
      name: "sentences-store",
      storage,
    }
  )
)