import mongoose from "mongoose";

const ToDoTaskSchema = new mongoose.Schema ({
    title: String,
})

const ToDoTask = mongoose.model('ToDoTask', ToDoTaskSchema)

export default ToDoTask