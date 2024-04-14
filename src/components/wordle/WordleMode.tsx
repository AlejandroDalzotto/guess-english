import Qwerty from "@/components/wordle/Qwerty";
import ResetWordleButtom from "@/components/wordle/ResetWordleButtom";
import Board from "@/components/wordle/Board";

export default function WordleMode() {

  return (
    <section className="relative flex flex-col items-center outline-none">
      <Board />
      <article className="grid w-full my-8 place-content-center">

        <ResetWordleButtom />

      </article>
      <article className="relative w-full">
        <Qwerty />
      </article>
    </section>
  )
}
