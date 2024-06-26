"use client";

import type { GameMode } from "@/lib/types";
import clsx from "clsx";
import Link from "next/link";
import useSound from "use-sound";

interface Props {
  mode: GameMode
}

export default function GameCard({ mode }: Props) {

  const [playOnDown] = useSound("/audio/pop-down.mp3", { volume: 0.5 })
  const [playOnUp] = useSound("/audio/pop-up-on.mp3", { volume: 0.5 })

  return (
    <Link
      href={mode.href}
      onMouseDown={() => playOnDown()}
      onMouseUp={() => {
        playOnUp()
      }}
      className={
        clsx(
          "relative w-full flex flex-col border border-neutral-700 h-full p-6 transition-all rounded-lg",
          { "active:scale-95 hover:bg-white/5 hover:scale-105": mode.available },
          { "pointer-events-none opacity-80 brightness-75": !mode.available }
        )
      }
    >
      <h3 className="text-2xl font-medium capitalize">{mode.name}</h3>
      <p>{mode.shortDescription}</p>
      <span
        className="mt-6 text-right text-blue-500 underline dark:text-indigo-500"
      >
        {mode.available ? "Let's try..." : "Not yet available..."}
      </span>
    </Link>
  )
}
