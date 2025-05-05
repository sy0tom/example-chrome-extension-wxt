import {
  Control,
  Controller,
  FieldError,
  FieldValues,
  Path,
} from "react-hook-form";
import Select from "./field/Select";
import FormFieldLayout from "./layout/FormFieldLayout";

interface Props<T extends FieldValues> {
  label: string;
  options: { name: string; value: string | number | string[] }[];
  optionHeader?: string;
  name: Path<T>;
  control: Control<T>;
  error?: FieldError;
}

function FormSelect<T extends FieldValues>({
  label,
  options,
  optionHeader,
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
            <Select
              options={options}
              optionHeader={optionHeader}
              initialValue={field.value}
              onChange={field.onChange}
            />
          )}
        />
      }
    />
  );
}

export default FormSelect;
