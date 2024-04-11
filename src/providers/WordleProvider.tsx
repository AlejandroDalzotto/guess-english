"use client";

import { type KeyboardEvent } from "react"

interface Props {
  children: React.ReactNode
}

export default function WordleProvider({ children }: Props) {

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    e.preventDefault()

    console.log({ key: e.key })
  }

  return (
    <div className="outline-none" autoFocus tabIndex={-1} onKeyDown={(e) => handleKeyDown(e)}>
      {children}
    </div>
  )
}
