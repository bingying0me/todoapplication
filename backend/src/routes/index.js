import express from 'express'

import todotasksRoutes from './todotask.routes.js'

const router = express.Router()

router.use('/todotasks', todotasksRoutes)


export default router