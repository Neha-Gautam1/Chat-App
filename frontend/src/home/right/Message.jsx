import React from 'react';

export const Message = ({ message }) => {
  let authUser = null;
  try {
    authUser = JSON.parse(localStorage.getItem("messenger"));
  } catch (e) {
    console.error("Error parsing localStorage 'messenger':", e);
  }

  const currentUserId = authUser?.user?.id;
  const itsMe = message.senderId === currentUserId;
  const chatName = itsMe ? "chat-end" : "chat-start";
  const chatColor = itsMe ? "bg-[#005C4B]" : "bg-[#202C33]";
  const createdAt = new Date(message.createdAt);
  const formattedTime = createdAt.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="px-4 py-2">
      <div className={`chat ${chatName}`}>
        <div className={`chat-bubble ${chatColor} text-white px-4 py-2 rounded-xl`}>
          {message.message}
        </div>
        <div className="text-xs text-gray-500 mt-1">{formattedTime}</div>
      </div>
    </div>
  );
};
