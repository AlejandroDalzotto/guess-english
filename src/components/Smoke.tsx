import React from 'react'

export default function Smoke() {
  return (
    <div
      aria-hidden
      className="-z-10 fixed top-32 left-1/3 md:left-32 bg-gradient-conic opacity-50 from-blue-600 via-violet-400 to-transparent rounded-full blur-3xl w-96 aspect-square"
    ></div>
  )
}
