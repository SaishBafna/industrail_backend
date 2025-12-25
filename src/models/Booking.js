import mongoose, { Schema } from "mongoose";

const bookingSchema = new Schema(
  {
    event: {
      type: Schema.Types.ObjectId,
      ref: "Event",
      required: true
    },
    name: { type: String, required: true },
    email: { type: String, required: true }
  },
  { timestamps: true }
);

export const Booking = mongoose.model("Booking", bookingSchema);
