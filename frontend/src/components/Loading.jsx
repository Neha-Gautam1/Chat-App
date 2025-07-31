import React from 'react';

const Loading = () => {
  return (
    <div className='flex h-screen items-center justify-center bg-slate-600'>
      <div className="flex w-52 flex-col gap-4">
        <div className="skeleton h-32 w-full bg-gray-400 animate-pulse rounded"></div>
        <div className="skeleton h-4 w-28 bg-gray-400 animate-pulse rounded"></div>
        <div className="skeleton h-4 w-full bg-gray-400 animate-pulse rounded"></div>
        <div className="skeleton h-4 w-full bg-gray-400 animate-pulse rounded"></div>
      </div>
    </div>
  );
};

export default Loading;
