import GoBackButton from '@/components/GoBackButton'
import { Smoke2 } from '@/components/Smokes'
import Title from '@/components/Title'
import WordleMode from '@/components/WordleMode'
import WordleProvider from '@/providers/WordleProvider'

export default function WordlePage() {

  return (
    <>
      <Smoke2 />
      <WordleProvider>
        <main className="px-3 container mx-auto flex flex-col items-center max-h-screen min-h-screen">
          <header className="flex flex-col gap-y-8 my-8 items-center justify-center">
            <GoBackButton backTo="home" label="Back to home" />
            <Title>
              ¡Wordle!
            </Title>
          </header>
          <WordleMode />
        </main>
      </WordleProvider>
    </>
  )
}
