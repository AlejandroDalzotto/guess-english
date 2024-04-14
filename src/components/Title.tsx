
interface Props {
  children: React.ReactNode;
}

export default function Title({ children }: Props) {

  return (
    <h1 className="w-full text-4xl font-bold text-center">
      {children}
    </h1>
  )
}
