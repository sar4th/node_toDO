import express from "express";
import { User } from "../models/userModel.js"; // Import the User model
import bcrypt from "bcrypt";
import { setCookie } from "../utils/features.js";

// Define a function to handle the home page
export const Home = async (req, res) => {
  res.send("Hello World");
};

// Define a function to create a new user
export const register = async (req, res) => {
  const { email, name, password } = req.body;
  let user = await User.findOne({ email });

  if (user) {
    res.status(400).json({
      success: false,
      message: "User already exists",
    });
  } else {
    let hashPass = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashPass,
    });
    setCookie(newUser, res, "registered successfully");
  }
};

//Login function
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    setCookie(user, res, "Welcome Back");
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

//Get User Details
export const getUser = async (req, res) => {
  console.log(req.user);
  res.json({
    success: true,
    user: req.user,
  });
};

//Logout function
export const logout = (req, res) => {
  // Set the cookie name to be cleared upon logout
  const cookieName = "your_cookie_name";

  // Clear the cookie by setting its expiration date to a past date
  res.cookie(cookieName, "", {
    expires: new Date(0),
    sameSite:process.env.NODE_SERVER=="Development"? "Lax" : "none",
    secure:process.env.NODE_SERVER=="Development"? false : true
  });

  // Return a JSON response indicating successful logout
  res.json({
    success: true,
    message: "Logout successful",
  });
};
