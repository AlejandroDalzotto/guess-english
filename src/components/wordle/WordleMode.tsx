import Qwerty from "@/components/wordle/Qwerty";
import ResetWordleButtom from "@/components/wordle/ResetWordleButtom";
import Board from "@/components/wordle/Board";
import TotalProgressWordle from "./TotalProgressWordle";
import { getTotalWords } from "@/lib/actions";

export default async function WordleMode() {
  const total = await getTotalWords();

  return (
    <section className="relative flex flex-col items-center outline-none">
      <Board />
      <article className="grid w-full my-8 place-content-center">

        <ResetWordleButtom />

      </article>
      <article className="h-10 w-full grid place-content-center">
        <TotalProgressWordle total={total} />
      </article>
      <article className="relative w-full">
        <Qwerty />
      </article>
    </section>
  )
}
