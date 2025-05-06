import { tv } from "tailwind-variants";

interface Props {
  type?: "button" | "submit" | "reset";
  color: "primary" | "secondary";
  size: "sm" | "md" | "lg";
  text: string;
  onClick?: () => void;
  disabled?: boolean;
}

const style = tv({
  base: "rounded-md m-2",
  variants: {
    color: {
      primary: "bg-primary hover:bg-primary-light",
      secondary: "bg-secondary hover:bg-secondary-light",
    },
    size: {
      sm: "text-sm px-2 py-1",
      md: "text-base px-4 py-2",
      lg: "text-lg px-6 py-3",
    },
    disabled: {
      true: "pointer-events-none opacity-20",
    },
  },
});

function Button({ type, color, size, text, onClick, disabled }: Props) {
  return (
    <>
      <button
        type={type ?? "button"}
        className={style({ color, size, disabled })}
        onClick={onClick}
        disabled={disabled ?? false}
      >
        <div className="font-sans text-white">{text}</div>
      </button>
    </>
  );
}

export default Button;
