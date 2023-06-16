import app from "./app.js";
import dbConnection from "./data/dataBase.js";
import { config } from "dotenv";

config({ path: "./data/config.env" });
dbConnection();


app.listen(process.env.PORT, () => {
  console.log(`Server is started at ${process.env.PORT}`);
});