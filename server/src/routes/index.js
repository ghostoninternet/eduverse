import express from 'express'
import authRouter from './auth'

const router = express.Router()

router('/auth', authRouter)

export default router