import { Text } from "#/components/text";
import { useState } from "react";

interface Props {
  options: { name: string; value: string | number | string[] }[];
  optionHeader?: string;
  initialValue?: string | number | string[];
  onChange: (value: string | number | string[]) => void;
}

function Select({ options, optionHeader, initialValue, onChange }: Props) {
  const getTranslatedNameByValue = (
    value: string | number | string[] | undefined,
  ): string | undefined => {
    return options.find((option) => option.value === value)?.name;
  };

  const [isOpen, setIsOpen] = useState(false);
  const [selectedName, setSelectedName] = useState<
    string | number | string[] | undefined
  >(getTranslatedNameByValue(initialValue));

  useEffect(() => {
    setSelectedName(getTranslatedNameByValue(initialValue));
  }, [initialValue]);

  return (
    <div
      className="relative w-64"
      tabIndex={0}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          setIsOpen(false);
        }
      }}
    >
      <button
        type="button"
        className="w-full px-2 rounded text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Text text={selectedName ?? optionHeader ?? options[0].value} />
      </button>

      {isOpen && (
        <ul className="absolute w-full bg-white border mt-1 shadow z-10 rounded">
          {options.map((option, index) => (
            <li
              key={index}
              onClick={() => {
                setSelectedName(option.name);
                setIsOpen(false);
                onChange(option.value);
              }}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              <Text text={option.name} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Select;
