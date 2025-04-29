// ChatboxTextarea.tsx
import React, { ChangeEvent, KeyboardEvent } from 'react';
import Loader from '../assets/svg/blocks-shuffle-3.svg';
import SendIcon from '../assets/svg/send-icon.svg';

interface ChatboxTextareaProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyDown: (e: KeyboardEvent<HTMLTextAreaElement>) => void;
  handleSend: () => void;
  placeholder?: string;
  className?: string;
  loading: boolean;
}

export const ChatboxTextarea = ({
  value,
  onChange,
  onKeyDown,
  handleSend,
  placeholder = 'Enter your text',
  className = '',
  loading = false,
}: ChatboxTextareaProps) => {
  return (
    <div className="flex max-w-[70%] w-full flex-row items-center gap-2 rounded-[99px] border border-neutral-900 bg-neutral-800 py-2 pl-5 pr-2 mx-auto">
      {loading ? (
        <img src={Loader} alt="Close" className="w-4 h-4 fill-neutral-300" />
      ) : null}
      <textarea
        rows={1}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        className="min-h-full w-full !border-0  text-neutral-300 resize-none focus:outline-none focus:ring-0 appearance-none"
      />
      <div></div>
      <div>
        <button
          className="rounded-full p-3 hover:bg-neutral-600 hover:cursor-pointer"
          onClick={(e) => handleSend()}
        >
          <img src={SendIcon} alt="Close" className="h-6 w-7" />
        </button>
      </div>
    </div>
  );
};
