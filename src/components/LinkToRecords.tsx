"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import useSound from "use-sound";

export default function LinkToRecords({
  history
}: {
  history: {
    store: string;
    url: string;
    label: string;
  }
}) {

  const [hasStoredData, setHasStoredData] = useState(false)
  const [playOnDown] = useSound("/audio/pop-down.mp3", { volume: 0.5 })
  const [playOnUp] = useSound("/audio/pop-up-on.mp3", { volume: 0.5 })

  useEffect(() => {

    if (typeof window !== "undefined" && window.localStorage) {

      const storage = JSON.parse(window.localStorage.getItem(history.store) ?? "{}")
      if (Object.keys(storage).length) {
        setHasStoredData(true)
      }
    }

  }, [history.store])


  if (!hasStoredData) {
    return (
      <span className="mx-auto italic font-bold text-neutral-800 dark:text-neutral-600">No data to see yet...</span>
    )
  }

  return (
    <Link
      className="group/link transition-all active:scale-90 flex gap-x-2 mx-auto items-center underline hover:text-blue-500 dark:hover:[text-shadow:1px_0_10px] dark:shadow-indigo-500 dark:hover:text-indigo-500"
      href={history.url}
      onMouseDown={() => playOnDown()}
      onMouseUp={() => {
        playOnUp()
      }}
    >
      <svg className="w-8 h-8 transition-colors dark:fill-white group-hover/link:fill-blue-500 dark:group-hover/link:fill-indigo-500">
        <use xlinkHref="/sprites.svg#completed"></use>
      </svg>
      {history.label}
    </Link>
  )
}
