import {
  FieldError,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";
import { Input } from "./field/Input";
import FormFieldLayout from "./layout/FormFieldLayout";

interface Props<T extends FieldValues> {
  label: string;
  type: "text" | "email" | "password" | "number" | "url";
  placeholder?: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  error?: FieldError;
}

function FormInput<T extends FieldValues>({
  label,
  type,
  placeholder,
  name,
  register,
  error,
}: Props<T>) {
  const child = Input({ type, placeholder, name, register });
  return <FormFieldLayout label={label} child={child} error={error} />;
}

export default FormInput;
