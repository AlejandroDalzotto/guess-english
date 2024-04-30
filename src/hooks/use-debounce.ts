import { useRef } from "react";

interface Props {
  /**
   * Schedules execution of a one-time callback after delay milliseconds.
   * @default 350
   */
  ms?: number;
}

export const useDebounce = ({ ms = 350 }: Props | undefined = {}) => {

  const debounceRef = useRef<NodeJS.Timeout>()

  const debounce = (callback: () => void) => {
    if (debounceRef.current) clearTimeout(debounceRef.current)

    debounceRef.current = setTimeout(() => {
      callback()
    }, ms)
  }

  return {
    debounce
  }
}