import WordleTable from "./WordleTable";
import WordleProvider from "@/providers/WordleProvider";

export default function WordleMode() {

  return (
    <WordleProvider>
      <section className="outline-none relative row-span-8">
        <WordleTable />
        {/* Keyboard here */}
      </section>
    </WordleProvider>
  )
}
