import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";


export const IsAuthenticated=async(req,res,next)=>{
    const { token } = req.cookies;
    if (!token) {
      res.send("Login First");
    }
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decoded);
       req.user = await User.findById(decoded.id);
next()
}
