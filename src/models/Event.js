import mongoose, { Schema } from "mongoose";

const eventSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    date: { type: Date, required: true },
    location: { type: String, required: true },
    totalSeats: { type: Number, default: 50 },
    bookedSeats: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export const Event = mongoose.model("Event", eventSchema);
