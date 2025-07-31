import React, { useState } from 'react';
import { IoSearch } from "react-icons/io5";
import { useGetAllUsers } from '../../context/useGetAllUsers';
import useConversation from '../../stateManage/useConversation.js';
import toast from "react-hot-toast";

export const Search = () => {
  const [search, setSearch] = useState("");
  const [allUsers] = useGetAllUsers();
  const { setSelectedConversation } = useConversation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;

    const conversation = allUsers.find((user) =>
      user.name.toLowerCase().includes(search.toLowerCase())
    );

    if (conversation) {
      setSelectedConversation(conversation);
      setSearch("");
    } else {
      toast.error("User not found");
    }
  };

  return (
    <div className="h-[10vh] px-6 py-4">
      <form onSubmit={handleSubmit}>
        <div className="flex space-x-3">
          <label className="flex items-center bg-[#2A3942] rounded-lg p-2 w-full">
            <input
              type="text"
              className="grow outline-none bg-transparent text-white placeholder-gray-400"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </label>
          <button type="submit" className="text-[#25D366] hover:bg-[#1DA851] p-2 rounded-full transition-all">
            <IoSearch className="text-3xl" />
          </button>
        </div>
      </form>
    </div>
  );
};
