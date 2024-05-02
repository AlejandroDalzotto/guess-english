"use client";

import { useGameAction } from "@/hooks/use-game-action";
import { Difficulty, GameState } from "@/lib/enums"
import { generateUUID } from "@/lib/utils";
import { useSentenceStore } from "@/stores/sentences-store"
import clsx from "clsx";
import { useCallback, useMemo } from "react";

const SentencesGameMode = ({
  difficulty
}: {
  difficulty: Difficulty
}) => {

  // State
  const {
    state: correct,
    setState: setCorrect
  } = useGameAction()
  // Store's attributes
  const sentence = useSentenceStore(state => state.sentence)
  const current = useSentenceStore(state => state.current)

  // Store's actions
  const onSelect = useSentenceStore(state => state.onWordSelect)
  const onDeselect = useSentenceStore(state => state.onWordDeselect)
  const check = useSentenceStore(state => state.check)

  // Utils
  const isWordSelected = useMemo(() => {
    return (word: string) => current.includes(word);
  }, [current]);

  // Sfx 


  const handleClick = useCallback((word: string) => {
    if (!current.includes(word)) {
      onSelect(word);
    } else {
      onDeselect(word);
    }
  }, [current, onSelect, onDeselect]);

  const handleCheck = useCallback(() => {
    if (current.length > 2) {
      const isCorrect = check();
      setCorrect(isCorrect ? GameState.CORRECT : GameState.INCORRECT);
    }
  }, [current.length, check, setCorrect]);

  if (!sentence) {
    return (
      <div className="grid w-full h-full border rounded-lg place-content-center border-neutral-600 ">
        <p className="text-2xl italic font-medium text-neutral-400">No sentences avaiables</p>
      </div>
    )
  }

  return (
    <article className="flex flex-col max-w-[512px] mx-auto w-full h-full p-5 border rounded-lg gap-y-5 border-neutral-800">
      <header className="flex flex-col gap-y-4">
        <div className="flex items-center justify-between w-full">
          <p className="text-xl">Translate this sentence</p>

          <span className={clsx(
            "py-1 px-3 border rounded-full font-bold",
            { "border-red-400 text-red-400 bg-red-400/10": sentence.difficulty === Difficulty.HARD },
            { "border-amber-400 text-amber-400 bg-amber-400/10": sentence.difficulty === Difficulty.MEDIUM },
            { "border-green-400 text-green-400 bg-green-400/10": sentence.difficulty === Difficulty.EASY },
          )}>
            {sentence.difficulty}
          </span>
        </div>
        <h1 className="flex text-3xl font-bold gap-x-3">
          {
            sentence.text.split(" ").map(word => {

              return (
                <span
                  className="underline decoration-neutral-400 decoration-dotted"
                  key={sentence.id + word + "title"}>
                  {word}
                </span>
              )

            })
          }
        </h1>
      </header>

      <section className="relative h-full">

        <div className={clsx(
          "flex flex-wrap content-start h-full gap-3",
          { "animate-shake": correct === GameState.INCORRECT }
        )}>
          {
            current.map((word, i) => {

              return (
                <button
                  onClick={() => onDeselect(word)}
                  className={clsx(
                    "select-none px-3 py-1 text-xl h-fit transition-all border border-b-4 rounded-lg w-fit border-neutral-400 text-neutral-200 hover:translate-y-0.5 hover:border-b-2",
                    { "capitalize": i === 0 },
                    { "border-red-400 text-red-400": correct === GameState.INCORRECT },
                    { "border-green-400 text-green-400": correct === GameState.CORRECT },
                  )}
                  key={sentence.id + word + "board"}
                >
                  {word}
                </button>
              )

            })
          }
        </div>

      </section>

      <footer className="flex flex-col gap-y-6">
        <div className="flex flex-wrap justify-center gap-3 px-6">
          {
            sentence.options.map((option) => {

              return (
                <button
                  disabled={isWordSelected(option)}
                  onClick={() => handleClick(option)}
                  className="select-none disabled:pointer-events-none disabled:border-neutral-800 disabled:text-neutral-600 px-3 py-1 text-xl transition-all border border-b-4 rounded-lg w-fit border-neutral-400 text-neutral-200 hover:translate-y-0.5 hover:border-b-2"
                  key={sentence.id + option + "option"}
                >
                  {option.toLowerCase()}
                </button>
              )

            })
          }
        </div>
        <div className="flex items-center justify-center w-full max-h-20 min-h-20">
          <button
            onClick={handleCheck}
            className="px-4 w-full py-2 text-2xl font-bold transition-all border border-b-4 rounded-lg border-neutral-400 text-neutral-200 hover:translate-y-0.5 hover:border-b-2 hover:border-green-400 hover:text-green-400">
            check
          </button>
        </div>
      </footer>
    </article>
  )
}

export default SentencesGameMode;