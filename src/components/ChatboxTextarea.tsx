// ChatboxTextarea.tsx
import { IconButton, Textarea } from '@material-tailwind/react';
import React, { ChangeEvent, KeyboardEvent } from 'react';

interface ChatboxTextareaProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyDown: (e: KeyboardEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  className?: string;
}

export const ChatboxTextarea = ({
  value,
  onChange,
  onKeyDown,
  placeholder = 'Enter your text',
  className = '',
}: ChatboxTextareaProps) => {
  return (
    <div className="flex max-w-[70%] w-full max-w-5xl flex-row items-center gap-2 rounded-[99px] border border-neutral-900 bg-neutral-800 p-2 px-5 mx-auto">
      <textarea
        rows={1}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        className="min-h-full w-full !border-0  text-neutral-300 resize-none focus:outline-none focus:ring-0 appearance-none"
      />
      <div>
        <button className="rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};
