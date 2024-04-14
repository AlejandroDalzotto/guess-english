"use client";

import { verbs } from "@/lib/data";
import type { Verb } from "@/lib/types";
import { useEffect, useState } from "react";
import Phrase from "@/components/guess-the-verb/Phrase";

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
    <div className="grid w-full grid-cols-1 gap-10 mx-auto md:grid-cols-2 lg:grid-cols-3">
      {
        history.map((verb) => {
          return (
            <article
              className="relative grid w-full h-full p-6 transition-all border rounded-lg hover:bg-white/5 border-neutral-700 hover:scale-105"
              key={verb.value}
            >
              <header>
                <h3 className="text-xl font-medium text-left underline capitalize">{verb.value}</h3>
              </header>

              {verb.translations.length ? (
                <section>
                  <h4 className="my-3 italic">Common translations</h4>
                  <div className="flex flex-wrap gap-4 my-3">
                    {
                      verb.translations.map((translation) => {
                        return (
                          <p className="grid px-3 py-1 border rounded-full place-content-center border-neutral-700" key={translation + verb.value}>
                            {translation}
                          </p>
                        )
                      })
                    }
                  </div>
                </section>
              ) : (
                <span className="my-3 italic text-neutral-800 dark:text-neutral-400">No translations available...</span>
              )}

              {verb.examplePhrases.length ? (
                <section>
                  <h4 className="my-3 italic">Example phrases</h4>
                  <ul className="flex flex-col my-3 gap-y-4">
                    {
                      verb.examplePhrases.map((phrase) => {
                        return (
                          <li
                            className="grid px-4 place-content-start"
                            key={phrase + verb.value}
                          >
                            <Phrase text={phrase} words={verb.highlight} />
                          </li>
                        )
                      })
                    }
                  </ul>
                </section>
              ) : (
                <span className="my-3 italic text-neutral-800 dark:text-neutral-400">There are no examples sentences to show...</span>
              )}
            </article>
          )
        })
      }
    </div>
  )
}
