import React from "react";
import { FieldError } from "react-hook-form";

interface Props {
  label?: string;
  child: React.ReactNode;
  error?: FieldError;
}

function FormFieldLayout({ label, child, error }: Props) {
  return (
    <>
      <div className="px-2 py-2 flex items-center">
        {label && (
          <label className="w-72">
            <span className="font-sans text-gray-700 text-base">{label}</span>
          </label>
        )}
        {
          <div className="px-2 py-2 w-96 border border-gray-300 rounded bg-gray-100">
            {child}
          </div>
        }
      </div>
      {error && <span className="text-red-500">{error.message}</span>}
    </>
  );
}

export default FormFieldLayout;
