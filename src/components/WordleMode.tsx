import Qwerty from "./Qwerty";
import ResetWordleButtom from "./ResetWordleButtom";
import Board from "./Board";

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
