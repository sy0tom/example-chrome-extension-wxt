export type SelectType = "select";

import { FieldValues, Path, UseFormRegister } from "react-hook-form";

interface Props<T extends FieldValues> {
  options: { name: string; value: string | number | string[] }[];
  initialValue?: string | number | string[];
  name: Path<T>;
  register: UseFormRegister<T>;
}
export function Select<T extends FieldValues>({
  options,
  initialValue,
  name,
  register,
}: Props<T>) {
  return (
    <>
      <select
        className="w-full px-2 py-3 text-base font-sans text-gray-700 rounded border border-gray-100 focus:border-primary focus:outline-none"
        {...register(name)}
      >
        {options.map((option, index) => {
          return (
            <option
              key={index}
              value={option.value}
              selected={option.value === initialValue}
            >
              {option.name}
            </option>
          );
        })}
      </select>
    </>
  );
}
