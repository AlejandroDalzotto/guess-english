import { GameState } from "@/lib/enums";
import { useEffect, useRef, useState } from "react";

export const useGameAction = () => {

  const [state, setState] = useState<GameState>(GameState.IDLE);
  const timer = useRef<NodeJS.Timeout>()

  useEffect(() => {
    if (state !== null) {
      // Set the result to idle after 1000 milliseconds.
      timer.current = setTimeout(() => {
        setState(GameState.IDLE);
      }, 1000);
    }
    return () => clearTimeout(timer.current);
  }, [state]);

  return { state, setState };
}