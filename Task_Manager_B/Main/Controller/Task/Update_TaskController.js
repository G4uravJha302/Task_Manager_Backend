import { Task } from "../../Models/Task_Model.js";

export const updateTask = async (req, res) => {
  try {
    const body = req.body;
    const { id } = req.params;
    const task = await Task.findById(id);
    task.title = body.title;
    task.description = body.description;
    task.status = body.status;
    task.save();
    res.status(200).json({ message: "Task updated", task });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating task" });
  }
};