import React from 'react';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const HeadingWrapper = ({ children }: Props) => {
  return <header className="flex flex-col">{children}</header>;
};

export default HeadingWrapper;
