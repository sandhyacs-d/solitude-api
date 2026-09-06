import app from "./app.js";
import { connectdb } from "./config/db.js";

await connectdb();

app.listen(process.env.PORT,()=>{
    console.log("the server is running")
});