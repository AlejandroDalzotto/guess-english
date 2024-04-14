import GoBackButton from '@/components/GoBackButton'
import { Smoke2 } from '@/components/Smokes'
import Title from '@/components/Title'
import WordleMode from '@/components/wordle/WordleMode'
import WordleProvider from '@/providers/WordleProvider'

export default function WordlePage() {

  return (
    <>
      <Smoke2 />
      <WordleProvider>
        <main className="container flex flex-col items-center max-h-screen min-h-screen px-3 mx-auto">
          <header className="flex flex-col items-center justify-center my-8 gap-y-8">
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
