export default function GuessTheVerbMode() {

  return (
    <article className="h-full">
      <header>

        <p className="text-balance text-center">¿What&apos;s the correct translation of the verb <strong>See</strong>?</p>

      </header>

      <article className="grid grid-cols-2 gap-10 p-10">

        <div className="bg-white/5 opacity-75 hover:opacity-100 grid place-content-center border border-neutral-700 h-full aspect-square transition-all rounded-lg dark:hover:scale-105 hover:scale-105">
          <p className="text-2xl font-bold">Ver</p>
        </div>
        <div className="bg-white/5 opacity-75 hover:opacity-100 grid place-content-center border border-neutral-700 h-full aspect-square transition-all rounded-lg dark:hover:scale-105 hover:scale-105">
          <p className="text-2xl font-bold">Mirar</p>
        </div>
        <div className="bg-white/5 opacity-75 hover:opacity-100 grid place-content-center border border-neutral-700 h-full aspect-square transition-all rounded-lg dark:hover:scale-105 hover:scale-105">
          <p className="text-2xl font-bold">Pedir</p>
        </div>
        <div className="bg-white/5 opacity-75 hover:opacity-100 grid place-content-center border border-neutral-700 h-full aspect-square transition-all rounded-lg dark:hover:scale-105 hover:scale-105">
          <p className="text-2xl font-bold">Obtener</p>
        </div>

      </article>

      <footer className="flex flex-col items-center gap-y-6">

        <p className="text-lg">Your current <strong>points</strong></p>
        <span className="font-black text-5xl">10</span>
      </footer>
    </article>
  )
}
