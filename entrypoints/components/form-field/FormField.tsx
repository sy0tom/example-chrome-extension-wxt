import {
  FieldError,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";
import { Input, InputType } from "./Input";
import { Select, SelectType } from "./Select";

type FieldType = InputType | SelectType;
interface Props<T extends FieldValues> {
  label: string;
  type: FieldType;
  placeholder?: string;
  options?: { name: string; value: string | number | string[] }[];
  currentValue?: string | number | string[];
  name: Path<T>;
  register: UseFormRegister<T>;
  error?: FieldError;
}

function FormField<T extends FieldValues>({
  label,
  type,
  placeholder,
  options,
  currentValue,
  name,
  register,
  error,
}: Props<T>) {
  return (
    <>
      <div className="px-2 py-2 flex items-center">
        {label && (
          <label
            className="w-72 text-base font-sans text-gray-700"
            htmlFor={name}
          >
            {label}
          </label>
        )}
        {type === "select" ? (
          <Select
            options={options!}
            currentValue={currentValue}
            name={name}
            register={register}
          />
        ) : (
          <Input
            type={type}
            placeholder={placeholder}
            name={name}
            register={register}
          />
        )}
      </div>
      {error && <span className="text-red-500">{error.message}</span>}
    </>
  );
}

export default FormField;
