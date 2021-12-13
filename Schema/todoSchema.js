import mongoose from "mongoose";

const { Schema, model } = mongoose;
const todoSchema = new Schema({
  title: {
    type: "string",
    required: true,
  },
  description: {
    type: "string",
    required: true,
  },
  status: {
    type: Boolean,
    default: false,
  },

  date_time: {
    type: String,
    //required: true,
  },
});

const Todo = model("Todo", todoSchema);

export { Todo };
