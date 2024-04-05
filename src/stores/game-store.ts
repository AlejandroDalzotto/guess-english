import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware';

interface GameStoreState {
  points: number;
  streak: number;
  state: "victory" | "defeat" | "playing" | null;
  mode: "guess-the-verb" | "complete-the-phrase" | null;
  resetStreak: () => void;
  increaseStreak: () => void;
  setPoints: () => void;
}

export const useGameStore = create<GameStoreState>()(
  persist(
    (set, get) => ({
      points: 0,
      streak: 1,
      state: null,
      mode: null,
      resetStreak: () => set(() => ({ streak: 1 })),
      increaseStreak: () => set((currentState) => ({ streak: currentState.streak + 1 })),
      setPoints: () => set((currentState) => ({ points: currentState.points * (currentState.streak / 0.1) }))
    }),
    {
      name: "game-store",
      storage: createJSONStorage(() => localStorage)
    }
  )
)