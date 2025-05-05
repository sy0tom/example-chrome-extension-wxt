import {
  FieldError,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";
import { Select } from "./field/Select";
import LabelLayout from "./layout/FormFieldLayout";

interface Props<T extends FieldValues> {
  label: string;
  options: { name: string; value: string | number | string[] }[];
  initialValue?: string | number | string[];
  name: Path<T>;
  register: UseFormRegister<T>;
  error?: FieldError;
}

function FormSelect<T extends FieldValues>({
  label,
  options,
  initialValue,
  name,
  register,
  error,
}: Props<T>) {
  const child = Select({ options, initialValue, name, register });
  return (
    <>
      <LabelLayout label={label} child={child} error={error} />
    </>
  );
}

export default FormSelect;
