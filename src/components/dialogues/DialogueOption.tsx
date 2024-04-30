"use client";

import { useDialogueStore } from "@/stores/dialogues-store";
import useSound from "use-sound";

export default function DialogueOption({ option }: { option: string }) {

  const stories = useDialogueStore(state => state.stories)
  const currentPlaying = useDialogueStore(state => state.currentPlaying)
  const onCorrect = useDialogueStore(state => state.onCorrect)
  const onVictory = useDialogueStore(state => state.onVictory)

  //Sfx
  const [playCorrect] = useSound("/audio/reward.mp3", { volume: 0.5 })
  const [playDefeat] = useSound("/audio/error.mp3", { volume: 0.5 })
  const [playVictory] = useSound("/audio/discovery.mp3", { volume: 0.5 })

  if (!stories.size || !currentPlaying) {
    return <p>story not found (Options)</p>
  }

  const { currentDialogueIndex, completed, dialogue, currentCorrect } = stories.get(currentPlaying)!


  const handleClick = () => {

    if (currentCorrect === option && dialogue!.dialogues.length === currentDialogueIndex + 1) {
      onVictory();
      playVictory();
      return;
    }

    if (currentCorrect === option && dialogue!.dialogues.length > currentDialogueIndex) {
      onCorrect();
      playCorrect();
      return;
    }

    playDefeat();
  }

  return (
    <button
      disabled={completed}
      onClick={handleClick}
      className="disabled:opacity-80 disabled:brightness-90 disabled:pointer-events-none active:scale-90 hover:scale-[1.02] px-6 py-3 text-xl transition-all border rounded-lg shadow select-none hover:bg-white/5 border-neutral-800"
    >
      {option}
    </button>
  )
}
