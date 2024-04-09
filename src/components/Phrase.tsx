interface Props {
  text: string;
  word: string;
}

export default function Phrase({ text, word }: Props) {

  const parts = text.split(" ")

  return (
    <p>
      {parts.map((part, i) => {
        if (part.toLowerCase() === word.toLowerCase()) {
          return (
            <span key={i + text + part} className="font-bold text-blue-500 dark:text-indigo-500 dark:hover:[text-shadow:1px_0_10px] shadow-blue-500 dark:shadow-indigo-500">
              {part + " "}
            </span>
          );
        } else {
          return part + " "
        }
      })}
    </p>
  )
}
