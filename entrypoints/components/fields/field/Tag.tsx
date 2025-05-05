import { useState } from "react";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";

interface Props<T extends FieldValues> {
  initialValues?: string[];
  placeholder?: string;
  name: Path<T>;
  register: UseFormRegister<T>;
}

export function Tag<T extends FieldValues>({
  initialValues,
  placeholder,
  name,
  register,
}: Props<T>) {
  const [tags, setTags] = useState<string[]>(initialValues ?? []);
  const [inputValue, setInputValue] = useState(initialValues?.join(" ") ?? "");

  const { onChange, ...rest } = register(name);

  const isEndKey = (key: string) => {
    return key === "Enter";
  };
  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (isEndKey(e.key) && inputValue && inputValue.trim() !== "") {
      e.preventDefault();
      if (!tags.includes(inputValue.trim())) {
        setTags([...tags, inputValue.trim()]);
      }
      setInputValue("");
    }
  };

  const onRemoveTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  return (
    <>
      <div className="flex px-2 py-2 gap-1">
        {tags.map((tag, index) => (
          <div
            key={index}
            className="px-2 py-1 flex items-center bg-red-400 text-black rounded text-sm"
          >
            <span>{tag}</span>
            <button
              type="button"
              className="ml-1 text-sm"
              onClick={() => onRemoveTag(index)}
            >
              ×
            </button>
          </div>
        ))}
        <input
          type="text"
          className="px-2 py-1 flex-grow text-black bg-transparent outline-none"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            onChange(e);
          }}
          onKeyDown={handleKey}
          placeholder={placeholder}
          {...rest}
        />
      </div>
    </>
  );
}
