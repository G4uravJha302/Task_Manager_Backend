import express from 'express';
import dotenv from 'dotenv';
import  Auth_router from '../Task_Manager_B/Main/Routes/Auth_Router.js';
import { connectToMongo } from '../Task_Manager_B/Main/Models/User_Model.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import Task_router from "../Task_Manager_B/Main/Routes/Task_Router.js";
dotenv.config();
connectToMongo();

const port = process.env.PORT || 8081;
const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use('/auth', Auth_router);
app.use('/task', Task_router);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
