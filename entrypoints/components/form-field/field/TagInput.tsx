import { Text } from "#/components/text";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

interface Props {
  initialValues: string[];
  placeholder?: string;
  onChange: (value: string[]) => void;
}

export interface TagInputHandle {
  focus: () => void;
}

export const TagInput = forwardRef<TagInputHandle, Props>(function TagInput(
  { initialValues, placeholder, onChange },
  ref,
) {
  const [tags, setTags] = useState<string[]>(initialValues);
  const [inputValue, setInputValue] = useState("");

  const spanRef = useRef<HTMLSpanElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current && spanRef.current) {
      inputRef.current.style.width = `${spanRef.current.offsetWidth + 12}px`;
    }
  }, [inputValue]);

  useEffect(() => {
    setTags(initialValues);
  }, [initialValues]);

  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current?.focus(),
  }));

  const isEndKey = (key: string, isComposing: boolean): boolean => {
    return !isComposing && (key === "Enter" || key === "Tab" || key === " ");
  };

  const isBackSpace = (key: string): boolean => {
    return key === "Backspace";
  };

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const key = e.key;
    const isComposing = e.nativeEvent.isComposing;
    if (isEndKey(key, isComposing) && inputValue && inputValue.trim() !== "") {
      e.preventDefault();
      if (!tags.includes(inputValue.trim())) {
        updateTag([...tags, inputValue.trim()]);
      }
      setInputValue("");
      return;
    }

    if (isBackSpace(key) && inputValue === "") {
      e.preventDefault();
      updateTag(tags.slice(0, -1));
    }
  };

  const onRemoveTag = (index: number) => {
    updateTag(tags.filter((_, i) => i !== index));
  };

  const updateTag = (updatedTag: string[]) => {
    setTags(updatedTag);
    onChange(updatedTag);
  };

  return (
    <div
      className="w-full max-w-full px-2 flex items-center flex-nowrap gap-1 overflow-x-auto overflow-y-hidden whitespace-nowrap scrollbar-thin bg-transparent min-w-0"
      style={{ scrollbarColor: "#9CA3AF transparent" }}
    >
      {tags.map((tag, index) => (
        <div
          key={index}
          className="px-2 py-1 flex items-center bg-red-400 rounded"
        >
          <Text text={tag} />
          <button
            type="button"
            className="ml-1 text-sm"
            onClick={() => onRemoveTag(index)}
          >
            ×
          </button>
        </div>
      ))}
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          className="bg-transparent outline-none font-sans text-gray-700 text-base"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKey}
          placeholder={placeholder}
        />
        <span
          ref={spanRef}
          className="absolute top-0 left-0 invisible whitespace-pre px-2 text-gray-700 text-base font-sans"
        >
          {inputValue || placeholder || ""}
        </span>
      </div>
    </div>
  );
});
