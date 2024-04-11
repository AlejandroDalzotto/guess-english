import CompleteThePhraseMode from '@/components/CompleteThePhraseMode';
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
    <main className="px-6 container mx-auto grid grid-rows-10 max-h-screen min-h-screen">
      <header className="row-span-2 flex flex-col gap-y-8 items-center justify-center">
        <div className="w-full grid grid-cols-3">
          <GoBackButton backTo="home" label="Back to home" />
        </div>
        <Title>
          ¡Complete <br className="md:hidden" /> the phrase!
        </Title>
      </header>
      <section className="relative row-span-8">
        <CompleteThePhraseMode />
      </section>
    </main>
  )
}