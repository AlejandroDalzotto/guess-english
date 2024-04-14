import GameModes from "@/components/GameModes";
import { Smoke } from "@/components/Smokes";
import Title from "@/components/Title";
import Link from "next/link";

export default function HomePage() {

  return (
    <>
      <Smoke />
      <main className="px-6 container flex flex-col mx-auto min-h-screen">
        <header className="flex min-h-96 flex-col gap-y-8 items-center justify-center">
          <Title>
            ¡Guess <br className="md:hidden" /> English!
          </Title>
          <p className="text-lg md:text-center text-balance">A simple website made for those spanish natives who wants to improve their skills in english and why not have some fun.</p>
          <p className="text-lg">This game has two modes which are <strong>Guess the verb</strong> and <strong>Wordle</strong>.</p>
        </header>

        <section className="min-h-96 my-5 grid place-content-center">
          <GameModes />
        </section>

        <footer className="min-h-16 grid place-content-center">

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
