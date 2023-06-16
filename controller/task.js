import express from "express";
import { Task } from "../models/task.js";

export const newTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    const user = req.user;

    // Create a new task
    const task = new Task({
      title,
      description,
      user: user._id, // Assuming `user` is an object with `_id` property
    });

    // Save the task to the database
    await task.save();

    // Respond with a success message
    res.json({
      success: true,
      message: "Task Created Successfully",
    });
  } catch (error) {
    // Handle any errors that occur during the process
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

export const updateTask = async (req, res) => {
  const { id } = req.params;
  const task = await Task.findById(id);
  
  task.isComplete = !task.isComplete;
  await task.save();
  
  res.json({
    success: true,
    message: "Task has been updated"
  });
}



export const deleteTask=async(req,res)=>{


  const {id}=req.params.id;
  const task=await Task.deleteOne(id)
  res.status(200).json({
    success:true,
    message:"Task has been deleted"
  })




}