import CompleteThePhraseMode from '@/components/complete-the-phrase/CompleteThePhraseMode';
import GoBackButton from '@/components/GoBackButton';
import Title from '@/components/Title';
import { type Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
  title: "Complete the phrase 🌌 • Guess English",
  description: "Generated by create next app",
};

export default function CompleteThePhrasePage() {
  return (
    <main className="container grid max-h-screen min-h-screen px-6 mx-auto grid-rows-10">
      <header className="flex flex-col items-center justify-center row-span-2 gap-y-8">
        <div className="grid w-full grid-cols-3">
          <GoBackButton backTo="home" label="Back to home" />
        </div>
        <Title>
          Complete <br className="md:hidden" /> the phrase
        </Title>
      </header>
      <section className="relative row-span-8">
        <CompleteThePhraseMode />
      </section>
    </main>
  )
}
