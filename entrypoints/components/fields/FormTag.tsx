import {
  Control,
  Controller,
  FieldError,
  FieldValues,
  Path,
} from "react-hook-form";
import { Tag } from "./field/Tag";
import FormFieldLayout from "./layout/FormFieldLayout";

interface Props<T extends FieldValues> {
  label: string;
  placeholder?: string;
  name: Path<T>;
  control: Control<T>;
  error?: FieldError;
}

function FormTag<T extends FieldValues>({
  label,
  placeholder,
  name,
  control,
  error,
}: Props<T>) {
  return (
    <FormFieldLayout
      label={label}
      error={error}
      child={
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <Tag
              initialValues={field.value}
              placeholder={placeholder}
              onChange={field.onChange}
            />
          )}
        />
      }
    />
  );
}

export default FormTag;
