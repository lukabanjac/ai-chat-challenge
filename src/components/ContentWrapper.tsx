import React from 'react';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const ContentWrapper = ({ children }: Props) => {
  return (
    <main className="flex flex-col justify-end overflow-y-auto p-4 flex-1 max-w-5xl">
      {children}
    </main>
  );
};

export default ContentWrapper;
