import React, { useState } from 'react';
import { IoSend } from 'react-icons/io5';
import { useSendMessage } from '../../context/useSendMessage';

export const Type = () => {
  const { loading, sendMessages } = useSendMessage();
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    await sendMessages(message);
    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center space-x-3 h-[8vh] bg-[#202C33] px-4">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message"
          className="w-full bg-[#2A3942] text-white px-4 py-2 rounded-full outline-none placeholder-gray-400"
        />
        <button
          type="submit"
          className="text-3xl text-green-500 hover:text-green-400 disabled:opacity-40"
          disabled={loading}
        >
          <IoSend />
        </button>
      </div>
    </form>
  );
};
