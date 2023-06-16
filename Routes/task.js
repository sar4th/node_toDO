import express from "express";
import { newTask, updateTask,deleteTask } from "../controller/task.js";
import { IsAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/tasks/newTask", IsAuthenticated, newTask);
router.post("/tasks/updateTask/:id", IsAuthenticated,updateTask);
router.post("/tasks/deleteTask/:id", IsAuthenticated,deleteTask);

export default router;
