import {
  Control,
  Controller,
  FieldError,
  FieldValues,
  Path,
} from "react-hook-form";
import CSelect from "./field/CSelect";
import FormFieldLayout from "./layout/FormFieldLayout";

interface Props<T extends FieldValues> {
  label: string;
  options: { name: string; value: string | number | string[] }[];
  optionHeader?: string;
  name: Path<T>;
  control: Control<T>;
  error?: FieldError;
}

function CFormSelect<T extends FieldValues>({
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
            <CSelect
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

export default CFormSelect;
