import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    message: {
        type: String,
        required: true,
        maxLength: 1000,
        trim: true,
        validate: {
            validator: function (v) {
                return v.length > 0;
            },
            message: "Message cannot be empty"
        }
    }
}, {
    timestamps: true
});


const Message = mongoose.model("Message", messageSchema);

export default Message;