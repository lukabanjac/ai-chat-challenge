import React from 'react';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const Chat = ({ children }: Props) => {
  return (
    <div className="flex flex-col gap-2 p-4 flex-1 overflow-y-auto">
      {children}
    </div>
  );
};

export default Chat;
