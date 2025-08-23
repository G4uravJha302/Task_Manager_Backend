import express from 'express';
import dotenv from 'dotenv';
import  Auth_router from "./Routes/Auth_Router.js";
import { connectToMongo } from './Models/User_Model.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import Task_router from "./Routes/Task_Router.js";
dotenv.config({ "path": "./.env" });
connectToMongo();

const port = process.env.PORT || 8081;
const app = express();

// app.use(cors({
//   origin: [
//     "http://localhost:5173",               // local dev
//     "https://task-manager-frontend-7mk5-3ybev6awq.vercel.app" 
//      // vercel deploy
//   ],
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   credentials: true
// }));



const allowedOrigins = [
  "http://localhost:5173",                         // local frontend
  "https://task-manager-frontend-7mk5.vercel.app"  // deployed frontend
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use('/auth', Auth_router);
app.use('/task', Task_router);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
