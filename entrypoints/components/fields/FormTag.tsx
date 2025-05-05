import {
  FieldError,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";
import { Tag } from "./field/Tag";
import LabelLayout from "./layout/FormFieldLayout";

interface Props<T extends FieldValues> {
  label: string;
  initialValues?: string[];
  name: Path<T>;
  register: UseFormRegister<T>;
  error?: FieldError;
}

function FormTag<T extends FieldValues>({
  label,
  initialValues,
  name,
  register,
  error,
}: Props<T>) {
  const child = Tag({ initialValues, name, register });
  return (
    <>
      <LabelLayout label={label} child={child} error={error} />
    </>
  );
}

export default FormTag;
