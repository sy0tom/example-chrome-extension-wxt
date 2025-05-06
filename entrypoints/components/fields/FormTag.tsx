import { useRef } from "react";
import {
  Control,
  Controller,
  FieldError,
  FieldValues,
  Path,
} from "react-hook-form";
import { TagInput } from "./field/TagInput";
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
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div onClick={() => inputRef.current?.focus()}>
      <FormFieldLayout
        label={label}
        error={error}
        child={
          <Controller
            name={name}
            control={control}
            render={({ field }) => (
              <TagInput
                ref={inputRef}
                initialValues={field.value}
                placeholder={placeholder}
                onChange={field.onChange}
              />
            )}
          />
        }
      />
    </div>
  );
}

export default FormTag;
