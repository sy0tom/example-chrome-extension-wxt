import { FieldValues, Path, UseFormRegister } from "react-hook-form";

export type InputType = "text" | "email" | "password" | "number" | "url";

interface Props<T extends FieldValues> {
  type: InputType;
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
      className="w-full px-2 py-2 text-base font-sans text-gray-700 rounded border border-gray-100 focus:border-primary focus:outline-none"
      type={type}
      placeholder={placeholder}
      {...register(name)}
    />
  );
}
