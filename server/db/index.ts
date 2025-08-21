import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    done: {
      type: Boolean,
    },
    userId: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
    },
    password: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const Todo = mongoose.model("Todo", todoSchema);
export const User = mongoose.model("User", todoSchema);
