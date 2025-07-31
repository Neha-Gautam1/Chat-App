import React, { useEffect } from 'react';
import {useSocketContext} from "./SocketContext.jsx";
import useConversation from '../stateManage/useConversation';
import sound from '../assets/Landline Ringtone.mp3';
export const useGetSocketMessage = () => {
  const {socket} = useSocketContext();
  // This hook can be used to get socket messages or perform actions related to socket communication.
  // You can implement the logic to listen for messages or emit events as needed.
  // For example, you might want to listen for incoming messages and update the state accordingly.
  const {messages, setMessages} = useConversation();
  useEffect(()=>{
    socket.on("newMessage", (newMessage) =>{
    const notifications = new Audio(sound);
    notifications.play();
     setMessages(...messages, newMessage);
    });
    return () => {
      socket.off("newMessage");
    }
  },[socket, messages, setMessages]);

  return (
    <>
     
    </>
  )
}

 