import Qwerty from "./Qwerty";
import ResetWordleButtom from "./ResetWordleButtom";
import Board from "./Board";

export default function WordleMode() {

  return (
    <section className="outline-none relative row-span-8">
      <Board />
      <article className="w-full my-10 grid place-content-center">

        <ResetWordleButtom />

      </article>
      <article className="w-full grid place-content-center">
        <Qwerty />
      </article>
    </section>
  )
}
