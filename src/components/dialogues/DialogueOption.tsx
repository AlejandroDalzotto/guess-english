"use client";

import { useDialogueStore } from "@/stores/dialogues-store";
import useSound from "use-sound";

export default function DialogueOption({ option }: { option: string }) {

  const correntChoice = useDialogueStore(state => state.currentCorrect)
  const currentDialogueIndex = useDialogueStore(state => state.currentDialogueIndex)
  const section = useDialogueStore(state => state.section)
  const onCorrect = useDialogueStore(state => state.onCorrect)

  //Sfx
  const [playVictory] = useSound("/audio/reward.mp3", { volume: 0.5 })
  const [playDefeat] = useSound("/audio/error.mp3", { volume: 0.5 })

  const handleClick = () => {

    if (correntChoice === option && section!.dialogues.length > currentDialogueIndex) {
      onCorrect();
      playVictory();
      return;
    }

    playDefeat();
  }

  return (
    <button
      onClick={handleClick}
      className="active:scale-90 hover:scale-[1.02] px-6 py-3 text-xl transition-all border rounded-lg shadow select-none hover:bg-white/5 border-neutral-800"
    >
      {option}
    </button>
  )
}
