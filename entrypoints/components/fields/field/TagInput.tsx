import { useState } from "react";

interface Props<> {
  initialValues?: string[];
  placeholder?: string;
  onChange: (value: string[]) => void;
}

export function TagInput({ initialValues, placeholder, onChange }: Props) {
  const [tags, setTags] = useState<string[]>(initialValues ?? []);
  const [inputValue, setInputValue] = useState("");

  const isEndKey = (key: string): boolean => {
    return key === "Enter" || key === "Tab" || key === " ";
  };

  const isBackSpace = (key: string): boolean => {
    return key === "Backspace";
  };

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const key = e.key;

    if (isEndKey(key) && inputValue && inputValue.trim() !== "") {
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
    <div className="w-full px-2 rounded flex flex-wrap gap-1">
      {tags.map((tag, index) => (
        <div
          key={index}
          className="px-2 py-1 flex items-center bg-red-400 font-sans text-gray-700 text-base rounded"
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
        className="px-2 flex-grow font-sans text-gray-700 text-base bg-transparent outline-none"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKey}
        placeholder={placeholder}
      />
    </div>
  );
}

// todo 横幅と整える
// todo controlの場合、resetが効かない
// todo 日本語を入力するとEnterの後に残ってしまう
// todo inputタグにフォーカスされたときに枠線をつける
