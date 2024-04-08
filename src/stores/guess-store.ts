import { verbs } from '@/lib/data';
import type { Verb } from '@/lib/types';
import { generateOptions, getRandomVerb } from '@/lib/utils';
import { create } from 'zustand'
import { persist } from 'zustand/middleware';

type State = {
  points: number;
  streak: number;
  verbsHistory: Verb[];
  options: string[];
  verb: Verb;
  _hasHydrated: boolean;
}

type Actions = {
  onVictory: () => void;
  onDefeat: () => void;
  reset: () => void;
  setHasHydrated: (state: boolean) => void;
}

const verb = getRandomVerb()
const options = generateOptions(verb.translations.at(0))

const initialState: State = {
  points: 0,
  streak: 0,
  verbsHistory: [],
  options,
  verb,
  _hasHydrated: false,
}

export const useGuessStore = create<State & Actions>()(
  persist(
    (set, get) => ({
      ...initialState,
      setHasHydrated: (state: boolean) => {
        set({
          _hasHydrated: state
        });
      },
      onVictory: () => {
        const newVerb = verbs.find(v => !get().verbsHistory.includes(v))

        if (!newVerb) throw new Error("There's no more verbs to guess")

        const options = generateOptions(newVerb.translations.at(0))

        set((state) => ({
          streak: state.streak + 1,
          options,
          verb: newVerb,
          points: state.points * (state.streak / 0.1)
        }))

      },
      onDefeat: () => set(() => ({})),
      reset: () => set(initialState),
    }),
    {
      name: "game-store",
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true)
      },
    }
  )
)