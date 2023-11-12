import ToDoTask from "../models/todotasks.model.js";

export const addToDoTask = async (req, res) => {
  try {
    const newTask = new ToDoTask(req.body);
    await newTask.save();
    res.status(201).send(newTask);
  } catch (err) {
    res.status(400).send(err);
  }
};

export const getToDoTasks = async (req, res) => {
  try {
    const tasks = await ToDoTask.find();
    res.status(200).send(tasks);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const getToDoTask = async (req, res) => {
  try {
    const taskId = req.params.id; // Assuming the task ID is passed as a route parameter

    const task = await ToDoTask.findById(taskId);

    if (!task) {
      return res.status(404).send({ message: 'Task not found' });
    }

    res.status(200).send(task);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const updateToDoTask = async (req, res) => {
  try {
    const taskId = req.params.id; // Assuming the task ID is passed as a route parameter
    const updatedData = req.body;

    const updatedTask = await ToDoTask.findByIdAndUpdate(taskId, updatedData, {
      new: true, // Return the modified document rather than the original
    });

    if (!updatedTask) {
      return res.status(404).send({ message: 'Task not found' });
    }

    res.status(200).send(updatedTask);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const deleteToDoTask = async (req, res) => {
  try {
    const taskId = req.params.id; // Assuming the task ID is passed as a route parameter

    const deletedTask = await ToDoTask.findByIdAndDelete(taskId);

    if (!deletedTask) {
      return res.status(404).send({ message: 'Task not found' });
    }

    res.status(200).send({ message: 'Task deleted successfully' });
  } catch (err) {
    res.status(500).send(err);
  }
};