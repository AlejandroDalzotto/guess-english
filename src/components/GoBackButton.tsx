"use client";

import useSound from "use-sound";

interface Props {
  label: string;
  backTo: string;
}

export default function GoBackButton({ backTo, label }: Props) {

  const [playOnDown] = useSound("/audio/pop-down.mp3", { volume: 0.3 })
  const [playOnUp] = useSound("/audio/pop-up-on.mp3", { volume: 0.3 })

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
      className="relative flex items-center px-6 py-3 transition-all border rounded-lg select-none whitespace-nowrap active:scale-90 hover:scale-105 gap-x-2 w-fit hover:bg-white/5 border-neutral-700"
    >
      <svg className="w-8 h-8 dark:fill-white">
        <use xlinkHref="/sprites.svg#go-back"></use>
      </svg>
      {label}
    </button>
  )
}
