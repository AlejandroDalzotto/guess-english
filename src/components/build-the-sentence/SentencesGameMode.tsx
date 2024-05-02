import { type Difficulty } from "@/lib/enums"

export default function SentencesGameMode({
  difficulty
}: {
  difficulty: Difficulty
}) {
  return (
    <div>SentencesGameMode: {difficulty}</div>
  )
}
