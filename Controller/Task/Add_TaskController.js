import { Task } from "../../Models/Task_Model.js";

export const addTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const newTask = new Task({
      title,
      description,
      status: status || "pending",
      user: req.user_id,
    });
    await newTask.save();
    res.status(201).json({ message: "Task created", task: newTask });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating task" });
  }
};

