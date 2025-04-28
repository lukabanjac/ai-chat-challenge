import React from 'react';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const InputContainer = ({ children }: Props) => {
  return (
    <div className="flex flex-row border border-solid rounded-md p-5 border-neutral-900">
      {children}
    </div>
  );
};

export default InputContainer;
