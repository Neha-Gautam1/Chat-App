import React from 'react';
import { Search } from './Search';
import { Users } from './Users';

export const Left = () => {
  return (
    <div className="w-full h-full bg-[#111B21] text-white border-r border-[#2A3942]">
      <h1 className="font-bold text-3xl py-4 px-6 text-[#25D366]">Messenger</h1>
      <Search />
      <hr className="border-[#2A3942] mx-6" />
      <Users />
    </div>
  );
};
