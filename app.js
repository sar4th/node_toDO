import express  from "express"
import UserRouter from "./Routes/user.js"
import TaskRouter from "./Routes/task.js"
import cookieParser from "cookie-parser"
import cors from "cors"
const app = express()

app.use(cookieParser())
app.use(express.json())
app.use(cors({
    origin:[process.env.FRONT_END_URL],
    methods:["GET","POST","PUT","DELETE"],
    credentials:true
}))
app.use(UserRouter)
app.use(TaskRouter)


export default app