interface Props {
  text: string;
  word: string;
}

export default function Phrase({ text, word }: Props) {

  const regex = new RegExp(word, 'gi');

  const parts = text.split(" ")

  console.log({ parts, text })

  return (
    <p>
      {parts.map((part, i) => {
        if (part.toLowerCase() === word.toLowerCase()) {
          return (
            <span key={i + text + part} className="font-bold text-indigo-400">
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
