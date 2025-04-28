import { ModelListResponse } from 'groq-sdk/resources.mjs';
import React, { useEffect, useRef } from 'react';
import { useState } from 'react';

interface DropdownProps {
  options: ModelListResponse | undefined;
  defaultOption: string;
  onSelect: (option: string) => void;
  placeholder?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({
  options,
  onSelect,
  defaultOption,
  placeholder = 'Select...',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(defaultOption);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = (option: string) => {
    setIsOpen(false);
    setSelected(option);
    onSelect(option);
  };

  return (
    <div ref={dropdownRef} className="relative inline-block text-left w-48">
      {/* Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full bg-neutral-600 border border-neutral-300 rounded-md shadow-sm px-4 py-2 text-sm text-neutral-300 hover:bg-neutral-200 hover:text-neutral-800 cursor-pointer focus:outline-none"
      >
        {selected ?? placeholder}
      </button>

      {/* Options */}
      {isOpen && (
        <div className="absolute mt-1 w-full max-h-[200px] overflow-x-scroll rounded-md bg-neutral-400 shadow-lg border border-neutral-200 z-10">
          <ul className="py-1">
            {options?.data.map((option) => (
              <li
                key={option.id}
                onClick={() => handleSelect(option.id)}
                className="px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100 cursor-pointer"
              >
                {option.id}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
