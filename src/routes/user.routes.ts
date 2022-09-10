// import { Router } from "express";
import express, { Express } from "express";
import {signup} from './../controllers/todos/user.controller'

const app: Express = express()
// const router: Router = Router()
app.post("/signup", signup)

export default app

