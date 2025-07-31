import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import userRoutes from "./routes/user.route.js";
import messageRoutes from "./routes/message.route.js";
import cookieParser from 'cookie-parser';
import { app,server, io } from './SocketIO/server.js';


dotenv.config();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173', // ✅ your frontend origin
  credentials: true                // ✅ allow cookies/headers
}));

app.use(cookieParser());
const PORT = process.env.PORT ||  5000;
const MONGODB_URI = process.env.MONGO_URI;

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB successfully');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });


app.use("/users", userRoutes);
app.use("/messages", messageRoutes);


//code for deployment

if(process.env.NODE_ENV == "production"){
 const dirPath = path.resolve();
 app.use(express.static(dirPath, "./frontend/dist"));
 app.get("*",(req,res)=>{
   res.sendFile(path.resolve(dirPath, './frontend/dist','index.html'));
 })
}

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});