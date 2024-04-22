"use client";
import { useEffect, useState } from 'react'

interface Props {
  text: string;
  typingDelay?: number;
}

const Typewriter = ({ text, typingDelay = 15 }: Props) => {
  const [content, setContent] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {

    const timeout = setTimeout(() => {
      if (index < text.length) {
        setContent((prev) => prev + text.charAt(index));
        setIndex((prev) => prev + 1);
      }
    }, typingDelay);

    return () => clearTimeout(timeout)
  }, [index, text, typingDelay]);

  return (
    <p className="px-4 py-2 border rounded-b-lg rounded-tr-lg border-neutral-800 w-fit">{content}</p>
  );
};

export default Typewriter;