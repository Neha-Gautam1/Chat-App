import React, { useEffect } from 'react';
import { User } from './User';
import { useGetAllUsers } from "../../context/useGetAllUsers";

export const Users = () => {
  const [allUsers] = useGetAllUsers();

  useEffect(() => {
    console.log("All users updated:", allUsers);
  }, [allUsers]);

  return (
    <div
      style={{ maxHeight: "calc(84vh - 10vh)" }}
      className="my-1 overflow-y-auto px-6 space-y-2 bg-[#111B21] text-white scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900"
    >
      {allUsers.map((user, index) => (
        <User key={index} user={user} />
      ))}
    </div>
  );
};

