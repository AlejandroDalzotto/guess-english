"use client";

import useSound from "use-sound";

interface Props {
  label: string;
  backTo: string;
}

export default function GoBackButton({ backTo, label }: Props) {

  const [playOnDown] = useSound("/audio/pop-down.mp3", { volume: 0.5 })
  const [playOnUp] = useSound("/audio/pop-up-on.mp3", { volume: 0.5 })

  const handleClick = () => {
    history.back();
  }

  return (
    <button
      onMouseDown={() => playOnDown()}
      onMouseUp={() => {
        playOnUp()
        handleClick()
      }}
      title={label}
      aria-label={`Go back to ${backTo}`}
      className="whitespace-nowrap flex active:scale-90 hover:scale-105 transition-all gap-x-2 py-3 px-6 rounded-lg w-fit items-center select-none relative hover:bg-white/5 border border-neutral-700"
    >
      <svg className="w-8 h-8 dark:fill-white">
        <use xlinkHref="/sprites.svg#go-back"></use>
      </svg>
      {label}
    </button>
  )
}
