// MainWrapper.tsx
import React from 'react';

type MainWrapperProps = {
  children: React.ReactNode;
  className?: string;
};

export const MainWrapper: React.FC<MainWrapperProps> = ({
  children,
  className = '',
}) => {
  return (
    <main
      className={`w-full bg-neutral-800 flex flex-col items-center justify-center h-full min-h-screen ${className}`}
    >
      {children}
    </main>
  );
};
