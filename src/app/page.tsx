import GameModes from "@/components/GameModes";
import Title from "@/components/Title";
import Link from "next/link";

export default function HomePage() {
  return (
      <main className="px-6 container mx-auto grid grid-rows-10 max-h-screen min-h-screen">
        <header className="row-span-5 flex flex-col gap-y-8 items-center justify-center">
          <Title />
          <p className="text-lg">A simple game made for those spanish natives who wants to improve their skills in english and why not have some fun.</p>
          <p className="text-lg">This game has two modes which are <strong>Guess the verb</strong> and <strong>Complete the phrase</strong>.</p>
        </header>

        <section className="row-span-4 grid place-content-center">
          <GameModes />
        </section>

        <footer className="grid place-content-center">

          <p>made with ❤ by {" "}
            <Link
              href="https://github.com/AlejandroDalzotto"
              className="underline hover:text-blue-500 dark:hover:[text-shadow:1px_0_10px] dark:shadow-indigo-500 dark:hover:text-indigo-500"
            >
              Alejandro Dalzotto
            </Link>
          </p>
        </footer>
      </main>
  );
}
