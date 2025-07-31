import React, { useEffect } from 'react';
import { ChatUser } from './ChatUser';
import { Messages } from './Messages';
import { Type } from './Type';
import useConversation from '../../stateManage/useConversation';
import { useAuth } from '../../context/AuthProvider';

export const Right = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();

  useEffect(() => {
    return () => setSelectedConversation(null);
  }, []);

  return (
    <div className="w-full bg-[#111B21] text-white">
      {!selectedConversation ? (
        <Nochat />
      ) : (
        <>
          <ChatUser />
          <div
            style={{ maxHeight: 'calc(88vh - 12vh)' }}
            className="py-2 px-4 overflow-y-auto"
          >
            <Messages />
          </div>
          <Type />
        </>
      )}
    </div>
  );
};

const Nochat = () => {
  const [authUser] = useAuth();

  return (
    <div className="flex h-screen items-center justify-center bg-[#111B21] text-gray-300">
      <h1 className="text-center font-semibold text-xl">
        Welcome <span className="text-green-400">{authUser.user.name}</span>
        <br />
        <span className="text-gray-400">Select a chat to start messaging</span>
      </h1>
    </div>
  );
};
