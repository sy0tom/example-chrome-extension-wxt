import { FieldValues, Path, UseFormRegister } from "react-hook-form";

interface Props<T extends FieldValues> {
  type: "text" | "email" | "password" | "number" | "url";
  placeholder?: string;
  name: Path<T>;
  register: UseFormRegister<T>;
}

export function Input<T extends FieldValues>({
  type,
  placeholder,
  name,
  register,
}: Props<T>) {
  return (
    <input
      className="py-1 w-full font-sans text-gray-700 rounded border border-gray-100 focus:border-transparent focus:outline-none"
      type={type}
      placeholder={placeholder}
      {...register(name)}
    />
  );
}
