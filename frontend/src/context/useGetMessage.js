import React, { useEffect, useState} from 'react';
import useConversation from "../stateManage/useConversation.js";
import axios from "axios";

function useGetMessage()  {
    const [loading, setLoading] = useState(false);
    const {messages, setMessages, selectedConversation} = useConversation();

    useEffect(()=>{
      const getMessages = async () => {
  setLoading(true);
  if (selectedConversation && selectedConversation._id) {
    try {
      const response = await axios.get(
        `http://localhost:5002/messages/get/${selectedConversation._id}`,
        { withCredentials: true }
      );
      setMessages(response.data.messages);
    } catch (error) {
      console.log("Error in getMessages:", error);
      if (error.response && error.response.status === 404) {
        setMessages([]); // No conversation yet
      }
    } finally {
      setLoading(false); // Ensure loading is set to false in both success and error cases
    }
  }
};

      getMessages();
    }, [selectedConversation, setMessages]);

  return {
     messages,
     loading,
  }
}

export default useGetMessage;
