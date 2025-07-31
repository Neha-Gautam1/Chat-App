import mongoose from "mongoose";
import User from "./user.model.js";
import Message from "./message.model.js";

const communicationSchema = new mongoose.Schema({
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }],
  messages: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Message",
    default: []
  }]
}, {
  timestamps: true
});



const Communication = mongoose.model("Communication", communicationSchema);

export default Communication;