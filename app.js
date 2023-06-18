import express  from "express"
import UserRouter from "./Routes/user.js"
import TaskRouter from "./Routes/task.js"
import cookieParser from "cookie-parser"
import cors from "cors"
const app = express()

app.use(cookieParser())
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:3000', // replace with your front-end URL
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
    credentials: true
  }));
  
app.use(UserRouter)
app.use(TaskRouter)


export default app
