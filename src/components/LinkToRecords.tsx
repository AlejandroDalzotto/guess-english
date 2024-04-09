"use client";

import Link from "next/link";

export default function LinkToRecords({
  history
}: {
  history: {
    store: string;
    url: string;
    label: string;
  }
}) {

  const hasStoredData = Boolean(localStorage.getItem(history.store))

  if (!hasStoredData) {
    return (
      <span className="mx-auto font-bold italic text-neutral-800 dark:text-neutral-600">No data to see yet...</span>
    )
  }

  return (
    <Link className="group/link transition-all active:scale-90 flex gap-x-2 mx-auto items-center underline hover:text-blue-500 dark:hover:[text-shadow:1px_0_10px] dark:shadow-indigo-500 dark:hover:text-indigo-500" href={history.url}>
      <svg className="w-8 dark:fill-white transition-colors h-8 group-hover/link:fill-blue-500 dark:group-hover/link:fill-indigo-500">
        <use xlinkHref="/sprites.svg#completed"></use>
      </svg>
      {history.label}
    </Link>
  )
}
