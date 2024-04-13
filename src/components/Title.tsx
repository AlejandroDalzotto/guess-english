
interface Props {
  children: React.ReactNode;
}

export default function Title({ children }: Props) {

  return (
    <h1 className="font-bold w-full text-center text-4xl">
      {children}
    </h1>
  )
}
