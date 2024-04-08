"use client";

import useStore from "@/hooks/use-store";
import { useGuessStore } from "@/stores/guess-store";
import Loader from "./Loader";

export default function GuessTheVerbMode() {

  const store = useStore(useGuessStore, (state) => state)

  if (!store || !store._hasHydrated) {
    return <Loader />
  }

  return (
    <article className="h-full">
      <header>

        <p className="text-balance text-center">¿What&apos;s the correct translation of the verb <strong className="capitalize">{store.verb.value}</strong>?</p>

      </header>

      <article className="grid grid-cols-2 gap-10 p-5">

        {
          store.options.map((option) => {
            return (
              <div key={crypto.randomUUID()} className="bg-white/5 opacity-75 hover:opacity-100 grid place-content-center border border-neutral-700 h-full aspect-square transition-all rounded-lg dark:hover:scale-105 hover:scale-105">
                <p className="text-xl capitalize text-balance text-center font-bold">{option}</p>
              </div>
            )
          })
        }

      </article>

      <footer className="flex flex-col items-center gap-y-6">

        <p className="text-lg">Your current <strong>points</strong></p>
        <span className="font-black text-5xl">{store.points}</span>
      </footer>
    </article>
  )
}
