import { Schema, model } from "mongoose";

const NotificationSchema = new Schema({
  sender: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  receiver: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  post_id: String,
  type: String
}, {timestamps: true});

export default model("Notification", NotificationSchema)