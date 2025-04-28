import React from 'react';
import { useTheme } from '../context/ThemeContext';

export function ThemeBtn() {
  const { switchTheme } = useTheme();

  return (
    <div className="flex gap-x-6 items-center justify-center mt-10">
      <button
        style={{ backgroundColor: 'var(--bgColor)' }}
        onClick={() => switchTheme('light')}
      >
        Light
      </button>
      <button
        style={{ backgroundColor: 'var(--bgColor)' }}
        onClick={() => switchTheme('dark')}
      >
        Dark
      </button>
      <button
        style={{ backgroundColor: 'var(--bgColor)' }}
        onClick={() => switchTheme('blue')}
        className="blue text-md rounded-md border border-solid border-[hsl(0,0%,87%)] w-8 h-8 cursor-pointer"
      >
        Blue
      </button>
    </div>
  );
}
