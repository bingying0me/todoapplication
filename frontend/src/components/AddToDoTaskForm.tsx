// AddToDoTaskForm.tsx
import React, { useState, useEffect } from "react";
import { Form, Container } from "react-bootstrap";
import { ToDoTaskType } from "../types/todotask.types";
import {
  addTodotask,
  getTodotasks,
  getTodotask,
  updateTodotask,
  deleteTodotask,
} from "../api/todotaskApi";
import { useFormik } from "formik";
import * as Yup from "yup";
import "../style/AddToDoTaskForm.css"; // Import the CSS file

const AddToDoTaskForm = () => {
  const [toDoTasks, setToDoTasks] = useState<ToDoTaskType[]>([]);

  const formik = useFormik({
    initialValues: {
      _id: "",
      title: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        if (values._id) {
          await updateTodotask(values);
          console.log("ToDo Task updated:", values);
        } else {
          await addTodotask(values);
          console.log("ToDo Task added:", values);
        }
        getItemsList();
        formik.setValues(formik.initialValues);
      } catch (error: any) {
        console.error("Error:", error.message);
      }
    },
  });

  useEffect(() => {
    getItemsList();
  }, []);

  const getItemsList = async () => {
    try {
      const response = await getTodotasks();
      setToDoTasks(response);
      console.log("ToDo Task List:", response);
    } catch (error: any) {
      console.log("Error getting ToDo Task List:", error.message);
    }
  };

  const handleUpdate = async (id: string) => {
    try {
      const response = await getTodotask(id);
      formik.setValues(response);
      console.log("ToDo Task:", response);
    } catch (error: any) {
      console.error("Error getting ToDo Task:", error.message);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTodotask(id);
      console.log("ToDo Task deleted:", id);
      formik.setValues(formik.initialValues);
      getItemsList();
    } catch (error: any) {
      console.error("Error deleting ToDo Task:", error.message);
    }
  };

  return (
    <>
      <h2>Add To Do Task</h2>
      <Container fluid className="container">
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className="form-group">
            <input
              type="text"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Title"
              className="input-title"
              required
            />
            <button type="submit" className="submit-button">
              {formik.values._id ? "Update Task" : "Add Task"}
            </button>
          </Form.Group>
          {formik.touched.title && formik.errors.title ? (
            <Form.Text className="error-text">{formik.errors.title}</Form.Text>
          ) : null}
        </Form>
      </Container>
      {toDoTasks.length === 0 ? (
        <p>No todos found</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {toDoTasks.map((task, index) => (
              <tr key={index}>
                <td>{task.title}</td>
                <td>
                  <button
                    onClick={() => handleUpdate(task._id)}
                    className="update-button"
                  >
                    Update Task
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(task._id)}
                    className="delete-button"
                  >
                    Delete Task
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default AddToDoTaskForm;