import React from 'react';

interface Props {
  timestamp: Date;
}

const Timestamp = ({ timestamp }: Props) => {
  return (
    <div className="flex items-center w-full text-sm my-4">
      <div className="flex-grow border-t border-neutral-700"></div>
      <span className="px-4 shrink-0 text-neutral-700">
        {new Date(timestamp).toLocaleString('en-US', {
          timeStyle: 'short',
          dateStyle: 'medium',
        })}
      </span>
      <div className="flex-grow border-t border-neutral-700"></div>
    </div>
  );
};

export default Timestamp;
