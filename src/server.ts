import express, { Express, Request, Response } from "express";
import morgan from 'morgan';
import mongoose from "mongoose";
import cors from "cors";
import http from 'http';
import dotenv from 'dotenv';
import todoRoutes from './routes/todo.routes'

const app: Express = express()
// const server = http.createServer(app);
const PORT: string | number = process.env.PORT || 4000

dotenv.config({path:'nodemon.json'})
app.use(morgan('tiny'))

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  // set the CORS policy
  res.header('Access-Control-Allow-Origin', '*');
  // set the CORS headers
  res.header('Access-Control-Allow-Headers', 'origin, X-Requested-With,Content-Type,Accept, Authorization');
  // set the CORS method headers
  if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST');
      return res.status(200).json({});
  }
  next();
});

app.use(cors())
app.use(todoRoutes)

const uri: string = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.8qxjkbq.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
mongoose
.connect(uri)

app.get('/', (req: Request, res: Response)=>{
  res.send("WELCOME TO API")
})

app.listen(PORT, (): void=>{
  console.log(`The server is starting at http://localhost: ${PORT}`)
})