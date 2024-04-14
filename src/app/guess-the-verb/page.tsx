import GoBackButton from "@/components/GoBackButton";
import GuessTheVerbMode from "@/components/GuessTheVerbMode";
import { Smoke3 } from "@/components/Smokes";
import Title from "@/components/Title";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Guess the Verb 🔮 • Guess English",
  description: "Generated by create next app",
};

export default function GuessTheVerbPage() {
  return (
    <>
      <Smoke3 />
      <main className="container grid max-h-screen min-h-screen px-6 mx-auto grid-rows-10">
        <header className="flex flex-col items-center justify-center row-span-2 gap-y-8">
          <div className="grid w-full grid-cols-3">
            <GoBackButton backTo="home" label="Back to home" />
          </div>
          <Title>
            ¡Guess <br className="md:hidden" /> the verb!
          </Title>
        </header>
        <section className="relative row-span-6">
          <GuessTheVerbMode />
        </section>
      </main>
    </>
  )
}
