import mongoose from "mongoose";

const dbConnection=()=>{ 
    mongoose
    .connect( process.env.DB_URI, {
        dbName: "backendApi",
    })
    .then(() => console.log("Database Connected"))
    .catch((e) => console.log(e));

}
export default dbConnection