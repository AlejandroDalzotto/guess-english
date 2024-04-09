interface Props {
  text: string;
  words: string[];
}

export default function Phrase({ text, words }: Props) {

  const parts = text.split(" ")

  return (
    <p>
      {parts.map((part, i) => {

        const regex = new RegExp(`\\b${part.replace(/[^a-zA-Z]/g, '')}\\b`, 'i');

        if (words.some(word => regex.test(word))) {
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
