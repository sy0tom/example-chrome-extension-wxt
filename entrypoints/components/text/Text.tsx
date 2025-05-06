interface Props {
  text: string | number | string[];
}

export function Text({ text }: Props) {
  return <span className="font-sans text-gray-700 text-base">{text}</span>;
}
