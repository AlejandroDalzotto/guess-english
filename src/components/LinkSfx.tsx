"use client";

import Link from "next/link";
import useSound from "use-sound";

interface Props {
  children: React.ReactNode;
  href: string;
  className: string;
}

export default function LinkSfx({ children, ...rest }: Props) {

  const [playOnDown] = useSound("/audio/pop-down.mp3", { volume: 0.3 })
  const [playOnUp] = useSound("/audio/pop-up-on.mp3", { volume: 0.3 })
  return (
    <Link
      onMouseDown={() => playOnDown()}
      onMouseUp={() => {
        playOnUp()
      }}
      {...rest}
    >
      {children}
    </Link>
  )
}
