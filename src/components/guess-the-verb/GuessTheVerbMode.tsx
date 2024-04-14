"use client";

import useStore from "@/hooks/use-store";
import { useGuessStore } from "@/stores/guess-store";
import Loader from "@/components/Loader";
import useSound from "use-sound";
import { verbs } from "@/lib/data";
import TotalProgress from "@/components/guess-the-verb/TotalProgress";

export default function GuessTheVerbMode() {

  const store = useStore(useGuessStore, (state) => state);

  // Sfx
  const [playVictory] = useSound("/audio/reward.mp3")
  const [playDefeat] = useSound("/audio/error.mp3")
  const [playOnDown] = useSound("/audio/pop-down.mp3")
  const [playOnUp] = useSound("/audio/pop-up-on.mp3")

  if (!store || !store._hasHydrated) {
    return <Loader />
  }

  const handleClick = (selection: string) => {
    const isCorrect = selection === store.verb?.translations[0];

    if (isCorrect) {
      playVictory();
      store.onVictory();

      return;
    }

    playDefeat();
    store.onDefeat();
  }

  return (
    <article className="h-full">
      {
        store.verb ? (
          <>
            <header>

              <p className="text-center text-balance">¿What&apos;s the correct translation of the verb <strong className="capitalize">{store.verb?.value}</strong>?</p>

            </header>

            <article className="max-w-[416px] mx-auto grid grid-cols-2 gap-10 p-5">

              {
                store.options.map((option) => {
                  return (
                    <div onClick={() => handleClick(option)} key={crypto.randomUUID()} className="grid h-full p-3 transition-all border rounded-lg opacity-75 bg-white/5 hover:opacity-100 place-content-center border-neutral-700 aspect-square dark:hover:scale-105 hover:scale-105">
                      <p className="text-xl font-bold text-center capitalize select-none text-balance">{option}</p>
                    </div>
                  )
                })
              }

            </article>
            <article className="max-w-[416px] mt-3 mx-auto grid place-content-center">
              <TotalProgress total={verbs.length} current={store.verbsHistory.length} />
            </article>
          </>
        ) : (
          <div className="aspect-square md:aspect-auto md:h-full max-h-96 text-center font-bold max-w-[416px] mx-auto flex flex-col items-center justify-center gap-y-3 p-5">
            <p className="text-3xl opacity-65">There&apos;s no verbs left</p>
            <p className="opacity-65">¡You are amazing!</p>
            <button
              onMouseDown={() => playOnDown()}
              onMouseUp={() => {
                playOnUp()
                store.reset()
              }}
              className="relative grid px-6 py-3 transition-all border rounded-lg active:scale-90 hover:bg-black/5 dark:hover:bg-white/5 place-content-center border-neutral-700 hover:scale-105">
              reset game
            </button>
          </div>
        )
      }

      <footer className="flex justify-center mt-10 select-none gap-x-10">

        <div className="flex flex-col items-center gap-y-3">
          <p className="text-lg text-center">Your current <br /> <strong>points</strong></p>
          <span className="text-5xl font-black">{store.points}</span>
        </div>
        <div className="flex flex-col items-center gap-y-3">
          <p className="text-lg text-center">Your current <br /> <strong>streak</strong></p>
          <span className="text-5xl font-black">{store.streak}</span>
        </div>
      </footer>
    </article>
  )
}
