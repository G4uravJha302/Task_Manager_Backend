import { Router } from "express";
import { addTask} from "../Controller/Task/Add_TaskController.js";
import { getTasks } from "../Controller/Task/Get_TaskController.js";
import {deleteTask} from "../Controller/Task/Delete_TaskController.js";
import {updateTask} from "../Controller/Task/Update_TaskController.js";
import { tokenVerify as authMiddleware } from "../Middleware/Auth_Mid.js";


const Task_router = Router();
Task_router.post('/addtask', authMiddleware, addTask);
Task_router.get('/gettask', authMiddleware, getTasks);
Task_router.delete('/delete/:id', deleteTask)
Task_router.put('/update/:id', updateTask)

export default Task_router;
