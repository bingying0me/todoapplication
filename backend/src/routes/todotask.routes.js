import express from 'express'

import { addToDoTask, getToDoTasks, getToDoTask, updateToDoTask, deleteToDoTask } from '../controllers/todotasks.controllers.js'

const router = express.Router()

// this is === /todotask
router.get('/', getToDoTasks) //GET all ToDoTasks
router.post('/', addToDoTask) // ADD a new ToDoTask
router.get('/:id', getToDoTask) // GET a single ToDoTask by id
router.put('/:id', updateToDoTask) // UPDATE a ToDoTask by id
router.delete('/:id', deleteToDoTask) // DElETE a ToDoTask by id


export default router