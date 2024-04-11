import ResetWordleButtom from "./ResetWordleButtom";
import WordleTable from "./WordleTable";
import WordleProvider from "@/providers/WordleProvider";

export default function WordleMode() {

  return (
    <WordleProvider>
      <section className="outline-none relative row-span-8">
        <WordleTable />
        <article className="w-full my-10 grid place-content-center">

          <ResetWordleButtom />

        </article>
        {/* Keyboard here */}
      </section>
    </WordleProvider>
  )
}
