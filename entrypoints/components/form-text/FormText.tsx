import {
  FieldError,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

interface Props<T extends FieldValues> {
  label: string;
  name: Path<T>;
  type: "text" | "password" | "email" | "number" | "url" | "tel";
  placeholder?: string;
  register: UseFormRegister<T>;
  error?: FieldError;
}

function FormText<T extends FieldValues>({
  label,
  name,
  type,
  placeholder,
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
        <input
          className="w-full px-2 py-2 text-base font-sans text-gray-700 rounded border border-gray-100 focus:border-primary focus:outline-none"
          type={type}
          placeholder={placeholder}
          {...register(name)}
        />
      </div>
      {error && <span className="text-red-500">{error.message}</span>}
    </>
  );
}

export default FormText;
