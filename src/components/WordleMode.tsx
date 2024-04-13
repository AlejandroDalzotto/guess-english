import Qwerty from "./Qwerty";
import ResetWordleButtom from "./ResetWordleButtom";
import Board from "./Board";

export default function WordleMode() {

  return (
    <section className="outline-none relative flex flex-col items-center">
      <Board />
      <article className="w-full my-8 grid place-content-center">

        <ResetWordleButtom />

      </article>
      <article className="w-full relative">
        <Qwerty />
      </article>
    </section>
  )
}
