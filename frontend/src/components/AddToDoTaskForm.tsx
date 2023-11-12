// AddToDoTaskForm.tsx
import React, { useState, useEffect } from "react";
import { ToDoTaskType } from "../types/todotask.types";

const AddToDoTaskForm = () => {
  // State for the currently entered task and the list of tasks
  const [toDoTask, setToDoTask] = useState<ToDoTaskType>({ title: "" });
  const [toDoTasks, setToDoTasks] = useState<ToDoTaskType[]>([]);
  
  // State to track the index of the task being edited
  const [editingTaskIndex, setEditingTaskIndex] = useState<number | null>(null);

  // Effect to retrieve tasks from local storage on component mount
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("toDoTasks") || "[]");
    setToDoTasks(storedTasks);
  }, []);

  // Effect to save tasks to local storage whenever tasks are updated
  useEffect(() => {
    localStorage.setItem("toDoTasks", JSON.stringify(toDoTasks));
  }, [toDoTasks]);

  // Event handler for input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Update the toDoTask state with the new input value
    setToDoTask({
      ...toDoTask,
      [name]: value,
    });
  };

  // Event handler for form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (editingTaskIndex !== null) {
      // If editingTaskIndex is not null, update the existing task
      const updatedTasks = toDoTasks.map((task, index) =>
        index === editingTaskIndex ? { ...task, ...toDoTask } : task
      );
      setToDoTasks(updatedTasks);
      setEditingTaskIndex(null); // Reset editingTaskIndex
    } else {
      // Otherwise, add a new task
      const updatedTask = { ...toDoTask };
      setToDoTasks([...toDoTasks, updatedTask]);
    }

    setToDoTask({ title: "" }); // Clear the form after submitting
  };

  // Event handler for updating a task
  const handleUpdate = (index: number) => {
    // Set the toDoTask state to the task being updated
    setToDoTask(toDoTasks[index]);
    setEditingTaskIndex(index);
  };

  // Event handler for deleting a task
  const handleDelete = (index: number) => {
    // Remove the task at the specified index
    const updatedTasks = toDoTasks.filter((task, i) => i !== index);
    setToDoTasks(updatedTasks);
  };

  return (
    <div>
      <h2>Add To Do Task</h2>
      {/* Form for adding or updating tasks */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={toDoTask.title}
          onChange={handleChange}
          placeholder="Title"
          required
        />
        <button type="submit">{editingTaskIndex !== null ? "Update Task" : "Add Task"}</button>
      </form>
      {/* Display a message if there are no tasks */}
      {toDoTasks.length === 0 ? (
        <p>No todos found</p>
      ) : (
        // Table to display the list of tasks
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* Map through tasks and display them in the table */}
            {toDoTasks.map((task, index) => (
              <tr key={index}>
                <td>{task.title}</td>
                {/* Buttons for updating and deleting tasks */}
                <td>
                  <button onClick={() => handleUpdate(index)}>Update Task</button>
                </td>
                <td>
                  <button onClick={() => handleDelete(index)}>Delete Task</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AddToDoTaskForm;