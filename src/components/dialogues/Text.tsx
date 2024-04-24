import clsx from "clsx";

interface Props {
  text: string;
  sender: string;
  align: "right" | "left";
}

const Text = ({ text, sender, align }: Props) => {

  return (
    <div className={clsx(
      "flex gap-x-2 items-center w-fit",
      { "self-end flex-row-reverse rounded-b-lg rounded-tl-lg": align === "right" },
      { "self-start rounded-b-lg rounded-tr-lg": align === "left" }
    )}>
      <span className="px-4 py-2 border rounded-lg border-blue-500 bg-blue-500/10 text-blue-500 w-fit">{sender}</span>
      <p className="px-4 py-2 border border-neutral-800 w-fit">{text}</p>
    </div>
  );
};

export default Text;