// backend/controllers/message.controller.js
import Conversation from "../models/communication.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId } from "../SocketIO/server.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body; // assuming req.body.message = { message: "Hi" }
    const { id: receiverId } = req.params;
    const senderId = req.user.id; // logged-in user's ID

    // Check if conversation already exists
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] }
    });

    // If no conversation exists, create one
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    // Create and save the message
    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    await newMessage.save();

    // Add message to conversation
    conversation.messages.push(newMessage._id);
    await conversation.save();

    const receiversocketId = getReceiverSocketId(receiverId);
    if(receiversocketId){
      socket.to(receiversocketId).emit("newMessage", newMessage);
    }

    res.status(201).json(
      newMessage
  );
  } catch (err) {
    console.error("Error sending message:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const getMessage = async (req, res) => {
  try{
   const { id: chatuser } = req.params;
    const senderId = req.user.id;
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, chatuser] }
    }).populate('messages');
   if (!conversation) {
  return res.status(200).json({ messages: [] });
}

    const messages = conversation.messages;
    res.status(201).json({messages});
  }catch(err){
    console.error("Error getting messages:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};