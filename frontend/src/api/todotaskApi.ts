import axios from "axios";

import { ToDoTaskType } from "../types/todotask.types";

const TODOTASK_API_URL = `${import.meta.env.VITE_BASE_URL}/todotasks`;
const ADD_TODOTASK_ENDPOINT = `${TODOTASK_API_URL}`;
const GET_TODOTASKS_ENDPOINT = `${TODOTASK_API_URL}`;
const GET_TODOTASK_ENDPOINT = `${TODOTASK_API_URL}/`;
const UPDATE_TODOTASK_ENDPOINT = `${TODOTASK_API_URL}/`;
const DELETE_TODOTASK_ENDPOINT = `${TODOTASK_API_URL}/`;

export const addTodotask = async (todotaskData: ToDoTaskType) => {
  try {
    const response = await axios.post(ADD_TODOTASK_ENDPOINT, {
      title: todotaskData.title,
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const getTodotasks = async () => {
  try {
    const response = await axios.get(GET_TODOTASKS_ENDPOINT);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const getTodotask = async (todotaskId: ToDoTaskType["_id"]) => {
  try {
    const response = await axios.get(GET_TODOTASK_ENDPOINT + todotaskId);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const updateTodotask = async (todotaskData: ToDoTaskType) => {
  try {
    const response = await axios.put(
      UPDATE_TODOTASK_ENDPOINT + todotaskData._id,
      {
        title: todotaskData.title,
      }
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const deleteTodotask = async (todotaskId: ToDoTaskType["_id"]) => {
  try {
    const response = await axios.delete(DELETE_TODOTASK_ENDPOINT + todotaskId);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
