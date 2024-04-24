import clsx from "clsx";

interface Props {
  text: string;
  sender: string;
  align: "right" | "left";
}

const Text = ({ text, sender, align }: Props) => {

  return (
    <div className={clsx(
      "relative w-full flex gap-x-2 items-start justify-start",
      { "self-end flex-row-reverse": align === "right" },
      { "self-start": align === "left" }
    )}>
      <span className="px-4 py-2 border rounded-lg border-blue-500 bg-blue-500/10 text-blue-500 w-fit">{sender}</span>
      <p className={clsx(
        "px-4 max-w-[65%] rounded-b-lg  py-2 border border-neutral-800 w-fit",
        { "rounded-tl-lg": align === "right" },
        { "rounded-tr-lg": align === "left" },
      )}>{text}</p>
    </div>
  );
};

export default Text;