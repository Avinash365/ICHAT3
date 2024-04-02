import express  from 'express';
import dotenv from 'dotenv'; 

import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

import authRoutes from "./routes/auth.routes.js"; 
import messageRoutes from "./routes/message.routes.js"; 
import userRoutes from "./routes/user.routes.js"

import connectToMongoDB from './db/connectToMongoDB.js';


const PORT = process.env.PORT || 8000; 
const app = express();

app.use(bodyParser.json());
app.use(cookieParser()); 
app.use(bodyParser.urlencoded({ extended: true }));
 
app.use("/api/auth",authRoutes)
app.use("/api/messages",messageRoutes)
app.use("/api/users", userRoutes)


dotenv.config();
app.use(express.json()); // to parse the incoming request with JSON payLoads 

app.listen(PORT, () =>{
    connectToMongoDB();
    console.log(`server Running on http://localhost:${PORT}`)
}); 
