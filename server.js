import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./db/connectdb.js";
import { Todo } from "./Schema/todoSchema.js";
import cors from "cors";
dotenv.config();

const app = express();
app.use(cors());

connectDB();
const Port = process.env.PORT || 6000;

//home route

app.get("/", (req, res) => {
  res.send("<h2>API is up and running<h2>");
});
//middleware

app.use(express.json());

//route for  adding a todo
app.post("/todos", async (req, res) => {
  const todo = await Todo.create(req.body);
  if (todo) {
    return res.status(200).json({
      success: true,
      message: "Todo created successfully",
    });
  } else {
    return res.status(400).json({
      success: false,
      message: "Todo not created",
    });
  }
});

// route for getting a todo
app.get("/todos", async (req, res) => {
  const todos = await Todo.find();
  if (todos) {
    return res.status(200).json({
      success: true,
      data: todos,
      message: "Todos retrieved succesfully",
    });
  } else {
    return res.status(404).json({
      success: false,
      message: "Todos not found",
    });
  }
});
// route for updating  a todo
app.patch("/todos/:id", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const todo = await Todo.updateOne({ status }).where({ _id: id });
  if (todo) {
    return res.status(200).json({
      success: true,
      data: todo,
      message: "Todo updated successfully",
    });
  }
});

//route for deleting a todo
app.get("/todos/:id", async (req, res) => {
  const { id } = req.params;
  await Todo.deleteOne({ _id: id });
  return res.status(200).json({
    success: true,
    message: "Todo deleted successfully",
  });
});

app.listen(Port, () => console.log(`server is up and running on port ${Port}`));
