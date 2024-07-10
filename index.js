import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import connectedDb from "./database/db.js";
import cloudinary from "cloudinary";
import messageRouter from "./Router/messageRouter.js";
import userRouter from "./Router/userRouter.js";
import appointmentRouter from './Router/appointmentRouter.js'

import { GoogleGenerativeAI } from '@google/generative-ai';


// Load environment variables
dotenv.config({
    path: './.env'
});

// Configure Cloudinary
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_secret: process.env.CLOUDINARY_SECRET_KEY,
    api_key: process.env.CLOUDINARY_API_KEY
});

const app = express();

// Middleware setup
app.use(cors({
    origin:process.env.ORIGIN,
    credentials: true
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/"
}));

// Routes setup
app.use("/api/message", messageRouter);
app.use("/api/user", userRouter);
app.use("/api/appointment", appointmentRouter);


// Connect to database and start server
connectedDb()
    .then(()=>{
        app.listen(process.env.PORT || 8000,()=>{
            console.log(`server is running${process.env.PORT}`);
        // app.on((error)=>{
        //     console.log("mongo db not connected",error);
        // })
    })
})
.catch((error)=>{
    console.log("mongoDB is not connected",error);
})






const genAI = new GoogleGenerativeAI(process.env.API_KEY);

//!Generate content route
app.post("/generate", async (req, res) => {
  const { prompt } = req.body;
  try {
    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    res.send(text);
  } catch (error) {
    console.log(error);
    res.status(500).send("Failed to generate content");
  }
});


















export default app;
