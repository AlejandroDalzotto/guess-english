import { verbs } from '@/lib/data';
import type { Verb } from '@/lib/types';
import { calculatePoints, generateOptions, getRandomVerb } from '@/lib/utils';
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware';

type State = {
  points: number;
  streak: number;
  verbsHistory: Verb[];
  options: string[];
  verb: Verb | null;
  _hasHydrated: boolean;
}

type Actions = {
  onVictory: () => void;
  onDefeat: () => void;
  reset: () => void;
  setHasHydrated: (state: boolean) => void;
}

// initial values
const verb = getRandomVerb([])
const options = generateOptions(verb.translations.at(0))

const initialState: Omit<State, "_hasHydrated"> = {
  points: 0,
  streak: 0,
  verbsHistory: [],
  options,
  verb,
}

export const useGuessStore = create<State & Actions>()(
  persist(
    (set, get) => ({
      ...initialState,
      _hasHydrated: false,
      setHasHydrated: (state: boolean) => {
        set({
          _hasHydrated: state
        });
      },
      onVictory: () => {

        const guessedVerb = get().verb!
        set((state) => ({
          streak: state.streak + 1,
          points: state.points + 5,
          verbsHistory: [...state.verbsHistory, guessedVerb],
        }))

        const hasNoVerbsLeft = verbs.every(value => get().verbsHistory.includes(value))

        if (hasNoVerbsLeft) {
          set(() => ({
            verb: null,
          }))

          return
        }

        const newVerb = getRandomVerb(get().verbsHistory)
        const newOptions = generateOptions(newVerb.translations.at(0))

        set(() => ({
          options: newOptions,
          verb: newVerb,
        }))

      },
      onDefeat: () => set((state) => ({
        streak: get().streak <= 1 ? 0 : get().streak - 1,
        points: state.points - 5,
      })),
      reset: () => set(() => ({ ...initialState })),
    }),
    {
      name: "game-store",
      storage: createJSONStorage(() => sessionStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true)
      },
    }
  )
)