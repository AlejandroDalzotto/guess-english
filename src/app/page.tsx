import GameModes from "@/components/GameModes";
import { Smoke } from "@/components/Smokes";
import Title from "@/components/Title";
import Link from "next/link";

export default function HomePage() {

  return (
    <>
      <Smoke />
      <main className="container flex flex-col min-h-screen px-6 mx-auto">
        <header className="flex flex-col items-center justify-center min-h-96 gap-y-8">
          <Title>
            ¡Guess <br className="md:hidden" /> English!
          </Title>
          <p className="text-lg md:text-center text-balance">A simple website made for those spanish natives who wants to improve their skills in english and why not have some fun.</p>
          <p className="text-lg">This game has two modes which are <strong>Dialogues</strong> and <strong>Wordle</strong>.</p>
        </header>

        <section className="grid my-5 min-h-96 place-content-center">
          <GameModes />
        </section>

        <footer className="grid min-h-16 place-content-center">

          <p>made with ❤ by {" "}
            <Link
              target="_blank"
              href="https://github.com/AlejandroDalzotto"
              className="underline hover:text-blue-500 dark:hover:[text-shadow:1px_0_10px] dark:shadow-indigo-500 dark:hover:text-indigo-500"
            >
              Alejandro Dalzotto
            </Link>
          </p>
        </footer>
      </main>
    </>
  );
}
