"use client";

interface Props {
  label: string;
  backTo: string;
}

export default function GoBackButton({ backTo, label }: Props) {

  const handleClick = () => {
    history.back();
  }

  return (
    <button
      title={label}
      aria-label={`Go back to ${backTo}`}
      className="flex gap-x-2 py-3 px-6 rounded-lg transition-colors w-fit items-center select-none relative hover:bg-white/5 border border-neutral-700"
      onClick={handleClick}
    >
      <svg className="w-8 h-8 dark:fill-white">
        <use xlinkHref="/sprites.svg#go-back"></use>
      </svg>
      {label}
    </button>
  )
}
