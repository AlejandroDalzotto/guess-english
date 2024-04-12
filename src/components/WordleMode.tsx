import ResetWordleButtom from "./ResetWordleButtom";
import WordleTable from "./WordleTable";

export default function WordleMode() {

  return (
    <section className="outline-none relative row-span-8">
      <WordleTable />
      <article className="w-full my-10 grid place-content-center">

        <ResetWordleButtom />

      </article>
      {/* Keyboard here */}
    </section>
  )
}
