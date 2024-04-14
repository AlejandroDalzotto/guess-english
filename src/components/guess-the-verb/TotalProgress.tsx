"use client";
import { useAnimation } from "@/hooks/use-animation";
import clsx from "clsx";

interface Props {
  total: number;
  current: number;
}

export default function TotalProgress({ total, current }: Props) {

  const { animate } = useAnimation(current)

  return (
    <p className={clsx(
      "select-none transition-transform text-neutral-800 dark:text-white font-bold italic",
      { "animate-jump": animate }
    )}>
      {current} / {total}
    </p>
  )
}
