import {Schema, model} from "mongoose";

export const ConversationSchema = new Schema({
  members: [{
    type: Schema.Types.ObjectId,
    ref: "User"
  }]
}, {timestamps: true});

export default model("Conversation", ConversationSchema)