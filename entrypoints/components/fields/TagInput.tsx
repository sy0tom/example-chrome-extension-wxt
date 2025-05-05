import { useState } from "react";
interface Props {
  currentTags?: string[];
}
function TagInput({ currentTags }: Props) {
  const [tags, setTags] = useState<string[]>(currentTags ?? []);
  const [inputValue, setInputValue] = useState(currentTags?.join(" ") ?? "");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue && inputValue.trim() !== "") {
      e.preventDefault();
      if (!tags.includes(inputValue.trim())) {
        setTags([...tags, inputValue.trim()]);
      }
      setInputValue("");
    }
  };

  const removeTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  return (
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
            onClick={() => removeTag(index)}
          >
            ×
          </button>
        </div>
      ))}
      <input
        type="text"
        className="flex-grow bg-transparent outline-none text-black px-1 py-1"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="タグを入力してEnter"
      />
    </div>
  );
}

export default TagInput;
