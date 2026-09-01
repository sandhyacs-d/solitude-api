import app from "./app.js";
import { connectdb } from "./config/db.js";

await connectdb();

app.listen(3000,()=>{
    console.log("the server is running")
});