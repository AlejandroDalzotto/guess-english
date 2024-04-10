import { useEffect, useState } from "react";

export const useAnimation = (value: string | number | boolean) => {
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    setAnimate(true);

    const timeout = setTimeout(() => {
      setAnimate(false);
    }, 600);

    return () => clearTimeout(timeout)
  }, [value])

  return {
    animate
  }
}