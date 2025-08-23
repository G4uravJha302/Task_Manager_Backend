import mongoose,{Types} from "mongoose";
import { Schema } from "mongoose";
import dotenv from "dotenv";
dotenv.config({ "path": "./.env" });
const mongo = process.env.MONGO;
export function connectToMongo() {
  mongoose.connect(mongo)
    .then(() => {
      console.log("mongo is successfully connected");
    })
    .catch((err) => {
      console.log("something went wrong", err);
    });
}

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    tasks: [
      {
        type: Types.ObjectId,
        ref: "Task",
      },
    ],
    otp: {
      type: String || null,
      default: null,
    },
    otpVerified: {
      type: Date || null,
      default: null,
    },
  },

  { timestamps: true }
);
export const usermodle = mongoose.model("user", userSchema);
