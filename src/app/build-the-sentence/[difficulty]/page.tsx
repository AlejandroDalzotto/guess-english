import GoBackButton from "@/components/GoBackButton";
import { Smoke4 } from "@/components/Smokes";
import Title from "@/components/Title";
import SentencesGameMode from "@/components/build-the-sentence/SentencesGameMode";
import { Difficulty } from "@/lib/enums"
import BuildTheSentenceProvider from "@/providers/BuildTheSentenceProvider";

export default async function DynamicDifficultySentencesPage({
  params
}: {
  params: {
    difficulty: Difficulty
  }
}) {

  return (
    <BuildTheSentenceProvider>
      <Smoke4 />
      <main className="container grid max-h-screen min-h-screen px-6 mx-auto grid-rows-10">
        <header className="flex flex-col items-center justify-center row-span-2 gap-y-8">
          <div className="grid w-full grid-cols-3">
            <GoBackButton backTo="home" label="Go back" />
          </div>
          <Title>
            Build the <br className="md:hidden" /> sentence
          </Title>
        </header>
        <section className="relative grid grid-cols-2 row-span-6 gap-10">
          <SentencesGameMode difficulty={params.difficulty} />
        </section>
      </main>
    </BuildTheSentenceProvider>
  )
}
