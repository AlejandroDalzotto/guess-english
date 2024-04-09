"use client";

import { verbs } from "@/lib/data";
import type { Verb } from "@/lib/types";
import { useEffect, useState } from "react";
import Phrase from "./Phrase";

export default function VerbsHistory() {
  const [history, setHistory] = useState<Verb[]>([])

  useEffect(() => {

    if (typeof window !== "undefined" && window.localStorage) {

      const guessStorage = JSON.parse(window.localStorage.getItem("gtv__s") ?? "{\"verbs\":[]}") as { verbs: string[] }

      if (guessStorage.verbs.length) {

        const parsedValues = [...verbs].filter(verb => guessStorage.verbs.includes(verb.value))

        setHistory(parsedValues)
      }

    }

  }, [])

  if (!history.length) {
    return <p>No data to see yet...</p>
  }


  return (
    <div className="w-full mx-auto gap-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {
        history.map((verb) => {
          return (
            <article
              className="w-full grid relative hover:bg-white/5 border border-neutral-700 h-full p-6 transition-all rounded-lg hover:scale-105"
              key={verb.value}
            >
              <header>
                <h3 className="capitalize text-xl font-medium underline text-left">{verb.value}</h3>
              </header>

              {verb.translations.length ? (
                <section>
                  <h4 className="italic my-3">Common translations</h4>
                  <div className="grid grid-cols-3 gap-4 my-3">
                    {
                      verb.translations.map((translation) => {
                        return (
                          <p className="grid place-content-center py-1 px-3 rounded-full border border-neutral-700" key={translation + verb.value}>
                            {translation}
                          </p>
                        )
                      })
                    }
                  </div>
                </section>
              ) : (
                <span className="text-neutral-800 dark:text-neutral-400 italic my-3">No translations available...</span>
              )}

              {verb.examplePhrases.length ? (
                <section>
                  <h4 className="italic my-3">Example phrases</h4>
                  <ul className="flex flex-col gap-y-4 my-3">
                    {
                      verb.examplePhrases.map((phrase) => {
                        return (
                          <li
                            className="grid place-content-start px-4"
                            key={phrase + verb.value}
                          >
                            <Phrase text={phrase} word={verb.value} />
                          </li>
                        )
                      })
                    }
                  </ul>
                </section>
              ) : (
                <span className="text-neutral-800 dark:text-neutral-400 italic my-3">There are no examples sentences to show...</span>
              )}
            </article>
          )
        })
      }
    </div>
  )
}
