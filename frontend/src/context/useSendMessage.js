import { useState } from 'react';
import useConversation from '../stateManage/useConversation.js';
import axios from 'axios';

export const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  const sendMessages = async (message) => {
    if (!selectedConversation || !selectedConversation._id) return;

    setLoading(true);
    try {
      const response = await axios.post(
        `http://localhost:5002/messages/send/${selectedConversation._id}`,
        { message },
        {
          withCredentials: true, // ✅ Required for cookie auth
        }
      );

      // ✅ response.data should be the saved message object
      setMessages([...messages, response.data]);
    } catch (error) {
      console.error("Error in sendMessages:", error?.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, sendMessages };
};
