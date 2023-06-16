import  jwt  from "jsonwebtoken";

export const setCookie= async (newUser,res,message)=>{
    const jwtToken = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
    res.cookie("token", jwtToken, {
      httpOnly: true,
      maxAge: 15 * 60 * 10000,
      sameSite:process.env.NODE_SERVER=="Development"? "Lax" : "none",
      secure:process.env.NODE_SERVER=="Development"? false : true
    });
    res.json({
      success: true,
      message
    });
}