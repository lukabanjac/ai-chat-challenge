import React from 'react';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const FooterWrapper = ({ children }: Props) => {
  return (
    <footer className="sticky bottom-0 z-10 py-10 w-screen bg-gradient-to-t from-neutral-800">
      {children}
    </footer>
  );
};

export default FooterWrapper;
