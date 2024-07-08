import { Schema, model } from "mongoose";

const MessageSchema = new Schema({
  sender: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  conversationId: String,
  message: String
}, {timestamps: true});

export default model("Message", MessageSchema)