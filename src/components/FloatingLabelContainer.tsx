import React from 'react';

interface FloatingLabelContainerProps {
  label: string;
  children: React.ReactNode;
  isError: boolean;
}

export const FloatingLabelContainer: React.FC<FloatingLabelContainerProps> = ({
  label,
  children,
  isError = false,
}) => {
  return (
    <div className="relative w-full">
      {/* Border Box */}
      <div
        className={`border ${isError ? 'border-amber-700' : 'border-neutral-700'} rounded-md pt-4 px-4 pb-2`}
      >
        {children}
      </div>

      {/* Floating Label */}
      <div
        className={`absolute -top-2 left-4 rounded-full  ${isError ? 'bg-amber-700' : 'bg-neutral-700'} px-2 text-xs ${isError ? 'text-amber-500' : 'text-neutral-500'}`}
      >
        {isError ? 'MODEL ERROR ' : ''}
        {label}
      </div>
    </div>
  );
};
