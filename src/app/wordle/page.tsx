import GoBackButton from '@/components/GoBackButton'
import { Smoke2 } from '@/components/Smokes'
import Title from '@/components/Title'
import WordleMode from '@/components/WordleMode'

export default function WordlePage() {

  return (
    <>
      <Smoke2 />
      <main className="px-6 container mx-auto grid grid-rows-10 max-h-screen min-h-screen">
        <header className="row-span-2 flex flex-col gap-y-8 items-center justify-center">
          <div className="w-full grid grid-cols-3">
            <GoBackButton backTo="home" label="Back to home" />
          </div>
          <Title>
            ¡Wordle!
          </Title>
        </header>
        <WordleMode />
      </main>
    </>
  )
}
